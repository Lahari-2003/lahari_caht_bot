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
        'Built reusable data models, dbt transformations, validation checks, and reconciliation logic for reportable and ML-ready datasets.',
        'Optimized BigQuery tables using partitioning, clustering, and query tuning for analytics and dashboard workloads.',
        'Supported CI/CD, monitoring, and troubleshooting using Git, Jenkins, Docker, Terraform, Cloud Logging, Cloud Monitoring, and Splunk.'
      ]
    },
    {
      role: 'Data Engineer, Citius Tech',
      period: '07/2022 – 05/2024',
      points: [
        'Developed batch and near-real-time data pipelines using Python, SQL, Spark, PySpark, Airflow, BigQuery, Dataflow, Dataproc, Pub/Sub, Kafka, and Google Cloud Storage.',
        'Built and maintained BigQuery, Snowflake, and data lake transformation layers using SQL, dbt, CDC, and distributed processing techniques.',
        'Implemented data quality validations, anomaly detection, reconciliation logic, lineage tracking, and monitoring frameworks.',
        'Worked in Agile environments with architects, analysts, QA teams, and stakeholders to deliver cloud-native data solutions.'
      ]
    },
    {
      role: 'Data Engineer Intern, Citius Tech',
      period: '06/2022 – 07/2022',
      points: [
        'Assisted in developing ETL pipelines using Python, SQL, Spark, BigQuery, GCS, and Airflow for enterprise reporting and analytics.',
        'Performed extraction, cleansing, transformation, validation, and testing on structured and semi-structured datasets.',
        'Developed SQL queries and transformation logic to support dashboards and analytics workflows.'
      ]
    }
  ],
  projects: [
    {
      name: 'Smart City and Mobility – Urban Efficiency Enhancement',
      description: 'Developed a data-driven platform using Python and Django to analyze transportation and infrastructure patterns from multiple urban datasets. Applied machine learning and data analysis techniques to improve transportation efficiency, sustainability, and accessibility.'
    },
    {
      name: 'VINAC (Make Construction Easy)',
      description: 'Built a data-centric AI platform on Google Cloud Platform for construction design and project intelligence, ingesting user behavior, project, and design data into Google Cloud Storage and BigQuery. Used Cloud Functions, Cloud Run, Docker, Terraform, and monitoring tools for scalable deployment and product intelligence.'
    }
  ]
};

const faq = {
  skills: 'Lahari is a Data Engineer with hands-on skills in Python, SQL, Spark, PySpark, Airflow, BigQuery, Dataflow, Dataproc, Google Cloud Storage, Kafka, dbt, Terraform, and cloud monitoring tools. His work focuses on building reliable ETL/ELT pipelines and scalable GCP analytics platforms.',
  projects: 'Recent work includes Smart City and Mobility – Urban Efficiency Enhancement and VINAC (Make Construction Easy), both centered on cloud data pipelines, analytics, and data-driven decision support.',
  experience: 'Lahari has 3+ years of experience as a Data Engineer across UMKC IS Labs and Citius Tech, with strong expertise in GCP architecture, ETL orchestration, data quality, and enterprise reporting.',
  contact: 'You can contact Lahari at +1 (913)-272-1290 or paidipatilahari14@gmail.com for data engineering, cloud, and analytics opportunities.',
  about: 'Lahari Paidipati is a Data Engineer based in Kansas City, MO, with experience building data warehouses, ETL pipelines, and cloud-native analytics systems across Google Cloud environments.',
  default: 'I can answer questions about Lahari’s background, skills, project work, GCP experience, and contact details. Try asking about Spark, BigQuery, ETL pipelines, or recent projects.'
};

const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const resetChat = document.getElementById('resetChat');
const promptButtons = document.querySelectorAll('.prompt-chip');

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

async function askPortfolioAssistant(prompt) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      return data.error || getFallbackResponse(prompt);
    }

    return data.answer || getFallbackResponse(prompt);
  } catch (error) {
    console.error('Chat request failed:', error);
    return getFallbackResponse(prompt);
  }
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();

  if (!userMessage) {
    return;
  }

  addMessage(userMessage, 'user');
  chatInput.value = '';

  const response = await askPortfolioAssistant(userMessage);
  window.setTimeout(() => addMessage(response, 'bot'), 250);
});

promptButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const prompt = button.textContent.trim();
    addMessage(prompt, 'user');
    const response = await askPortfolioAssistant(prompt);
    window.setTimeout(() => addMessage(response, 'bot'), 250);
  });
});

resetChat.addEventListener('click', () => {
  chatBody.innerHTML = `
    <div class="message bot-message">
      Hello, I’m Lahari’s portfolio assistant. Ask about my experience, GCP skills, projects, or contact details.
    </div>
  `;
  chatInput.focus();
});
