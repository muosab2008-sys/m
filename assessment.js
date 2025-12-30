// Assessment Questions Data
const questions = [
  {
    id: 1,
    question: "ما هي المادة الدراسية المفضلة لديك؟",
    options: [
      { text: "الرياضيات والفيزياء", scores: { engineering: 3, computerScience: 3, architecture: 1 } },
      { text: "الأحياء والكيمياء", scores: { medicine: 3, pharmacy: 3, nursing: 2 } },
      { text: "اللغات والأدب", scores: { law: 2, businessAdmin: 1, marketing: 2 } },
      { text: "الفنون والتصميم", scores: { architecture: 3, marketing: 2, computerScience: 1 } },
    ],
  },
  {
    id: 2,
    question: "كيف تفضل قضاء وقت فراغك؟",
    options: [
      { text: "حل المسائل والألغاز المنطقية", scores: { engineering: 3, computerScience: 3, law: 1 } },
      { text: "القراءة والبحث عن معلومات جديدة", scores: { medicine: 2, law: 3, businessAdmin: 2 } },
      { text: "الرسم والتصميم", scores: { architecture: 3, marketing: 2 } },
      { text: "مساعدة الآخرين والتطوع", scores: { medicine: 3, nursing: 3, pharmacy: 2 } },
    ],
  },
  {
    id: 3,
    question: "ما هو أسلوب التعلم الذي يناسبك أكثر؟",
    options: [
      { text: "التطبيق العملي والتجارب", scores: { engineering: 3, medicine: 2, pharmacy: 2 } },
      { text: "الدراسة النظرية والتحليل", scores: { law: 3, businessAdmin: 2, computerScience: 2 } },
      { text: "المشاريع الإبداعية", scores: { architecture: 3, marketing: 3 } },
      { text: "التعلم من خلال التفاعل مع الآخرين", scores: { nursing: 3, businessAdmin: 2, marketing: 2 } },
    ],
  },
  {
    id: 4,
    question: "ما هي بيئة العمل المثالية بالنسبة لك؟",
    options: [
      { text: "مكتب هادئ ومنظم", scores: { law: 3, businessAdmin: 2, computerScience: 2 } },
      { text: "مختبر أو ورشة عمل", scores: { engineering: 3, pharmacy: 2, medicine: 2 } },
      { text: "بيئة إبداعية ومرنة", scores: { architecture: 3, marketing: 3, computerScience: 1 } },
      { text: "التعامل المباشر مع الناس", scores: { medicine: 3, nursing: 3, businessAdmin: 2 } },
    ],
  },
  {
    id: 5,
    question: "ما هي أهم مهارة تمتلكها؟",
    options: [
      { text: "التفكير المنطقي وحل المشكلات", scores: { engineering: 3, computerScience: 3, law: 2 } },
      { text: "التواصل والإقناع", scores: { law: 3, businessAdmin: 3, marketing: 3 } },
      { text: "الإبداع والابتكار", scores: { architecture: 3, marketing: 2, computerScience: 2 } },
      { text: "التعاطف ومساعدة الآخرين", scores: { medicine: 3, nursing: 3, pharmacy: 2 } },
    ],
  },
  {
    id: 6,
    question: "ما هو هدفك المهني الرئيسي؟",
    options: [
      { text: "بناء وتطوير أشياء جديدة", scores: { engineering: 3, architecture: 3, computerScience: 2 } },
      { text: "مساعدة الناس وتحسين حياتهم", scores: { medicine: 3, nursing: 3, pharmacy: 3 } },
      { text: "إدارة الأعمال وتحقيق النجاح المالي", scores: { businessAdmin: 3, marketing: 2, law: 1 } },
      { text: "الدفاع عن الحقوق والعدالة", scores: { law: 3, businessAdmin: 1 } },
    ],
  },
  {
    id: 7,
    question: "كيف تتعامل مع المشاكل المعقدة؟",
    options: [
      { text: "أحللها إلى أجزاء صغيرة وأحلها خطوة بخطوة", scores: { engineering: 3, computerScience: 3, medicine: 2 } },
      { text: "أبحث عن حلول إبداعية وغير تقليدية", scores: { architecture: 3, marketing: 3, computerScience: 1 } },
      { text: "أستشير الآخرين وأعمل ضمن فريق", scores: { businessAdmin: 3, nursing: 2, medicine: 2 } },
      { text: "أدرس القوانين والأنظمة المتعلقة بها", scores: { law: 3, pharmacy: 1 } },
    ],
  },
  {
    id: 8,
    question: "ما مدى اهتمامك بالتكنولوجيا؟",
    options: [
      { text: "مهتم جداً وأحب تعلم كل جديد", scores: { computerScience: 3, engineering: 2, marketing: 1 } },
      { text: "أستخدمها كأداة لتحقيق أهدافي", scores: { businessAdmin: 2, architecture: 2, pharmacy: 1 } },
      { text: "اهتمام متوسط", scores: { law: 1, medicine: 1, nursing: 1 } },
      { text: "أفضل الطرق التقليدية", scores: { law: 2, nursing: 1 } },
    ],
  },
  {
    id: 9,
    question: "ما هو نوع المشاريع التي تفضل العمل عليها؟",
    options: [
      { text: "مشاريع تقنية ومعقدة", scores: { engineering: 3, computerScience: 3 } },
      { text: "مشاريع تتطلب بحث وتحليل", scores: { medicine: 2, law: 3, pharmacy: 2 } },
      { text: "مشاريع إبداعية وفنية", scores: { architecture: 3, marketing: 3 } },
      { text: "مشاريع تخدم المجتمع", scores: { medicine: 3, nursing: 3, pharmacy: 2 } },
    ],
  },
  {
    id: 10,
    question: "كيف تصف قدرتك على التحمل والصبر؟",
    options: [
      { text: "عالية جداً، أستطيع العمل لساعات طويلة", scores: { medicine: 3, engineering: 2, law: 2 } },
      { text: "جيدة، لكن أحتاج لفترات راحة", scores: { businessAdmin: 2, pharmacy: 2, computerScience: 2 } },
      { text: "أفضل العمل بوتيرة مريحة", scores: { architecture: 2, marketing: 2 } },
      { text: "أحتاج لتنوع في المهام", scores: { marketing: 3, businessAdmin: 2, nursing: 1 } },
    ],
  },
  {
    id: 11,
    question: "ما مدى راحتك في التعامل مع الأرقام والحسابات؟",
    options: [
      { text: "مرتاح جداً، أحب الرياضيات", scores: { engineering: 3, computerScience: 3, businessAdmin: 2 } },
      { text: "مرتاح بشكل معتدل", scores: { pharmacy: 2, architecture: 2, medicine: 1 } },
      { text: "أفضل التعامل مع الكلمات والأفكار", scores: { law: 3, marketing: 2 } },
      { text: "لا أحب الأرقام كثيراً", scores: { nursing: 1, marketing: 1 } },
    ],
  },
  {
    id: 12,
    question: "ما هو أسلوب عملك المفضل؟",
    options: [
      { text: "العمل الفردي والتركيز العميق", scores: { computerScience: 3, engineering: 2, law: 2 } },
      { text: "العمل ضمن فريق صغير", scores: { architecture: 3, pharmacy: 2, businessAdmin: 2 } },
      { text: "قيادة وإدارة فريق كبير", scores: { businessAdmin: 3, medicine: 2, marketing: 2 } },
      { text: "التفاعل المستمر مع أشخاص مختلفين", scores: { nursing: 3, marketing: 3, medicine: 2 } },
    ],
  },
  {
    id: 13,
    question: "ما مدى اهتمامك بالتفاصيل الدقيقة؟",
    options: [
      { text: "دقيق جداً، لا أترك أي تفصيل", scores: { engineering: 3, pharmacy: 3, law: 2 } },
      { text: "أهتم بالتفاصيل المهمة فقط", scores: { medicine: 2, businessAdmin: 2, architecture: 2 } },
      { text: "أركز على الصورة الكبيرة", scores: { marketing: 3, businessAdmin: 2 } },
      { text: "أوازن بين التفاصيل والرؤية العامة", scores: { computerScience: 2, architecture: 3 } },
    ],
  },
  {
    id: 14,
    question: "كيف تتعامل مع الضغط والمواقف الطارئة؟",
    options: [
      { text: "أبقى هادئاً وأتخذ قرارات سريعة", scores: { medicine: 3, nursing: 3, engineering: 2 } },
      { text: "أحلل الموقف بعناية قبل التصرف", scores: { law: 3, pharmacy: 2, computerScience: 2 } },
      { text: "أبحث عن حلول إبداعية", scores: { architecture: 3, marketing: 3 } },
      { text: "أستشير الآخرين وأعمل بشكل جماعي", scores: { businessAdmin: 3, nursing: 2 } },
    ],
  },
  {
    id: 15,
    question: "ما نوع التأثير الذي تريد تركه في المجتمع؟",
    options: [
      { text: "تحسين الصحة وإنقاذ الأرواح", scores: { medicine: 3, nursing: 3, pharmacy: 3 } },
      { text: "بناء وتطوير البنية التحتية", scores: { engineering: 3, architecture: 3 } },
      { text: "تطوير التكنولوجيا والابتكار", scores: { computerScience: 3, engineering: 2 } },
      { text: "تحقيق العدالة والنمو الاقتصادي", scores: { law: 3, businessAdmin: 3, marketing: 2 } },
    ],
  },
]

