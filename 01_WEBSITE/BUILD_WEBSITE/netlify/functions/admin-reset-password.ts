import { timingSafeEqual } from 'node:crypto';
import { jsonResponse } from '../lib/auth';

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { success: false, message: 'Method not allowed' }, { Allow: 'POST' });
  }

  const expectedToken = process.env.ADMIN_PASSWORD_RESET_TOKEN || '';
  const allowedEmail = (process.env.ADMIN_PASSWORD_RESET_EMAIL || '').trim().toLowerCase();
  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const secretKey = process.env.SUPABASE_SECRET_KEY || '';

  const missing: string[] = [];
  if (expectedToken.length < 32) missing.push('ADMIN_PASSWORD_RESET_TOKEN (missing or shorter than 32 characters)');
  if (!allowedEmail) missing.push('ADMIN_PASSWORD_RESET_EMAIL');
  if (!supabaseUrl) missing.push('SUPABASE_URL (or VITE_SUPABASE_URL)');
  if (!secretKey) missing.push('SUPABASE_SECRET_KEY');
  if (missing.length) {
    console.error('Admin password reset configuration missing:', missing);
    return jsonResponse(503, { success: false, message: 'Password reset configuration is incomplete.', missing });
  }

  let body: any = {};
  if (event.body) {
    try { body = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body); }
    catch { return jsonResponse(400, { success: false, message: 'Invalid JSON body' }); }
  }
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const token = typeof body.token === 'string' ? body.token : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!safeEqual(token, expectedToken) || !safeEqual(email, allowedEmail)) {
    return jsonResponse(403, { success: false, message: 'The reset authorization could not be verified.' });
  }
  if (password.length < 12 || password.length > 128) {
    return jsonResponse(400, { success: false, message: 'Password must be between 12 and 128 characters.' });
  }

  try {
    let targetUser: { id: string; email?: string } | null = null;
    for (let page = 1; page <= 10 && !targetUser; page += 1) {
      const response = await fetch(`${supabaseUrl}/auth/v1/admin/users?page=${page}&perPage=1000`, {
        headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}` },
      });
      if (!response.ok) {
        console.error('Supabase admin user lookup failed:', response.status);
        return jsonResponse(502, { success: false, message: 'Could not verify the target account with Supabase.' });
      }
      const payload = await response.json() as { users?: Array<{ id: string; email?: string }> };
      targetUser = (payload.users || []).find((user) => (user.email || '').toLowerCase() === allowedEmail) || null;
      if (!targetUser || (payload.users || []).length < 1000) break;
    }
    if (!targetUser?.id) return jsonResponse(404, { success: false, message: 'The configured admin account was not found.' });

    const updateResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users/${encodeURIComponent(targetUser.id)}`, {
      method: 'PUT',
      headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!updateResponse.ok) {
      const detail = await updateResponse.text();
      console.error('Supabase admin password update failed:', updateResponse.status, detail.slice(0, 300));
      return jsonResponse(502, { success: false, message: 'Supabase could not update the password. Check server configuration and key permissions.' });
    }
    return jsonResponse(200, { success: true, message: 'Password updated. Sign in with the new password.' });
  } catch (error) {
    console.error('Admin password reset failed:', error);
    return jsonResponse(502, { success: false, message: 'Password reset service is temporarily unavailable.' });
  }
};
