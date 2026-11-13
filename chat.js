// Netlify Function: بيخبّي مفتاح Gemini عن الزوار
// حط المفتاح في Netlify > Site settings > Environment variables باسم GEMINI_API_KEY
const ALLOWED = ['gemini-3.5-flash-lite','gemini-3.8-flash','gemini-3.5-flash'];
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const key = process.env.GEMINI_API_KEY;
  if (!key) return json(500, { error: { message: 'GEMINI_API_KEY غير مضبوط على السيرفر' } });
  let b; try { b = JSON.parse(event.body || '{}'); } catch { return json(400, { error: { message: 'Bad JSON' } }); }
  const model = ALLOWED.includes(b.model) ? b.model : ALLOWED[0];
  const contents = Array.isArray(b.contents) ? b.contents.slice(-20) : [];
  if (!contents.length || JSON.stringify(contents).length > 60000) return json(400, { error: { message: 'رسالة غير صالحة أو طويلة' } });
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents, systemInstruction: b.systemInstruction, generationConfig: { temperature: 0.8, maxOutputTokens: 2048 } })
  });
  return { statusCode: r.status, headers: { 'Content-Type': 'application/json' }, body: await r.text() };
};
const json = (s, o) => ({ statusCode: s, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(o) });