// Majors data
const majors = {
  engineering: {
    name: "الهندسة",
    description: "تصميم وبناء الأنظمة والمنشآت التقنية",
    icon: "⚙️",
  },
  medicine: {
    name: "الطب",
    description: "تشخيص وعلاج الأمراض ورعاية المرضى",
    icon: "🏥",
  },
  computerScience: {
    name: "علوم الحاسب",
    description: "تطوير البرمجيات والأنظمة التقنية",
    icon: "💻",
  },
  businessAdmin: {
    name: "إدارة الأعمال",
    description: "إدارة المشاريع والشركات والموارد",
    icon: "💼",
  },
  law: {
    name: "القانون",
    description: "دراسة القوانين والدفاع عن الحقوق",
    icon: "⚖️",
  },
  architecture: {
    name: "العمارة",
    description: "تصميم المباني والمساحات الحضرية",
    icon: "🏛️",
  },
  pharmacy: {
    name: "الصيدلة",
    description: "دراسة الأدوية وتركيبها وتأثيراتها",
    icon: "💊",
  },
  nursing: {
    name: "التمريض",
    description: "رعاية المرضى والمساعدة في العلاج",
    icon: "👨‍⚕️",
  },
  marketing: {
    name: "التسويق",
    description: "الترويج للمنتجات وبناء العلامات التجارية",
    icon: "📱",
  },
  accounting: {
    name: "المحاسبة",
    description: "تحليل السجلات المالية وإعداد التقارير",
    icon: "📊",
  },
  education: {
    name: "التربية والتعليم",
    description: "إعداد المعلمين وتطوير المناهج التعليمية",
    icon: "📚",
  },
  finance: {
    name: "المالية",
    description: "إدارة الأموال والاستثمارات والتحليل المالي",
    icon: "💰",
  },
  cybersecurity: {
    name: "الأمن السيبراني",
    description: "حماية الأنظمة والشبكات من الهجمات الإلكترونية",
    icon: "🔒",
  },
}

