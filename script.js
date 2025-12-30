// محتوى script.js (لمنع 404 وتهيئة بعض التفاعلات البسيطة)
document.addEventListener('DOMContentLoaded', () => {
  // إخفاء شاشة الترحيب بعد التحميل (تتوافق مع index.html)
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.classList.add('fade-out');
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 1000);
    }, 2000);
  }

  // مثال بسيط: طباعة تسجيل في الكونسول لتأكيد تحميل الملف
  console.log('script.js loaded');
});
