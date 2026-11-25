import { authenticateRequest, jsonResponse, proxyToN8n, type AppRole } from './_lib/auth';

const webhooks: Record<string, { method: string; path: string }> = {
  'giaothoi-dashboard': { method: 'GET', path: '/webhook/giaothoi-dashboard' },
  'giaothoi-ai-assistant': { method: 'POST', path: '/webhook/giaothoi-ai-assistant' },
  'giaothoi-content-studio': { method: 'POST', path: '/webhook/giaothoi-content-studio' },
  'giaothoi-campaign-planner': { method: 'POST', path: '/webhook/giaothoi-campaign-planner' },
  'giaothoi-analytics': { method: 'POST', path: '/webhook/giaothoi-analytics' },
  'giaothoi-marketing-insights': { method: 'POST', path: '/webhook/giaothoi-marketing-insights' },
  'giaothoi-content-library': { method: 'GET', path: '/webhook/giaothoi-content-library' },
  'giaothoi-content-library-save': { method: 'POST', path: '/webhook/giaothoi-content-library-save' },
  'giaothoi-content-approval': { method: 'POST', path: '/webhook/giaothoi-content-approval' },
  'giaothoi-automation-workflows': { method: 'GET', path: '/webhook/giaothoi-automation-workflows' },
  'giaothoi-automation-executions': { method: 'GET', path: '/webhook/giaothoi-automation-executions' },
  'giaothoi-schedules': { method: 'GET', path: '/webhook/giaothoi-schedules' },
  'giaothoi-automation-control': { method: 'POST', path: '/webhook/giaothoi-automation-control' },
  'giaothoi-automation-run': { method: 'POST', path: '/webhook/giaothoi-automation-run' },
};

const roleMap: Record<string, AppRole[]> = {
  'giaothoi-content-studio': ['admin', 'creator'],
  'giaothoi-content-library-save': ['admin', 'creator'],
  'giaothoi-content-approval': ['admin', 'approver'],
  'giaothoi-automation-control': ['admin'],
  'giaothoi-automation-run': ['admin'],
};

export const handler = async (event: any) => {
  const prefix = '/.netlify/functions/n8n-proxy/';
  const route = (event.path || '').startsWith(prefix)
    ? decodeURIComponent(event.path.slice(prefix.length).split('/')[0] || '')
    : (event.queryStringParameters?.route || '');
  const webhook = webhooks[route];
  if (!webhook) return jsonResponse(404, { success: false, message: 'Webhook route not found' });
  if (event.httpMethod !== webhook.method) {
    return jsonResponse(405, { success: false, message: 'Method not allowed' }, { Allow: webhook.method });
  }

  const allowedRoles = roleMap[route] ?? ['admin', 'creator', 'approver', 'publisher'];
  const auth = await authenticateRequest(event, allowedRoles);
  if (!auth.user) return auth.response;

  let body: unknown = {};
  if (webhook.method !== 'GET' && event.body) {
    try { body = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body); }
    catch { return jsonResponse(400, { success: false, message: 'Invalid JSON body' }); }
  }
  return proxyToN8n(webhook.path, webhook.method, body);
};