// State
let currentQuestionIndex = 0
let answers = {}
const scores = {}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeScores()
  displayQuestion()
})

function initializeScores() {
  Object.keys(majors).forEach((major) => {
    scores[major] = 0
  })
}

function displayQuestion() {
  const question = questions[currentQuestionIndex]
  const container = document.getElementById("questionsContainer")

  container.innerHTML = `
        <div class="card question-card">
            <h3>
                ${question.question}
            </h3>
            <div class="options">
                ${question.options
                  .map(
                    (option, index) => `
                    <button class="option-btn ${answers[question.id] === index ? "selected" : ""}" 
                            onclick="selectOption(${index})">
                        ${option.text}
                    </button>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `

  updateProgress()
  updateButtons()
}

function selectOption(optionIndex) {
  const question = questions[currentQuestionIndex]
  answers[question.id] = optionIndex
  displayQuestion()
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  document.getElementById("progressBar").style.width = progress + "%"
  document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1
  document.getElementById("totalQuestions").textContent = questions.length
}

function updateButtons() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const submitBtn = document.getElementById("submitBtn")

  prevBtn.disabled = currentQuestionIndex === 0

  const currentQuestion = questions[currentQuestionIndex]
  const isAnswered = answers[currentQuestion.id] !== undefined

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.classList.add("hidden")
    submitBtn.classList.remove("hidden")
    submitBtn.disabled = !isAnswered
  } else {
    nextBtn.classList.remove("hidden")
    submitBtn.classList.add("hidden")
    nextBtn.disabled = !isAnswered
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++
    displayQuestion()
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    displayQuestion()
  }
}

function calculateResults() {
  // Reset scores
  initializeScores()

  // Calculate scores based on answers
  questions.forEach((question) => {
    const answerIndex = answers[question.id]
    if (answerIndex !== undefined) {
      const selectedOption = question.options[answerIndex]
      Object.keys(selectedOption.scores).forEach((major) => {
        scores[major] += selectedOption.scores[major]
      })
    }
  })

  // Calculate max possible score
  const maxScore = questions.length * 3

  // Convert to percentages and sort
  const results = Object.keys(scores)
    .map((major) => ({
      major: major,
      score: scores[major],
      percentage: Math.round((scores[major] / maxScore) * 100),
      ...majors[major],
    }))
    .sort((a, b) => b.score - a.score)

  displayResults(results)
}

async function displayResults(results) {
  document.getElementById("questionsContainer").classList.add("hidden")
  document.querySelector(".nav-buttons").classList.add("hidden")
  document.getElementById("progressContainer").classList.add("hidden")
  document.querySelector("#currentQuestion").parentElement.classList.add("hidden")

  const resultsContainer = document.getElementById("resultsContainer")
  const resultsContent = document.getElementById("resultsContent")

  const topResult = results[0]

  resultsContent.innerHTML = results
    .slice(0, 5)
    .map(
      (result, index) => `
        <div class="card result-card">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <span style="font-size: 2.5rem;">${result.icon}</span>
                <div style="flex: 1; min-width: 200px;">
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">
                        ${index + 1}. ${result.name}
                    </h3>
                    <p style="color: var(--text-secondary);">${result.description}</p>
                </div>
                <div class="match-percentage">${result.percentage}%</div>
            </div>
            <div style="background: var(--bg-tertiary); height: 10px; border-radius: 9999px; overflow: hidden; border: 1px solid var(--glass-border);">
                <div style="background: var(--gradient-primary); height: 100%; width: ${result.percentage}%; transition: width 1s ease; box-shadow: var(--shadow-glow);"></div>
            </div>
        </div>
    `,
    )
    .join("")

  // إظهار قسم التقرير الذكي
  const reportSection = document.getElementById("aiReportSection")
  if (reportSection) {
    reportSection.classList.remove("hidden")
  }

  resultsContainer.classList.remove("hidden")

  // تحليل النتائج باستخدام AI
  const aiAnalysis = await analyzeResultsWithAI(results, answers)
  
  // جلب التقرير الذكي
  await generateAIReport(topResult, aiAnalysis)
}

// دالة تحليل النتائج باستخدام Gemini API
async function analyzeResultsWithAI(results, answers) {
  try {
    const topResults = results.slice(0, 3).map(r => `${r.name} (${r.percentage}%)`).join('، ')
    
    const prompt = `أنت مستشار مهني متخصص في التوجيه المهني في المملكة العربية السعودية.
قم بتحليل نتائج اختبار تحديد التخصص التالية:

التخصصات الأعلى:
${topResults}

التخصص الأول: ${results[0].name} (${results[0].percentage}%)
الوصف: ${results[0].description}

قم بإنشاء تحليل شامل ومفصل بالعربية يتضمن:

1. **لماذا هذا التخصص مناسب لك؟**
   - تحليل الميول والاهتمامات بناءً على النتائج
   - نقاط القوة التي تجعلك مناسباً لهذا التخصص

2. **المهارات التي تحتاج لتطويرها**
   - المهارات الأساسية المطلوبة
   - خطة تطوير المهارات
   - الموارد المقترحة للتعلم

3. **المستقبل الوظيفي في السعودية**
   - الفرص الوظيفية المتاحة
   - الرواتب المتوقعة (بالريال السعودي)
   - القطاعات الأكثر طلباً
   - تأثير رؤية 2030 على هذا التخصص

اجعل التقرير احترافياً ومفيداً ومكتوباً بالعربية الفصحى. استخدم فقرات واضحة ومنظمة. أجب بالعربية فقط.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCRt01p00Ya7ME3FJcENOwjiFp6hGfvi8U`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text
    } else {
      throw new Error('لم يتم الحصول على تحليل')
    }
  } catch (error) {
    console.error('Error analyzing results:', error)
    return null
  }
}

// دالة إنشاء التقرير الذكي باستخدام Google AI
async function generateAIReport(major, aiAnalysis = null) {
  const reportContent = document.getElementById("aiReportContent")
  
  try {
    const prompt = `أنت مستشار مهني متخصص في التوجيه المهني في المملكة العربية السعودية. 
قم بإنشاء تقرير تحليلي مفصل بالعربية عن تخصص "${major.name}" يتضمن:

1. لماذا هذا التخصص مناسب (بناءً على الميول والاهتمامات)
2. المهارات التي يحتاج الطالب لتطويرها لنجاحه في هذا التخصص
3. مستقبله الوظيفي في سوق العمل السعودي (الفرص، الرواتب المتوقعة، القطاعات)

اجعل التقرير احترافياً ومفيداً ومكتوباً بالعربية الفصحى. استخدم فقرات واضحة. أجب بالعربية فقط.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCRt01p00Ya7ME3FJcENOwjiFp6hGfvi8U`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      let reportText = data.candidates[0].content.parts[0].text
      
      // دمج التحليل الإضافي إن وجد
      if (aiAnalysis) {
        reportText = `${reportText}\n\n---\n\n${aiAnalysis}`
      }
      
      // تنظيف ومعالجة النص العربي
      reportText = reportText.trim()
      
      // التحقق من أن النص عربي وليس مشفر
      if (!/[\u0600-\u06FF]/.test(reportText)) {
        console.warn('النص لا يحتوي على أحرف عربية، استخدام التقرير الاحتياطي')
        throw new Error('تنسيق النص غير صحيح')
      }
      
      // تقسيم النص إلى فقرات
      const paragraphs = reportText.split(/\n\s*\n/).filter(p => p.trim().length > 0)
      
      // إنشاء HTML بشكل آمن
      const reportHTML = paragraphs.map((paragraph, index) => {
        // تنظيف الفقرة
        let cleanParagraph = paragraph.trim()
        
        // استبدال الأسطر الجديدة بـ <br>
        cleanParagraph = cleanParagraph.replace(/\n/g, '<br>')
        
        // معالجة HTML entities
        const div = document.createElement('div')
        div.textContent = cleanParagraph
        cleanParagraph = div.innerHTML
        
        // إذا كانت الفقرة تبدأ برقم أو عنوان
        if (/^[0-9]+\.\s*/.test(paragraph) || /^###\s*/.test(paragraph) || /^##\s*/.test(paragraph)) {
          const title = paragraph.replace(/^[0-9]+\.\s*/, '').replace(/^###\s*/, '').replace(/^##\s*/, '').trim()
          return `<h4 style="color: var(--blue-light); margin-top: ${index > 0 ? '1.5rem' : '0'}; margin-bottom: 0.75rem; font-size: 1.125rem; font-weight: 700; text-align: right; direction: rtl;">${title}</h4>`
        }
        
        return `<p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.8; text-align: right; direction: rtl; font-family: 'Tajawal', sans-serif;">${cleanParagraph}</p>`
      }).join('')
      
      // عرض التقرير بتأثير الكتابة
      const typingContainer = document.createElement("div")
      typingContainer.id = "typingContainer"
      typingContainer.style.cssText = "text-align: right; direction: rtl; font-family: 'Tajawal', sans-serif; unicode-bidi: bidi-override;"
      reportContent.innerHTML = ''
      reportContent.appendChild(typingContainer)
      
      // تطبيق تأثير الكتابة
      typeText(reportHTML, typingContainer)
    } else {
      throw new Error('لم يتم الحصول على تقرير')
    }
  } catch (error) {
    console.error('Error generating report:', error)
    // تقرير احتياطي في حالة فشل API
    reportContent.innerHTML = `
      <div style="text-align: right; direction: rtl; font-family: 'Tajawal', sans-serif; line-height: 1.8; unicode-bidi: bidi-override;">
        <h4 style="color: var(--blue-light); margin-bottom: 1rem; font-size: 1.125rem; font-weight: 700; text-align: right; direction: rtl;">لماذا ${major.name}؟</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; text-align: right; direction: rtl;">
          بناءً على إجاباتك في الاختبار، يبدو أن تخصص ${major.name} يتناسب مع ميولك واهتماماتك. 
          هذا التخصص يوفر فرصاً ممتازة للنمو المهني والشخصي.
        </p>
        
        <h4 style="color: var(--blue-light); margin-bottom: 1rem; font-size: 1.125rem; font-weight: 700; text-align: right; direction: rtl;">المهارات المطلوبة</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; text-align: right; direction: rtl;">
          لتنجح في هذا التخصص، ننصحك بتطوير مهاراتك في: ${major.skills?.slice(0, 3).join('، ') || 'المهارات الأساسية للتخصص'}.
          كما ننصحك بالتركيز على التعلم المستمر والتطبيق العملي.
        </p>
        
        <h4 style="color: var(--blue-light); margin-bottom: 1rem; font-size: 1.125rem; font-weight: 700; text-align: right; direction: rtl;">المستقبل الوظيفي في السعودية</h4>
        <p style="color: var(--text-secondary); text-align: right; direction: rtl;">
          سوق العمل السعودي يوفر فرصاً متنامية في مجال ${major.name}، خاصة مع رؤية 2030 
          والتحول الرقمي. الطلب على هذا التخصص ${major.demand}، مما يجعله خياراً استراتيجياً لمستقبلك المهني.
        </p>
      </div>
    `
  }
}

