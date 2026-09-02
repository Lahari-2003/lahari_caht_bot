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

async function askPortfolioAssistant(prompt) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();
    return data.answer || 'I could not answer that question right now.';
  } catch (error) {
    console.error('Chat request failed:', error);
    return 'I could not reach the AI backend right now. Please try again.';
  }
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();

  if (!userMessage) return;

  addMessage(userMessage, 'user');
  chatInput.value = '';

  const answer = await askPortfolioAssistant(userMessage);
  window.setTimeout(() => addMessage(answer, 'bot'), 200);
});

promptButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const prompt = button.textContent.trim();
    addMessage(prompt, 'user');
    const answer = await askPortfolioAssistant(prompt);
    window.setTimeout(() => addMessage(answer, 'bot'), 200);
  });
});

resetChat.addEventListener('click', () => {
  chatBody.innerHTML = `
    <div class="message bot-message">
      Hello, I’m Lahari’s portfolio assistant. Ask about my skills, experience, projects, or contact details.
    </div>
  `;
  chatInput.focus();
});
