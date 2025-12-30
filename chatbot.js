// chatbot.js - النسخة الاحترافية الشاملة لموقع مهنتي
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    // المفتاح النشط الخاص بك
    this.apiKey = 'AIzaSyAiANEtYof4iJMn6aXolyNP_csjYX2ef3g';
    this.init();
  }

  init() {
    this.createChatInterface();
    this.addWelcomeMessage();
  }

  createChatInterface() {
    // إنشاء الزر العائم
    const chatButton = document.createElement('button');
    chatButton.id = 'chatbotToggle';
    chatButton.className = 'chatbot-toggle';
    chatButton.innerHTML = '💬';
    chatButton.onclick = () => this.toggleChat();

    // إنشاء نافذة المحادثة
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbotWindow';
    chatWindow.className = 'chatbot-window hidden';
    
    chatWindow.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-content">
          <div class="chatbot-avatar">🤖</div>
          <div>
            <h3 class="chatbot-title">مساعد مهنتي الذكي</h3>
            <p class="chatbot-subtitle">متصل - جاهز للمساعدة</p>
          </div>
        </div>
        <button class="chatbot-close" onclick="chatbot.toggleChat()">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages"></div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="اكتب سؤالك هنا..." autocomplete="off" />
        <button class="chatbot-send" id="chatbotSend" onclick="chatbot.sendMessage()">
          <span>➤</span>
        </button>
      </div>
    `;

    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);

    // ربط زر Enter بالإرسال
    const input = document.getElementById('chatbotInput');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  addWelcomeMessage() {
    this.addMessage({
      type: 'bot',
      text: 'مرحباً بك في منصة مهنتي! 👋 أنا مساعدك الذكي. يمكنني مساعدتك في اكتشاف تخصصك المناسب والإجابة على استفساراتك المهنية. كيف أخدمك اليوم؟'
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbotWindow');
    if (this.isOpen) {
      window.classList.remove('hidden');
      document.getElementById('chatbotInput').focus();
    } else {
      window.classList.add('hidden');
    }
  }

  async sendMessage() {
    const input = document.getElementById('chatbotInput');
    const userMessage = input.value.trim();

    if (!userMessage) return;

    // 1. إظهار رسالة المستخدم
    this.addMessage({ type: 'user', text: userMessage });
    input.value = '';

    // 2. تفعيل حالة الانتظار
    const sendButton = document.getElementById('chatbotSend');
    input.disabled = true;
    this.showTypingIndicator();

    try {
      // 3. محاولة جلب رد من الذكاء الاصطناعي (Gemini)
      const response = await this.getAIResponse(userMessage);
      this.hideTypingIndicator();
      this.addMessage({ type: 'bot', text: response });
    } catch (error) {
      // 4. في حال الفشل، استخدام المحرك المحلي (Local Brain)
      this.hideTypingIndicator();
      const fallbackResponse = this.getLocalResponse(userMessage);
      this.addMessage({ type: 'bot', text: fallbackResponse });
    } finally {
      input.disabled = false;
      input.focus();
    }
  }

  async getAIResponse(userMessage) {
    // استخدام موديل 1.5-flash الأسرع ورابط v1beta المتوافق
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `أنت مساعد خبير في موقع "مهنتي" للتوجيه المهني بالسعودية. أجب باختصار وودية بالعربية على: ${userMessage}` }]
        }]
      })
    });

    if (!response.ok) throw new Error('API Error');

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // محرك الردود المحلية عند تعطل الـ API (ضمان عدم تكرار الرد)
  getLocalResponse(msg) {
    const text = msg.toLowerCase();
    if (text.includes("من انت") || text.includes("مين")) 
        return "أنا المساعد الذكي لمنصة مهنتي، أساعدك في اختيار تخصصك الجامعي بناءً على ميولك الشخصية.";
    if (text.includes("هلا") || text.includes("مرحبا") || text.includes("hi"))
        return "أهلاً بك! كيف يمكنني مساعدتك في رحلتك الدراسية اليوم؟";
    if (text.includes("برمج") || text.includes("حاسب") || text.includes("تقني"))
        return "تخصصات الحاسب والبرمجة هي الأكثر طلباً في سوق العمل حالياً. هل تريد معرفة الفرق بين علوم الحاسب وهندسة البرمجيات؟";
    if (text.includes("طب") || text.includes("صحي"))
        return "المجال الصحي يتطلب شغفاً كبيراً ودقة. هل تميل للطب البشري أم تخصصات العلوم الطبية التطبيقية؟";
    if (text.includes("هندس"))
        return "الهندسة بحر واسع! الهندسة المدنية، الميكانيكية، والكهربائية كلها تخصصات حيوية في مشاريع المملكة الكبرى.";
    if (text.includes("اختبار"))
        return "الاختبار في موقعنا يحلل شخصيتك ويقترح عليك تخصصات تناسبك. يمكنك البدء به من القائمة العلوية.";
    
    return "سؤال رائع! اختيار التخصص يعتمد على التوازن بين شغفك وحاجة سوق العمل. هل جربت اختبار التخصص في موقعنا لتعرف ما يناسبك بدقة؟";
  }

  addMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message chatbot-message-${message.type}`;
    
    const avatar = message.type === 'bot' ? '<div class="chatbot-avatar-small">🤖</div>' : '';
    messageDiv.innerHTML = `
      ${avatar}
      <div class="chatbot-message-content">${message.text.replace(/\n/g, '<br>')}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'chatbot-message chatbot-message-bot';
    typingDiv.innerHTML = `
      <div class="chatbot-avatar-small">🤖</div>
      <div class="chatbot-message-content typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }
}

// تشغيل البوت
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
  chatbot = new Chatbot();
});