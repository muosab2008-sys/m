// chatbot.js - النسخة النهائية المتوافقة مع Gemini 3
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    
    // تم التعديل لاستخدام Gemini 3 Pro Preview كما ظهر في حسابك
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${this.apiKey}`;
    
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
    // التأكد من عدم تكرار الواجهة
    if (document.getElementById('chatbotToggle')) return;

    const chatButton = document.createElement('button');
    chatButton.id = 'chatbotToggle';
    chatButton.className = 'chatbot-toggle';
    chatButton.innerHTML = '💬';
    chatButton.onclick = () => this.toggleChat();

    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbotWindow';
    chatWindow.className = 'chatbot-window hidden';
    
    chatWindow.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-content">
          <div class="chatbot-avatar">🤖</div>
          <div>
            <h3 class="chatbot-title">مساعد مهنتي</h3>
            <p class="chatbot-subtitle">يعمل بنظام Gemini 3</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="اسألني أي شيء..." autocomplete="off" />
        <button class="chatbot-send" id="chatbotSend" onclick="chatbot.sendMessage()">➤</button>
      </div>
    `;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    document.getElementById('chatbotInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  addWelcomeMessage() {
    this.addMessage({ type: 'bot', text: 'مرحباً! أنا مساعدك المهني المدعوم بأحدث تقنيات Gemini 3. كيف يمكنني مساعدتك؟' });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    document.getElementById('chatbotWindow').classList.toggle('hidden', !this.isOpen);
  }

  async sendMessage() {
    const input = document.getElementById('chatbotInput');
    const msg = input.value.trim();
    if (!msg) return;

    this.addMessage({ type: 'user', text: msg });
    input.value = '';
    this.showTyping();

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: msg + " (أجب باختصار باللغة العربية كخبير توجيه مهني)" }]
          }]
        })
      });

      // إذا لم ينجح الرابط الأول، سنحاول الرابط البديل تلقائياً
      if (!response.ok) {
          const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
          const fallbackRes = await fetch(fallbackUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contents: [{ parts: [{ text: msg }] }] })
          });
          const data = await fallbackRes.json();
          this.displayResult(data);
      } else {
          const data = await response.json();
          this.displayResult(data);
      }
    } catch (error) {
      this.hideTyping();
      this.addMessage({ type: 'bot', text: "عذراً، يبدو أن هناك مشكلة فنية. حاول مجدداً بعد قليل." });
    }
  }

  displayResult(data) {
    this.hideTyping();
    if (data.candidates && data.candidates[0]) {
      this.addMessage({ type: 'bot', text: data.candidates[0].content.parts[0].text });
    }
  }

  addMessage(message) {
    const container = document.getElementById('chatbotMessages');
    const div = document.createElement('div');
    div.className = `chatbot-message chatbot-message-${message.type}`;
    div.innerHTML = `<div class="chatbot-message-content">${message.text}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  showTyping() {
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'chatbot-message chatbot-message-bot';
    div.innerHTML = '<div class="chatbot-message-content">جاري التفكير...</div>';
    document.getElementById('chatbotMessages').appendChild(div);
  }

  hideTyping() {
    const el = document.getElementById('typing');
    if (el) el.remove();
  }
}

let chatbot = new Chatbot();
