const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const resume = {
  name: 'Lahari Paidipati',
  title: 'Data Engineer',
  location: 'Kansas City, MO',
  phone: '+1 (913)-272-1290',
  email: 'paidipatilahari14@gmail.com',
  summary:
    'Data Engineer with 3+ years of experience building scalable GCP-based data platforms, ETL/ELT pipelines, and analytics systems using Python, SQL, Spark, Airflow, BigQuery, Dataflow, Dataproc, and Google Cloud Storage.',
  skills: [
    'Python',
    'SQL',
    'PySpark',
    'Spark',
    'Airflow',
    'BigQuery',
    'Dataflow',
    'Dataproc',
    'Google Cloud Storage',
    'Kafka',
    'dbt',
    'Terraform',
    'Docker',
    'Cloud Composer'
  ],
  experience: [
    {
      role: 'Student Assistant, UMKC IS Labs',
      period: '08/2024 - Present',
      details: [
        'Built and maintained ETL/ELT pipelines for reporting and operational analytics.',
        'Developed dbt workflows, validation checks, and reconciliation logic.',
        'Optimized BigQuery performance using partitioning, clustering, and tuning.'
      ]
    },
    {
      role: 'Data Engineer, Citius Tech',
      period: '07/2022 - 05/2024',
      details: [
        'Developed batch and near-real-time pipelines with Spark, Kafka, and Airflow.',
        'Created analytics-ready datasets in BigQuery, Snowflake, and data lakes.',
        'Implemented monitoring, data quality checks, and lineage validation.'
      ]
    }
  ],
  projects: [
    {
      name: 'Smart City and Mobility',
      description:
        'Built a Python/Django-based platform for transportation and infrastructure analysis using urban datasets.'
    },
    {
      name: 'VINAC',
      description:
        'Developed a cloud-native AI platform for construction intelligence using GCS, BigQuery, Cloud Functions, and Cloud Run.'
    }
  ]
};

function fallbackAnswer(input) {
  const value = (input || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

  if (/(skill|stack|tech|language|gcp|bigquery|spark|airflow|python|sql|dbt)/.test(value)) {
    return 'Lahari works with Python, SQL, PySpark, Airflow, BigQuery, Dataflow, Dataproc, Cloud Composer, Kafka, dbt, Docker, and Terraform. His focus is on building scalable, cloud-native data systems and reliable ETL/ELT pipelines.';
  }

  if (/(project|portfolio|work|vinac|smart city|mobility|construction)/.test(value)) {
    return 'Recent project work includes the Smart City and Mobility initiative and VINAC, both centered on AI, data engineering, and analytical decision support for real-world business problems.';
  }

  if (/(experience|background|career|resume|journey|umkc|citius)/.test(value)) {
    return 'Lahari has 3+ years of hands-on data engineering experience, including work at UMKC IS Labs and Citius Tech, with a strong emphasis on GCP data platforms, pipeline automation, governance, and data quality.';
  }

  if (/(contact|email|phone|hire|connect|reach|opportunity)/.test(value)) {
    return 'You can reach Lahari at +1 (913)-272-1290 or paidipatilahari14@gmail.com. He is based in Kansas City, MO and is open to opportunities in data engineering and cloud analytics.';
  }

  if (/(about|who|lahari|summary|data engineer)/.test(value)) {
    return 'Lahari Paidipati is a Data Engineer focused on building scalable cloud data platforms, ETL/ELT pipelines, and analytics products using the GCP ecosystem.';
  }

  return 'I can help with Lahari’s background, skills, projects, cloud experience, and contact details. Try asking about GCP, Spark, BigQuery, ETL pipelines, or project work.';
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Portfolio assistant is running.' });
});

app.post('/api/chat', async (req, res) => {
  const message = (req.body && req.body.message ? req.body.message : '').trim();

  if (!message) {
    return res.status(400).json({ error: 'A message is required.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'PASTE_YOUR_ANTHROPIC_KEY_HERE') {
    return res.json({ answer: fallbackAnswer(message) });
  }

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
        max_tokens: 350,
        system:
          'You are a polished portfolio assistant for a Data Engineer. Use only the provided profile details and keep answers professional, accurate, and concise.',
        messages: [
          {
            role: 'user',
            content: `Profile: ${JSON.stringify(resume)}\n\nQuestion: ${message}`
          }
        ]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Anthropic request failed:', text);
      return res.status(502).json({
        error: 'Anthropic is unavailable right now.',
        answer: fallbackAnswer(message)
      });
    }

    const data = await response.json();
    const answer = data?.content?.[0]?.text || fallbackAnswer(message);
    return res.json({ answer });
  } catch (error) {
    console.error('Server-side chat failed:', error);
    return res.status(500).json({
      error: 'Unable to process the request.',
      answer: fallbackAnswer(message)
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio assistant running on http://localhost:${PORT}`);
});
