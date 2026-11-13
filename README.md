# موقع دليل النجاة بين الكواكب + شات بوت ARES

## الملفات
- `index.html` الموقع (فيه زرار شات عائم 🚀 بيفتح البوت جوه الموقع)
- `chat.html` صفحة الشات بنفس تصميم الموقع (وبتتفتح كمان لوحدها)
- `netlify/functions/chat.js` سيرفر وسيط بيخبّي مفتاح Gemini
- `netlify.toml` إعدادات Netlify
- ملف الصوت `.mp3` لازم يفضل جنب `index.html`

## الرفع (الطريقة الآمنة الموصى بها: Netlify + GitHub)
1. اعمل مفتاح جديد من https://aistudio.google.com/app/apikey
2. ارفع الملفات كلها على repo في GitHub.
3. على Netlify: Add new site > Import from Git > اختار الـ repo.
4. Site settings > Environment variables: أضف `GEMINI_API_KEY` = مفتاحك. وبعدها Deploy.

## بدون سيرفر (سحب وإفلات أو GitHub Pages)
الموقع هيشتغل، والشات هيطلب من الزائر يحط مفتاحه الشخصي (زر ⚙). متحطش مفتاحك جوه الكود أبداً.

## تنبيه
المفتاح القديم كان مكتوب جوه ملف الشات، فاعتبره مكشوف وامسحه من AI Studio واعمل جديد.

## تشغيل الشات تلقائي بدون ما الزائر يحط مفتاح

### الطريقة أ — الأسهل (مفتاح في الكود)
1. اعمل مفتاح جديد من AI Studio.
2. افتح `chat.html` وحط المفتاح: `const CFG={key:'AIza...',...`
3. **مهم:** المفتاح هيبقى ظاهر لأي زائر، فقيّده من Google Cloud Console > Credentials > المفتاح > Application restrictions > Websites، وحط دومين موقعك بس. وحط حد صرف يومي. (التقييد بيقلل الاستغلال لكن مش بيمنعه 100%).

### الطريقة ب — الأأمن (Cloudflare Worker مجاني، من غير GitHub)
1. dash.cloudflare.com > Workers & Pages > Create > Hello World > Deploy.
2. Edit code: الصق محتوى `cloudflare-worker.js` واعمل Deploy.
3. Settings > Variables and Secrets > أضف Secret اسمه `GEMINI_API_KEY` وقيمته مفتاحك.
4. انسخ رابط الـ Worker (مثلاً `https://ares.xxx.workers.dev`) وحطه في `chat.html`: `proxy:'https://ares.xxx.workers.dev'`
5. ارفع الموقع في أي استضافة.
