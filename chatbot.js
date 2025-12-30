class Chatbot {
  constructor() {
    this.isOpen = false;
    // المفتاح الخاص بك
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    // تم تحديث الرابط ليكون أكثر استقراراً
    this.apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
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
            <p class="chatbot-subtitle">مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="اسألني عن أي تخصص..." autocomplete="off" />
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
    this.addMessage({ type: 'bot', text: 'مرحباً بك! أنا مستشارك المهني الذكي. كيف يمكنني مساعدتك اليوم؟' });
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
      // محرك الردود المحلية الاحتياطي في حال فشل السيرفر
      this.addMessage({ type: 'bot', text: this.localReply(msg) });
    }
  }

  async getAIResponse(userMessage) {
    // إرسال الطلب بتنسيق JSON الصارم المتوافق مع Gemini
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userMessage + " (أجب باختصار باللغة العربية كخبير في التخصصات الجامعية)" }]
        }]
      })
    });

    if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('Empty Response');
  }

  localReply(msg) {
    const t = msg.toLowerCase();
    if (t.includes("من انت") || t.includes("مين")) return "أنا مساعدك الذكي في منصة مهنتي.";
    if (t.includes("هلا") || t.includes("مرحبا")) return "أهلاً بك! كيف يمكنني مساعدتك؟";
    return "سؤال رائع! اختيار التخصص يعتمد على شغفك وسوق العمل. هل جربت اختبار التخصص في موقعنا؟";
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
