export type AppRole = 'admin' | 'creator' | 'approver' | 'publisher';

type NetlifyEvent = {
  headers?: Record<string, string | undefined>;
};

export function jsonResponse(statusCode: number, payload: unknown, extraHeaders: Record<string, string> = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
    body: JSON.stringify(payload),
  };
}

export async function authenticateRequest(event: NetlifyEvent, allowedRoles: AppRole[]) {
  const headers = event.headers || {};
  const authorization = headers.authorization || headers.Authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!token) return { user: null, response: jsonResponse(401, { success: false, message: 'Authentication required' }) };
  if (!supabaseUrl || !publishableKey) {
    return { user: null, response: jsonResponse(500, { success: false, message: 'Supabase server configuration is missing' }) };
  }

  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: publishableKey, Authorization: `Bearer ${token}` },
    });
    if (!userResponse.ok) {
      return { user: null, response: jsonResponse(401, { success: false, message: 'Invalid or expired session' }) };
    }
    const user = await userResponse.json() as { id?: string };
    if (!user.id) {
      return { user: null, response: jsonResponse(401, { success: false, message: 'Invalid session user' }) };
    }

    const rolesResponse = await fetch(
      `${supabaseUrl}/rest/v1/user_roles?select=role&user_id=eq.${encodeURIComponent(user.id)}`,
      { headers: { apikey: publishableKey, Authorization: `Bearer ${token}` } },
    );
    if (!rolesResponse.ok) {
      return { user: null, response: jsonResponse(403, { success: false, message: 'Unable to verify user permissions' }) };
    }
    const rows = await rolesResponse.json() as Array<{ role: AppRole }>;
    const roles = rows.map((row) => row.role);
    if (!roles.some((role) => allowedRoles.includes(role))) {
      return { user: null, response: jsonResponse(403, { success: false, message: 'Insufficient permissions' }) };
    }
    return { user: { id: user.id, roles }, response: null };
  } catch (error) {
    console.error('Supabase authentication error:', error);
    return { user: null, response: jsonResponse(502, { success: false, message: 'Authentication service unavailable' }) };
  }
}

export async function proxyToN8n(path: string, method: string, body: unknown) {
  const baseUrl = process.env.N8N_BASE_URL?.replace(/\/$/, '');
  const webhookKey = process.env.N8N_WEBHOOK_KEY;
  if (!baseUrl || !webhookKey) {
    return jsonResponse(500, { success: false, message: 'Server configuration is missing' });
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        'X-GIAO-THOI-KEY': webhookKey,
        ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(method !== 'GET' ? { body: JSON.stringify(body ?? {}) } : {}),
    });
    return {
      statusCode: response.status,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
      body: await response.text(),
    };
  } catch (error) {
    console.error('n8n proxy error:', error);
    return jsonResponse(502, { success: false, message: 'Cannot connect to n8n' });
  }
}
