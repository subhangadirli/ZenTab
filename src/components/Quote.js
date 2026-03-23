const QUOTES = [
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Simplicity is the ultimate sophistication.",
  "Less, but better.",
  "The details are not the details, they make the design.",
  "Good design is obvious. Great design is transparent.",
  "Everything should be made as simple as possible, but not simpler.",
  "Space is the breath of art.",
  "To create a memorable design you need to start with a thought that's worth remembering.",
  "Form follows function.",
  "Whitespace is like air: it is necessary for design to breathe.",
  "To design is to communicate clearly by whatever means you can control or master.",
  "Styles come and go. Good design is a language, not a style."
];

export function init(container, settings) {
  let currentIndex = Math.floor(Math.random() * QUOTES.length);
  
  container.innerHTML = `
    <div id="quote-text" style="font-style: italic; font-size: 0.85rem; color: var(--text-muted); max-width: 400px; line-height: 1.4; transition: opacity var(--transition-speed) var(--transition-ease);">
      "${QUOTES[currentIndex]}"
    </div>
  `;
  
  const textEl = container.querySelector('#quote-text');
  
  // Look for external refresh button in DOM
  const btn = document.getElementById('btn-refresh-quote');
  if (btn) {
    btn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % QUOTES.length;
      
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = `"${QUOTES[currentIndex]}"`;
        textEl.style.opacity = '1';
      }, 150);
    });
  }
}
