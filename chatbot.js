// chatbot.js - النسخة المصححة لـ GitHub
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    // استخدام الرابط v1 الصريح لتجنب خطأ 404
    this.apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
    // التأكد من عدم تكرار الواجهة
    if(document.getElementById('chatbotToggle')) return;

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
            <p class="chatbot-subtitle">ذكاء اصطناعي نشط</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="اكتب سؤالك هنا..." autocomplete="off" />
        <button class="chatbot-send" id="chatbotSend" onclick="chatbot.sendMessage()">➤</button>
      </div>
    `;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    document.getElementById('chatbotInput').onkeypress = (e) => {
      if (e.key === 'Enter') this.sendMessage();
    };
  }

  addWelcomeMessage() {
    this.addMessage({ type: 'bot', text: 'مرحباً! تم تحديث النظام. كيف يمكنني مساعدتك في تخصصك اليوم؟' });
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
      const response = await this.getAIResponse(msg);
      this.hideTyping();
      this.addMessage({ type: 'bot', text: response });
    } catch (error) {
      console.error("Detail Error:", error);
      this.hideTyping();
      this.addMessage({ type: 'bot', text: this.localReply(msg) });
    }
  }

  async getAIResponse(userMessage) {
    // الطلب موجه لنموذج v1 المحدث
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });

    if (!response.ok) {
        // إذا فشل v1، نجرب v1beta تلقائياً
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
        const fallbackRes = await fetch(fallbackUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] })
        });
        if (!fallbackRes.ok) throw new Error('Both API versions failed');
        const fallbackData = await fallbackRes.json();
        return fallbackData.candidates[0].content.parts[0].text;
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  localReply(msg) {
    const t = msg.toLowerCase();
    if (t.includes("من انت") || t.includes("مين")) return "أنا مساعدك الذكي في منصة مهنتي.";
    return "أهلاً بك! نظام الذكاء الاصطناعي يواجه ضغطاً حالياً، لكن يمكنك دائماً استخدام اختبار التخصص في موقعنا.";
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

const chatbot = new Chatbot();
