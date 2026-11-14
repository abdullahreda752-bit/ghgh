import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const MANUS_URL = (process.env.MANUS_API_URL || process.env.BUILT_IN_FORGE_API_URL || '').replace(/\/$/, '');
const MANUS_KEY = process.env.MANUS_API_KEY || process.env.BUILT_IN_FORGE_API_KEY || '';
const MODEL = 'gpt-6-luna';
const SYSTEM = `أنت ARES، مساعد عربي طبيعي داخل موقع Mars Survival Guide. أجب بالعربية الواضحة وبأسلوب ودود ومباشر، وافهم الأسئلة العامية والأخطاء الإملائية. استخدم سياق الرسائل السابقة ولا تكرر السؤال. تخصصك: المريخ، الطقس والنماذج المناخية، الجاذبية، الماء والجليد، إنتاج الأكسجين، اختيار مواقع الهبوط، مهمات NASA، والتخطيط العام للبقاء. لا تدّعِ امتلاك قراءة طقس لحظية: وضّح أن بيانات InSight التاريخية انتهت وأن لوحة الموقع تعرض نماذج NASA. إذا كان السؤال خارج المريخ، أجب باختصار ثم أعد ربطه بالمهمة. لا تقدم تعليمات خطرة كأنها حقائق مضمونة، واذكر عند الحاجة أن الإجابة تثقيفية وليست قرار سلامة. اجعل الإجابة 2 إلى 5 فقرات قصيرة، ويمكن استخدام نقاط بسيطة.`;

function json(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {'content-type':'application/json; charset=utf-8','cache-control':'no-store','content-length':Buffer.byteLength(data)});
  res.end(data);
}
function safeFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const rel = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  if (!rel || rel.includes('..') || rel.includes('\\')) return null;
  return path.join(ROOT, rel);
}
function contentType(file) {
  return file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.json') ? 'application/json; charset=utf-8' : file.endsWith('.js') ? 'text/javascript; charset=utf-8' : file.endsWith('.css') ? 'text/css; charset=utf-8' : 'application/octet-stream';
}
async function readBody(req) {
  let raw='';
  for await (const chunk of req) { raw += chunk; if (raw.length > 120_000) throw new Error('payload_too_large'); }
  return JSON.parse(raw || '{}');
}
async function handleChat(req, res) {
  if (!MANUS_URL || !MANUS_KEY) return json(res, 503, {error:'ARES server configuration is not ready'});
  let input;
  try { input = await readBody(req); } catch { return json(res, 400, {error:'Invalid request'}); }
  const incoming = Array.isArray(input.messages) ? input.messages : [];
  const messages = incoming.slice(-12).filter(m => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string').map(m => ({role:m.role,content:m.content.slice(0,1800)}));
  if (!messages.length || messages[messages.length-1].role !== 'user') return json(res, 400, {error:'A user message is required'});
  try {
    const upstream = await fetch(`${MANUS_URL}/v1/chat/completions`, {
      method:'POST',
      headers:{'authorization':`Bearer ${MANUS_KEY}`,'content-type':'application/json'},
      body:JSON.stringify({model:MODEL,messages:[{role:'system',content:SYSTEM},...messages],reasoning:{effort:'low'},max_completion_tokens:700})
    });
    const data = await upstream.json().catch(()=>({}));
    if (!upstream.ok || data.error) return json(res, 502, {error:'ARES upstream request failed'});
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) return json(res, 502, {error:'ARES returned no text'});
    return json(res, 200, {reply:reply.trim(),model:MODEL});
  } catch { return json(res, 502, {error:'ARES is temporarily unavailable'}); }
}
const server = http.createServer(async (req,res)=>{
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    if (req.method === 'GET' && url.pathname === '/health') return json(res,200,{ok:true,service:'ares'});
    if (req.method === 'POST' && url.pathname === '/api/ares') return handleChat(req,res);
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res,405,{error:'Method not allowed'});
    const file = safeFile(url.pathname);
    if (!file) return json(res,400,{error:'Bad path'});
    const data = await fs.readFile(file);
    res.writeHead(200,{'content-type':contentType(file),'cache-control':file.endsWith('.html')?'no-cache':'public, max-age=300'});
    if (req.method !== 'HEAD') res.end(data); else res.end();
  } catch (e) {
    if (e?.code === 'ENOENT') return json(res,404,{error:'Not found'});
    return json(res,500,{error:'Server error'});
  }
});
server.listen(PORT,'0.0.0.0',()=>console.log(`ARES server listening on ${PORT}`));
