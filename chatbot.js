// chatbot.js - النسخة النهائية المخصصة لـ GitHub Pages
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
        <div class="chatbot-header-content">
          <div class="chatbot-avatar">🤖</div>
          <div>
            <h3 class="chatbot-title">مساعد مهنتي</h3>
            <p class="chatbot-subtitle">مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" placeholder="اسألني عن أي تخصص..." autocomplete="off" />
        <button id="chatbotSend" onclick="chatbot.sendMessage()">➤</button>
      </div>`;
    document.body.appendChild(btn);
    document.body.appendChild(win);
    document.getElementById('chatbotInput').onkeypress = (e) => { if (e.key === 'Enter') this.sendMessage(); };
  }

  addWelcomeMessage() {
    this.addMessage({ type: 'bot', text: 'مرحباً بك! أنا مستشارك المهني. كيف يمكنني مساعدتك اليوم؟' });
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

    // محاولة الاتصال عبر مسارات مختلفة لحل مشكلة 404 نهائياً
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`
    ];

    let success = false;
    for (let url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: msg + " (أجب باختصار باللغة العربية كخبير توجيه مهني)" }] }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          this.hideTyping();
          this.addMessage({ type: 'bot', text: data.candidates[0].content.parts[0].text });
          success = true;
          break; 
        }
      } catch (e) { console.error("Endpoint failed:", url); }
    }

    if (!success) {
      this.hideTyping();
      this.addMessage({ type: 'bot', text: this.localReply(msg) });
    }
  }

  localReply(msg) {
    const t = msg.toLowerCase();
    if (t.includes("من انت")) return "أنا مساعدك الذكي في منصة مهنتي.";
    if (t.includes("مرحبا") || t.includes("هلا")) return "أهلاً بك! كيف يمكنني مساعدتك؟";
    return "سؤال رائع! يبدو أن هناك ضغطاً على السيرفر، ولكن اختيار التخصص يعتمد دائماً على الموازنة بين الشغف وسوق العمل.";
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
    div.innerHTML = '<div class="chatbot-message-content">جاري التحليل...</div>';
    document.getElementById('chatbotMessages').appendChild(div);
  }

  hideTyping() {
    const el = document.getElementById('typing');
    if (el) el.remove();
  }
}

const chatbot = new Chatbot();
