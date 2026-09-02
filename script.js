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
  const lower = (input || '').toLowerCase();

  if (/(skill|stack|tech|language|framework|gcp|bigquery|spark|airflow|sql|dbt|python|cloud)/.test(lower)) {
    return 'Lahari is a Data Engineer with hands-on skills in Python, SQL, Spark, PySpark, Airflow, BigQuery, Dataflow, Dataproc, Google Cloud Storage, Kafka, dbt, Terraform, and cloud monitoring tools.';
  }

  if (/(project|portfolio|work|vinac|mobility|smart city|construction)/.test(lower)) {
    return 'Recent work includes Smart City and Mobility and VINAC, both centered on cloud data pipelines, analytics, and data-driven decision support.';
  }

  if (/(experience|background|career|work history|resume|journey|umkc|citius)/.test(lower)) {
    return 'Lahari has 3+ years of experience as a Data Engineer across UMKC IS Labs and Citius Tech, with strong expertise in GCP architecture, ETL orchestration, data quality, and enterprise reporting.';
  }

  if (/(contact|email|phone|reach|hire|connect|opportunity)/.test(lower)) {
    return 'You can contact Lahari at +1 (913)-272-1290 or paidipatilahari14@gmail.com for data engineering, cloud, and analytics opportunities.';
  }

  if (/(about|who|lahari|summary|data engineer)/.test(lower)) {
    return 'Lahari Paidipati is a Data Engineer based in Kansas City, MO, with experience building data warehouses, ETL pipelines, and cloud-native analytics systems.';
  }

  return 'I can answer questions about Lahari’s background, skills, project work, GCP experience, and contact details. Try asking about Spark, BigQuery, ETL pipelines, or recent projects.';
}

async function askPortfolioAssistant(prompt) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      return data.answer || data.error || getFallbackResponse(prompt);
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
