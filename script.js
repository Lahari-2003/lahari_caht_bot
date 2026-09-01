const faq = {
  skills: "Lahari works across JavaScript, TypeScript, React, Node.js, Express, SQL, MongoDB, and Python, with a strong focus on thoughtful product experiences and reliable execution.",
  projects: "Recent work includes a Smart Career Companion, a Team Productivity Portal, and a Workflow Insights Engine that combine practical UX with automation and measurable outcomes.",
  experience: "Lahari has built digital products with a strong focus on usability, collaboration, and clean engineering practices, helping teams move from ideas to working solutions.",
  contact: "You can reach out via email at lahari.dev@example.com or connect through LinkedIn and GitHub to discuss opportunities, collaborations, and product work.",
  about: "Lahari enjoys turning complex problems into clear, user-focused solutions, blending design thinking with engineering discipline to create impactful web experiences.",
  default: "I can help with information about skills, projects, experience, or contact details. Try asking: 'What are your skills?', 'Show me projects', or 'How can I contact you?'"
};

const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const resetChat = document.getElementById('resetChat');

function addMessage(text, sender = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getResponse(input) {
  const lowerInput = input.toLowerCase();

  if (/(skill|stack|tech|language|framework)/.test(lowerInput)) {
    return faq.skills;
  }

  if (/(project|work|portfolio|build)/.test(lowerInput)) {
    return faq.projects;
  }

  if (/(experience|background|career|journey)/.test(lowerInput)) {
    return faq.experience;
  }

  if (/(contact|email|reach|linkedin|github|hire|connect)/.test(lowerInput)) {
    return faq.contact;
  }

  if (/(about|who|you|lahari)/.test(lowerInput)) {
    return faq.about;
  }

  return faq.default;
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();

  if (!userMessage) {
    return;
  }

  addMessage(userMessage, 'user');
  chatInput.value = '';

  const response = getResponse(userMessage);
  window.setTimeout(() => addMessage(response, 'bot'), 250);
});

resetChat.addEventListener('click', () => {
  chatBody.innerHTML = `
    <div class="message bot-message">
      Hi! I’m Lahari’s portfolio assistant. Ask me about skills, projects,
      experience, or how to connect.
    </div>
  `;
  chatInput.focus();
});
