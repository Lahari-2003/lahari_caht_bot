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
    'Data Engineer with 3+ years of experience building scalable GCP-based data platforms, ETL/ELT pipelines, and analytics solutions using Python, SQL, Spark, Airflow, BigQuery, Dataflow, Dataproc, Cloud Composer, Pub/Sub, and Google Cloud Storage.',
  skills: [
    'Python',
    'SQL',
    'Apache Spark',
    'PySpark',
    'Airflow',
    'Cloud Composer',
    'BigQuery',
    'Dataflow',
    'Dataproc',
    'Google Cloud Storage',
    'Kafka',
    'dbt',
    'Terraform',
    'Docker',
    'Kubernetes',
    'Power BI',
    'Looker'
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
      description:
        'Developed a data-driven platform using Python and Django to analyze transportation and infrastructure patterns from multiple urban datasets. Applied machine learning and data analysis techniques to improve transportation efficiency, sustainability, and accessibility.'
    },
    {
      name: 'VINAC (Make Construction Easy)',
      description:
        'Built a data-centric AI platform on Google Cloud Platform for construction design and project intelligence, ingesting user behavior, project, and design data into Google Cloud Storage and BigQuery. Used Cloud Functions, Cloud Run, Docker, Terraform, and monitoring tools for scalable deployment and product intelligence.'
    }
  ]
};

function getFallbackResponse(input) {
  const lower = (input || '').toLowerCase();

  if (/(skill|stack|tech|language|framework|gcp|bigquery|spark|airflow|sql|dbt|python|cloud)/.test(lower)) {
    return 'Lahari is a Data Engineer with hands-on skills in Python, SQL, Spark, PySpark, Airflow, BigQuery, Dataflow, Dataproc, Google Cloud Storage, Kafka, dbt, Terraform, and cloud monitoring tools. His work focuses on building reliable ETL/ELT pipelines and scalable GCP analytics platforms.';
  }

  if (/(project|portfolio|work|vinac|mobility|smart city|construction)/.test(lower)) {
    return 'Recent work includes Smart City and Mobility – Urban Efficiency Enhancement and VINAC (Make Construction Easy), both centered on cloud data pipelines, analytics, and data-driven decision support.';
  }

  if (/(experience|background|career|work history|resume|journey|umkc|citius)/.test(lower)) {
    return 'Lahari has 3+ years of experience as a Data Engineer across UMKC IS Labs and Citius Tech, with strong expertise in GCP architecture, ETL orchestration, data quality, and enterprise reporting.';
  }

  if (/(contact|email|phone|reach|hire|connect|opportunity)/.test(lower)) {
    return 'You can contact Lahari at +1 (913)-272-1290 or paidipatilahari14@gmail.com for data engineering, cloud, and analytics opportunities.';
  }

  if (/(about|who|lahari|summary|data engineer)/.test(lower)) {
    return 'Lahari Paidipati is a Data Engineer based in Kansas City, MO, with experience building data warehouses, ETL pipelines, and cloud-native analytics systems across Google Cloud environments.';
  }

  return 'I can answer questions about Lahari’s background, skills, project work, GCP experience, and contact details. Try asking about Spark, BigQuery, ETL pipelines, or recent projects.';
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Portfolio chat server is running.' });
});

app.post('/api/chat', async (req, res) => {
  const message = (req.body && req.body.message ? req.body.message : '').trim();

  if (!message) {
    return res.status(400).json({ error: 'A message is required.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === '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') {
    return res.json({ answer: getFallbackResponse(message) });
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
        max_tokens: 400,
        system: `You are a polished portfolio assistant for Lahari Paidipati, a Data Engineer. Use only the information supplied in the profile and keep answers professional, accurate, and concise. Profile: ${JSON.stringify(resume)}`,
        messages: [{ role: 'user', content: message }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return res.status(502).json({
        error: 'The AI provider is unavailable right now.',
        answer: getFallbackResponse(message)
      });
    }

    const data = await response.json();
    const answer = data.content?.[0]?.text || getFallbackResponse(message);

    return res.json({ answer });
  } catch (error) {
    console.error('Chat request failed:', error);
    return res.status(500).json({
      error: 'The chat service could not complete the request.',
      answer: getFallbackResponse(message)
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio chat server running at http://localhost:${PORT}`);
});