// دالة تأثير الكتابة (Typing Effect) - محسّنة
function typeText(htmlContent, container) {
  // عرض HTML مباشرة مع تأثير الكتابة التدريجي
  container.innerHTML = htmlContent
  
  // إخفاء النص أولاً
  const allTextElements = container.querySelectorAll('p, h4, span, div')
  allTextElements.forEach(el => {
    el.style.opacity = '0'
  })
  
  // عرض النص تدريجياً
  let index = 0
  const elements = Array.from(allTextElements)
  
  function showNext() {
    if (index >= elements.length) {
      return
    }
    
    const element = elements[index]
    const text = element.textContent
    element.textContent = ''
    element.style.opacity = '1'
    
    let charIndex = 0
    const typeChar = () => {
      if (charIndex < text.length) {
        element.textContent += text[charIndex]
        charIndex++
        setTimeout(typeChar, 25) // سرعة الكتابة
      } else {
        index++
        setTimeout(showNext, 100)
      }
    }
    
    typeChar()
  }
  
  showNext()
}

function restartTest() {
  currentQuestionIndex = 0
  answers = {}
  initializeScores()

  document.getElementById("questionsContainer").classList.remove("hidden")
  document.querySelector(".nav-buttons").classList.remove("hidden")
  document.getElementById("progressContainer").classList.remove("hidden")
  document.querySelector("#currentQuestion").parentElement.classList.remove("hidden")
  document.getElementById("resultsContainer").classList.add("hidden")

  displayQuestion()
}

