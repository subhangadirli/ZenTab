export function init(container, settings) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modifierKey = isMac ? 'CMD' : 'CTRL';

  container.innerHTML = `
    <div class="search-wrapper" style="position: relative; width: 100%; display: flex; align-items: center; background: var(--search-bg); border: 1px solid var(--search-border); border-radius: 9999px; padding: 16px 24px; transition: all var(--transition-speed) var(--transition-ease);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); min-width: 20px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" id="search-input" placeholder="Deep search workspace..." style="flex: 1; margin: 0 16px; font-size: 1.1rem; width: 100%;" />
      <div class="shortcut-badges" style="display: flex; gap: 4px; pointer-events: none;">
        <span class="badge" style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 500;">${modifierKey}</span>
        <span class="badge" style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 500;">K</span>
      </div>
    </div>
  `;
  
  const input = container.querySelector('#search-input');
  const wrapper = container.querySelector('.search-wrapper');
  
  // Focus effects
  input.addEventListener('focus', () => {
    wrapper.style.background = 'rgba(255, 255, 255, 0.05)';
    wrapper.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    wrapper.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
    input.placeholder = '';
  });
  
  input.addEventListener('blur', () => {
    wrapper.style.background = 'var(--search-bg)';
    wrapper.style.borderColor = 'var(--search-border)';
    wrapper.style.boxShadow = 'none';
    input.placeholder = 'Deep search workspace...';
  });

  // Hotkeys
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.blur();
    }
  });
  
  // Submit search
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const queryText = input.value.trim();
      if (!queryText) return;

      // Respect default search engine if supported
      if (settings.searchEngine === 'default' && typeof chrome !== 'undefined' && chrome.search) {
        chrome.search.query({ text: queryText, disposition: 'CURRENT_TAB' });
        input.value = '';
        input.blur();
        return;
      }

      const query = encodeURIComponent(queryText);
      let searchUrl = `https://www.google.com/search?q=${query}`;
      if (settings.searchEngine === 'duckduckgo') {
        searchUrl = `https://duckduckgo.com/?q=${query}`;
      } else if (settings.searchEngine === 'bing') {
        searchUrl = `https://www.bing.com/search?q=${query}`;
      }
      
      window.location.href = searchUrl;
      input.value = '';
      input.blur();
    }
  });
}
