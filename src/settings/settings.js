import { getSettings, saveSettings } from '../store/settings.js';

async function setup() {
  const settings = await getSettings();
  
  const clockToggle = document.getElementById('setting-clock24h');
  const searchSelect = document.getElementById('setting-search');
  const quoteToggle = document.getElementById('setting-quote');
  const statusToggle = document.getElementById('setting-status');
  
  // Initialize with current settings
  clockToggle.checked = settings.clock24h;
  searchSelect.value = settings.searchEngine;
  quoteToggle.checked = settings.showQuote;
  statusToggle.checked = settings.showStatus;
  
  // Attach listeners
  clockToggle.addEventListener('change', async (e) => {
    await saveSettings({ clock24h: e.target.checked });
  });
  
  searchSelect.addEventListener('change', async (e) => {
    await saveSettings({ searchEngine: e.target.value });
  });
  
  quoteToggle.addEventListener('change', async (e) => {
    await saveSettings({ showQuote: e.target.checked });
  });
  
  statusToggle.addEventListener('change', async (e) => {
    await saveSettings({ showStatus: e.target.checked });
  });
}

setup();
