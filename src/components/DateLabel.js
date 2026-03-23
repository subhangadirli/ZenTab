export function init(container, settings) {
  container.innerHTML = `<div id="date-label" style="font-size: 0.85rem; letter-spacing: 3px; font-weight: 500; text-transform: uppercase; color: var(--text-muted); margin-top: 16px;"></div>`;
  const dateEl = container.querySelector('#date-label');
  
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString('en-US', options);
}
