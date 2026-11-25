import { authenticateRequest, jsonResponse, proxyToN8n } from './_lib/auth';

export const handler = async (event: any) => {
  const method = event.httpMethod || 'GET';
  const paths: Record<string, string> = {
    GET: '/webhook/giaothoi-calendar',
    POST: '/webhook/giaothoi-calendar-save',
    PUT: '/webhook/giaothoi-calendar-update',
    DELETE: '/webhook/giaothoi-calendar-delete',
  };
  if (!paths[method]) return jsonResponse(405, { success: false, message: 'Method not allowed' }, { Allow: 'GET, POST, PUT, DELETE' });

  const allowedRoles = method === 'GET'
    ? ['admin', 'creator', 'approver', 'publisher'] as const
    : ['admin', 'publisher'] as const;
  const auth = await authenticateRequest(event, [...allowedRoles]);
  if (!auth.user) return auth.response;

  let body: unknown = {};
  if (method !== 'GET' && event.body) {
    try { body = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body); }
    catch { return jsonResponse(400, { success: false, message: 'Invalid JSON body' }); }
  }
  return proxyToN8n(paths[method], method, body);
};
