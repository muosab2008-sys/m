class Chatbot {
  constructor() {
    this.isOpen = false;
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
    if(document.getElementById('chatbotToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'chatbotToggle';
    btn.className = 'chatbot-toggle';
    btn.innerHTML = '💬';
    btn.onclick = () => this.toggleChat();

    const win = document.createElement('div');
    win.id = 'chatbotWindow';
    win.className = 'chatbot-window hidden';
    win.innerHTML = `
      <div class="chatbot-header">
        <span>🤖 مساعد مهنتي</span>
        <button onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" placeholder="اسألني أي شيء..." autocomplete="off" />
        <button id="chatbotSend" onclick="chatbot.sendMessage()">➤</button>
      </div>`;
    document.body.appendChild(btn);
    document.body.appendChild(win);
    document.getElementById('chatbotInput').onkeypress = (e) => { if (e.key === 'Enter') this.sendMessage(); };
  }

  addWelcomeMessage() {
    this.addMessage({ type: 'bot', text: 'مرحباً! أنا أبحث الآن عن أفضل طريقة للاتصال بالذكاء الاصطناعي لمساعدتك.' });
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

    // محاولة الاتصال عبر عدة روابط لحل مشكلة 404
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`
    ];

    let success = false;
    for (let url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: msg }] }] })
        });

        if (response.ok) {
          const data = await response.json();
          this.hideTyping();
          this.addMessage({ type: 'bot', text: data.candidates[0].content.parts[0].text });
          success = true;
          break; // توقف عند أول نجاح
        }
      } catch (e) { continue; }
    }

    if (!success) {
      this.hideTyping();
      this.addMessage({ type: 'bot', text: "عذراً، لا يزال الرابط يرفض الاتصال. يرجى التأكد من تفعيل 'Gemini API' في Google AI Studio." });
    }
  }

  addMessage(message) {
    const container = document.getElementById('chatbotMessages');
    const div = document.createElement('div');
    div.className = `chatbot-message chatbot-message-${message.type}`;
    div.innerText = message.text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  showTyping() {
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'chatbot-message chatbot-message-bot';
    div.innerText = 'جاري التفكير...';
    document.getElementById('chatbotMessages').appendChild(div);
  }

  hideTyping() {
    const el = document.getElementById('typing');
    if (el) el.remove();
  }
}

const chatbot = new Chatbot();
