const resume = {
  name: 'Lahari Paidipati',
  title: 'Data Engineer',
  location: 'Kansas City, MO',
  phone: '+1 (913)-272-1290',
  email: 'paidipatilahari14@gmail.com',
  summary:
    'Data Engineer with 3+ years of experience building scalable GCP-based data platforms, ETL/ELT pipelines, and analytics solutions using Python, SQL, Spark, Airflow, BigQuery, Dataflow, Dataproc, Cloud Composer, Pub/Sub, and Google Cloud Storage.',
  skills: [
    'Python', 'SQL', 'Apache Spark', 'PySpark', 'Airflow', 'Cloud Composer', 'BigQuery', 'Dataflow', 'Dataproc', 'Google Cloud Storage', 'Kafka', 'dbt', 'Terraform', 'Docker', 'Kubernetes', 'Power BI', 'Looker'
  ],
  experience: [
    {
      role: 'Student Assistant, UMKC IS Labs',
      period: '08/2024 – Present',
      points: [
        'Designed and maintained ETL/ELT pipelines using Python, SQL, Spark, PySpark, Airflow, Cloud Composer, BigQuery, GCS, and Dataproc.',
        'Built reusable data models, dbt transformations, validation checks, and reconciliation logic to improve data quality and accessibility.',
        'Optimized BigQuery tables using partitioning, clustering, and query tuning for analytics and ML-ready datasets.',
        'Supported CI/CD, monitoring, and troubleshooting using Git, Jenkins, Docker, Terraform, Cloud Logging, Cloud Monitoring, and Splunk.'
      ]
    },
    {
      role: 'Data Engineer, Citius Tech',
      period: '07/2022 – 05/2024',
      points: [
        'Developed batch and near-real-time data pipelines using Python, SQL, Spark, PySpark, Airflow, Cloud Composer, BigQuery, Dataflow, Dataproc, Pub/Sub, Kafka, and Google Cloud Storage.',
        'Built and maintained BigQuery, Snowflake, and data lake-based transformation layers using SQL, dbt, CDC, and distributed processing techniques.',
        'Implemented data quality validations, anomaly detection, reconciliation logic, lineage tracking, and monitoring frameworks using Cloud Monitoring, Cloud Logging, ELK Stack, and Splunk.',
        'Worked in Agile environments with architects, analysts, QA teams, and stakeholders to deliver cloud-native data solutions with CI/CD automation.'
      ]
    },
    {
      role: 'Data Engineer Intern, Citius Tech',
      period: '06/2022 – 07/2022',
      points: [
        'Assisted in developing ETL pipelines using Python, SQL, Spark, BigQuery, GCS, and Airflow for enterprise reporting and analytics.',
        'Performed extraction, cleansing, transformation, validation, and testing across structured and semi-structured datasets.',
        'Developed SQL queries and transformation logic to support dashboards, reporting, and analytics workflows.'
      ]
    }
  ],
  projects: [
    {
      name: 'Smart City and Mobility – Urban Efficiency Enhancement',
      description: 'Developed a data-driven platform using Python and Django to analyze transportation and infrastructure patterns across multiple urban datasets. Applied machine learning and data analysis techniques to improve transportation efficiency, sustainability, and accessibility.'
    },
    {
      name: 'VINAC (Make Construction Easy)',
      description: 'Built a data-centric AI platform on Google Cloud Platform for construction design and project intelligence, ingesting user behavior, project, and design data into Google Cloud Storage and BigQuery. Used Cloud Functions, Cloud Run, Docker, Terraform, and monitoring tools for scalable deployment and product intelligence.'
    }
  ]
};

const faq = {
  skills: 'Lahari is a Data Engineer with hands-on skills in Python, SQL, Spark, PySpark, Airflow, BigQuery, Dataflow, Dataproc, Cloud Composer, Kafka, GCS, dbt, Terraform, and cloud observability tools. His work focuses on building reliable ETL/ELT pipelines and scalable GCP analytics platforms.',
  projects: 'Recent project experience includes Smart City and Mobility – Urban Efficiency Enhancement and VINAC (Make Construction Easy), both built around cloud data pipelines, analytics, and AI-driven product intelligence.',
  experience: 'Lahari has 3+ years of experience as a Data Engineer, including a student assistant role at UMKC and prior engineering work at Citius Tech, with focus on GCP platform engineering, ETL orchestration, BigQuery optimization, and data quality monitoring.',
  contact: 'You can contact Lahari at +1 (913)-272-1290, paidipatilahari14@gmail.com, or through his portfolio for data engineering, cloud, and analytics opportunities.',
  about: 'Lahari Paidipati is a Data Engineer based in Kansas City, MO, with experience building ETL pipelines, data warehouses, cloud-native analytics systems, and governance-focused data platforms across Google Cloud environments.',
  default: 'I can answer questions about Lahari’s background, skills, projects, cloud platform experience, and contact details. Try asking about GCP, Spark, BigQuery, ETL pipelines, or project work.'
};

const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const resetChat = document.getElementById('resetChat');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

function addMessage(text, sender = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getFallbackResponse(input) {
  const lowerInput = input.toLowerCase();

  if (/(skill|stack|tech|language|framework|gcp|bigquery|spark|airflow|sql|dbt|python|cloud)/.test(lowerInput)) {
    return faq.skills;
  }

  if (/(project|portfolio|work|vinac|mobility|smart city|construction)/.test(lowerInput)) {
    return faq.projects;
  }

  if (/(experience|background|career|work history|resume|journey|umkc|citius)/.test(lowerInput)) {
    return faq.experience;
  }

  if (/(contact|email|phone|reach|hire|connect|opportunity)/.test(lowerInput)) {
    return faq.contact;
  }

  if (/(about|who|lahari|summary|data engineer)/.test(lowerInput)) {
    return faq.about;
  }

  return faq.default;
}

function loadSavedApiKey() {
  const key = localStorage.getItem('lahari_claude_api_key');
  if (key) {
    apiKeyInput.value = key;
  }
}

async function askClaude(prompt) {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    return getFallbackResponse(prompt);
  }

  const systemPrompt = `You are a polished portfolio assistant for Lahari Paidipati, a Data Engineer. Use the details below to answer questions accurately and professionally. Keep responses concise but informative, and speak in a professional business tone. Do not invent facts. When asked about interviews, roles, or projects, answer based on the resume only. Resume data: ${JSON.stringify(resume)}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      return `The Claude API request could not be completed. Please verify the key or try again. Fallback answer: ${getFallbackResponse(prompt)}`;
    }

    const data = await response.json();
    const messageText = data.content?.[0]?.text || getFallbackResponse(prompt);
    return messageText;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return `I could not reach the Claude API from this browser. Using the local resume fallback instead: ${getFallbackResponse(prompt)}`;
  }
}

saveApiKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    addMessage('Please enter a Claude API key to enable live AI responses.', 'bot');
    return;
  }

  localStorage.setItem('lahari_claude_api_key', key);
  addMessage('Claude API key saved locally for this browser. You can now ask live portfolio questions.', 'bot');
});

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();

  if (!userMessage) {
    return;
  }

  addMessage(userMessage, 'user');
  chatInput.value = '';

  const response = await askClaude(userMessage);
  window.setTimeout(() => addMessage(response, 'bot'), 250);
});

resetChat.addEventListener('click', () => {
  chatBody.innerHTML = `
    <div class="message bot-message">
      Hello, I’m Lahari’s professional portfolio assistant. Ask about my data engineering experience, GCP skills, project work, or contact details.
    </div>
  `;
  chatInput.focus();
});

loadSavedApiKey();
