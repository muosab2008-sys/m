// مثال لخادم وسيط بسيط باستخدام Express و google-auth-library
// تعليمات: قم بتشغيله على خادم أو محليًا. لا ترفع ملف service account إلى GitHub.
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // إذا كنت تستخدم Node 18+ يمكنك استخدام global fetch بدلًا من هذا
const cors = require('cors');
const { GoogleAuth } = require('google-auth-library');

const app = express();
app.use(bodyParser.json());

// عدّل origin حسب استضافة الواجهة الأمامية
app.use(cors({
  origin: ['http://localhost:5500', 'https://your-production-domain.example'], // أضف نطاقك
  credentials: true
}));

// اسم الموديل يمكنك تغييره حسب توفره لحسابك
const MODEL = process.env.GEN_MODEL || 'gemini-3-pro-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// إعداد Google Auth (سيقرأ GOOGLE_APPLICATION_CREDENTIALS أو الاعتمادات الافتراضية)
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

app.post('/api/generate', async (req, res) => {
  try {
    const client = await auth.getClient();
    const accessTokenResponse = await client.getAccessToken();
    const accessToken = accessTokenResponse?.token || accessTokenResponse;

    if (!accessToken) {
      return res.status(500).json({ error: 'Unable to obtain access token' });
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    // حاول إرجاع JSON إن أمكن
    try {
      const json = JSON.parse(text);
      return res.status(response.status).json(json);
    } catch (e) {
      return res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('Error calling Generative Language API:', error);
    return res.status(500).json({ error: error.message || String(error) });
  }
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));

/*
تشغيل محلي:
1) export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
2) npm install express body-parser node-fetch cors google-auth-library
3) node server.js

ملاحظات أمنيّة:
- لا ترفع service-account.json إلى المستودع.
- استخدم قيود IAM المناسبة لحساب الخدمة.
- عند نشر في الإنتاج استخدم HTTPS وقيّم سياسات CORS.
*/
