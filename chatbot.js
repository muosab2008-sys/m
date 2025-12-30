// نسخة مُعدلة من chatbot.js — لا تحتوي على مفاتيح API وتستخدم proxy server محلي (/api/generate)
class Chatbot {
  constructor() {
    this.isOpen = false;
    // لا تحفظ مفاتيح هنا — سيتم الاعتماد على الخادم الوسيط
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
    if (document.getElementById('chatbotToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'chatbotToggle'; btn.className = 'chatbot-toggle'; btn.innerHTML = '💬';
    btn.onclick = () => this.toggleChat();

    const win = document.createElement('div');
    win.id = 'chatbotWindow'; win.className = 'chatbot-window hidden';
    win.innerHTML = `
      <div class="chatbot-header"><span>🤖 مساعد مهنتي</span><button onclick="chatbot.toggleChat()">✕</button></div>
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
    this.addMessage({ type: 'bot', text: 'مرحباً! كيف يمكنني مساعدتك؟' });
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
      // استدعاء proxy محلي بدلاً من استدعاء Google مباشرة
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: msg }] }]
        })
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();
      this.hideTyping();

      // بناء على هيكلة استجابة Generative Language API
      if (data?.candidates && data.candidates[0]?.content?.parts) {
        const text = data.candidates[0].content.parts.map(p => p.text).join('\n');
        this.addMessage({ type: 'bot', text });
      } else if (data?.output?.[0]?.content?.[0]?.text) {
        // fallback structure if different
        this.addMessage({ type: 'bot', text: data.output[0].content[0].text });
      } else {
        this.addMessage({ type: 'bot', text: 'لم أتلقَ ردًا واضحًا من الخادم.' });
        console.warn('Unexpected response:', data);
      }
    } catch (error) {
      this.hideTyping();
      this.addMessage({ type: 'bot', text: "حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً." });
      console.error(error);
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
