// chatbot.js - النسخة النهائية الاحترافية (إصلاح شامل لأخطاء 403 و 404)
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    
    // قائمة الموديلات مرتبة من الأحدث إلى الأكثر استقراراً
    this.models = [
      'gemini-1.5-flash', // الأكثر استقراراً للعمل من المتصفح مباشرة
      'gemini-3-pro-preview', 
      'gemini-pro'
    ];
    
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
    if (document.getElementById('chatbotToggle')) return;

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
            <h3 class="chatbot-title">مساعد مهنتي الذكي</h3>
            <p class="chatbot-subtitle">متصل بنظام Gemini</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" placeholder="اسألني عن مستقبلك المهني..." autocomplete="off" />
        <button id="chatbotSend" onclick="chatbot.sendMessage()">➤</button>
      </div>`;

    document.body.appendChild(btn);
    document.body.appendChild(win);

    document.getElementById('chatbotInput').onkeypress = (e) => {
      if (e.key === 'Enter') this.sendMessage();
    };
  }

  addWelcomeMessage() {
    this.addMessage({ type: 'bot', text: 'مرحباً بك في منصة مهنتي! أنا مستشارك الذكي، كيف يمكنني مساعدتك في اختيار تخصصك الجامعي اليوم؟' });
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

    let success = false;
    
    // محاولة الاتصال بكل الموديلات المتاحة حتى ينجح واحد منها
    for (const modelName of this.models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: msg + " (أجب باللغة العربية بأسلوب خبير توجيه مهني)" }] }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          this.hideTyping();
          const botReply = data.candidates[0].content.parts[0].text;
          this.addMessage({ type: 'bot', text: botReply });
          success = true;
          break; // توقف عن المحاولة بمجرد نجاح أي موديل
        } else {
          console.warn(`Model ${modelName} failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error with ${modelName}:`, error);
      }
    }

    if (!success) {
      this.hideTyping();
      this.addMessage({ 
        type: 'bot', 
        text: 'عذراً، أواجه مشكلة في الاتصال حالياً. حاول مجدداً بعد قليل أو تأكد من إعدادات API في حسابك.' 
      });
    }
  }

  addMessage(message) {
    const container = document.getElementById('chatbotMessages');
    const div = document.createElement('div');
    div.className = `chatbot-message chatbot-message-${message.type}`;
    div.innerHTML = `<div class="chatbot-message-content">${message.text.replace(/\n/g, '<br>')}</div>`;
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

// تشغيل البوت
const chatbot = new Chatbot();
