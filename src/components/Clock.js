export function init(container, settings) {
  container.innerHTML = `<div id="clock" style="font-family: var(--font-serif); font-size: var(--clock-size); font-weight: 300; line-height: 1; letter-spacing: -2px; text-shadow: 0 4px 24px rgba(0,0,0,0.4);"></div>`;
  const clockEl = container.querySelector('#clock');
  
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    if (!settings.clock24h) {
      hours = hours % 12 || 12;
    }
    
    clockEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes}`;
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}
