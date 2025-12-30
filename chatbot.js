// chatbot.js - النسخة المخصصة لـ GitHub Pages
class Chatbot {
  constructor() {
    this.isOpen = false;
    // المفتاح النشط
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
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
            <p class="chatbot-subtitle">ذكاء اصطناعي مباشر</p>
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
    this.addMessage({ type: 'bot', text: 'مرحباً! أنا أعمل الآن عبر الاستضافة. كيف يمكنني مساعدتك؟' });
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
      this.hideTyping();
      // إذا فشل الـ AI، استخدم المحرك المحلي المطور
      this.addMessage({ type: 'bot', text: this.localReply(msg) });
      console.error("Gemini Error:", error);
    }
  }

  async getAIResponse(userMessage) {
    // الرابط المباشر
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage + " (أجب باختصار باللغة العربية كخبير توجيه مهني)" }] }]
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'API Limit');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  localReply(msg) {
    const t = msg.toLowerCase();
    if (t.includes("من انت") || t.includes("مين")) return "أنا مساعد مهنتي الذكي، أعمل بنظام هجين (ذكاء اصطناعي + قاعدة بيانات محلية).";
    if (t.includes("هلا") || t.includes("مرحبا")) return "أهلاً بك! كيف يمكنني مساعدتك اليوم؟";
    if (t.includes("برمج")) return "البرمجة مجال رائع ومطلوب بشدة في سوق العمل الحالي.";
    return "سؤال جيد! اختيار التخصص يعتمد على شغفك وسوق العمل. هل جربت اختبار التخصص؟";
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
