// Cloudflare Worker (مجاني) — بيخبّي مفتاح Gemini. الصقه في Workers > Edit code
// وضيف Secret باسم GEMINI_API_KEY. غيّر ORIGIN لدومين موقعك (أو '*' للتجربة).
const ORIGIN = '*';
const MODELS = ['gemini-3.5-flash-lite','gemini-3.8-flash','gemini-3.5-flash'];
const cors = {'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST,OPTIONS'};
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, {headers: cors});
    if (req.method !== 'POST') return new Response('ok', {headers: cors});
    const b = await req.json().catch(() => ({}));
    const model = MODELS.includes(b.model) ? b.model : MODELS[0];
    const contents = Array.isArray(b.contents) ? b.contents.slice(-20) : [];
    if (!contents.length) return new Response('{"error":{"message":"bad request"}}', {status:400, headers:cors});
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {'Content-Type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},
      body: JSON.stringify({contents, systemInstruction:b.systemInstruction, generationConfig:{temperature:.8,maxOutputTokens:2048}})
    });
    return new Response(await r.text(), {status:r.status, headers:{...cors,'Content-Type':'application/json'}});
  }
};