// دالة تحميل PDF لتقرير الذكاء الاصطناعي فقط
async function downloadPDF() {
  const aiReportSection = document.getElementById("aiReportSection")
  
  if (!aiReportSection || aiReportSection.classList.contains('hidden')) {
    alert('لا يوجد تقرير ذكاء اصطناعي للتحميل. يرجى الانتظار حتى يكتمل التقرير.')
    return
  }

  const aiReportContent = document.getElementById("aiReportContent")
  if (!aiReportContent || !aiReportContent.textContent.trim()) {
    alert('التقرير لا يزال قيد التحميل. يرجى الانتظار قليلاً.')
    return
  }

  // إنشاء حاوية خاصة للـ PDF مع تنسيق محسّن
  const pdfContainer = document.createElement('div')
  pdfContainer.id = 'pdfContainer'
  pdfContainer.style.cssText = `
    background: #030712;
    color: #f8fafc;
    padding: 2rem;
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    text-align: right;
    max-width: 800px;
    margin: 0 auto;
  `

  // إضافة عنوان للـ PDF
  const pdfHeader = document.createElement('div')
  pdfHeader.style.cssText = `
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #3b82f6;
  `
  pdfHeader.innerHTML = `
    <h1 style="font-size: 2rem; font-weight: 900; color: #3b82f6; margin-bottom: 0.5rem;">
      🎓 مهنتي
    </h1>
    <h2 style="font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.5rem;">
      تقرير تحليلي بالذكاء الاصطناعي
    </h2>
    <p style="color: #cbd5e1; font-size: 0.875rem;">
      ${new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
    </p>
  `
  pdfContainer.appendChild(pdfHeader)

  // نسخ محتوى التقرير
  const reportClone = aiReportSection.cloneNode(true)
  reportClone.style.cssText = `
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
  `
  
  // إزالة الهيدر من النسخة المستنسخة (لأننا أضفنا عنواناً جديداً)
  const clonedHeader = reportClone.querySelector('.ai-report-header')
  if (clonedHeader) {
    clonedHeader.remove()
  }
  
  // تحسين تنسيق المحتوى
  const clonedContent = reportClone.querySelector('.ai-report-content')
  if (clonedContent) {
    clonedContent.style.cssText = `
      background: transparent;
      border: none;
      padding: 0;
      min-height: auto;
    `
    
    // تطبيق الخط العربي على جميع العناصر
    const allElements = clonedContent.querySelectorAll('*')
    allElements.forEach(el => {
      el.style.fontFamily = "'Tajawal', sans-serif"
      el.style.direction = 'rtl'
      if (el.tagName === 'P' || el.tagName === 'DIV' || el.tagName === 'SPAN' || el.tagName === 'H4') {
        el.style.textAlign = 'right'
      }
    })
  }
  
  pdfContainer.appendChild(reportClone)

  // إضافة الحاوية مؤقتاً للصفحة
  pdfContainer.style.position = 'absolute'
  pdfContainer.style.left = '-9999px'
  document.body.appendChild(pdfContainer)

  // التأكد من تحميل الخط العربي
  await document.fonts.ready

  // إعدادات html2pdf
  const opt = {
    margin: [20, 20, 20, 20],
    filename: 'تقرير-الذكاء-الاصطناعي-مهنتي.pdf',
    image: { 
      type: 'jpeg', 
      quality: 0.98 
    },
    html2canvas: { 
      scale: 2, // جودة عالية (retina)
      useCORS: true,
      letterRendering: true,
      logging: false,
      backgroundColor: '#030712',
      windowWidth: pdfContainer.scrollWidth,
      windowHeight: pdfContainer.scrollHeight,
      onclone: function(clonedDoc) {
        // التأكد من أن الخط العربي محمّل في المستند المستنسخ
        const clonedPdfContainer = clonedDoc.getElementById('pdfContainer')
        if (clonedPdfContainer) {
          clonedPdfContainer.style.fontFamily = "'Tajawal', sans-serif"
          clonedPdfContainer.style.direction = 'rtl'
          clonedPdfContainer.style.textAlign = 'right'
          
          // تطبيق الخط على جميع العناصر
          const allElements = clonedPdfContainer.querySelectorAll('*')
          allElements.forEach(el => {
            el.style.fontFamily = "'Tajawal', sans-serif"
            el.style.direction = 'rtl'
            if (el.tagName === 'P' || el.tagName === 'DIV' || el.tagName === 'SPAN' || el.tagName === 'H4' || el.tagName === 'H1' || el.tagName === 'H2') {
              el.style.textAlign = el.tagName.startsWith('H') ? 'center' : 'right'
            }
          })
        }
      }
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy']
    }
  }

  try {
    // إظهار رسالة تحميل
    const downloadBtn = document.getElementById("downloadBtn")
    const originalText = downloadBtn.innerHTML
    downloadBtn.innerHTML = '⏳ جاري التحميل...'
    downloadBtn.disabled = true

    // إنشاء PDF
    await html2pdf().set(opt).from(pdfContainer).save()

    // إزالة الحاوية المؤقتة
    document.body.removeChild(pdfContainer)

    // استعادة الحالة الأصلية
    downloadBtn.innerHTML = originalText
    downloadBtn.disabled = false

  } catch (error) {
    console.error('خطأ في إنشاء PDF:', error)
    alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.')
    
    // إزالة الحاوية المؤقتة في حالة الخطأ
    if (document.body.contains(pdfContainer)) {
      document.body.removeChild(pdfContainer)
    }
    
    // استعادة الحالة الأصلية
    const downloadBtn = document.getElementById("downloadBtn")
    downloadBtn.innerHTML = '📥 تحميل التقرير كـ PDF'
    downloadBtn.disabled = false
  }
}
