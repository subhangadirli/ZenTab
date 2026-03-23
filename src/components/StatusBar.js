export function init(container, settings) {
  const version = '1.0.4';
  const now = new Date();
  const dateStr = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear().toString().slice(-2)}`;
  
  container.innerHTML = `
    <div style="display: flex; align-items: center; gap: 24px; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 1px; color: var(--text-muted);">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--status-nominal); box-shadow: 0 0 8px var(--status-nominal);"></div>
        <span>SYSTEMS NOMINAL</span>
      </div>
      <div style="width: 1px; height: 12px; background: var(--card-border);"></div>
      <div>${dateStr} // V${version}</div>
    </div>
  `;
}
