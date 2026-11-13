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
