import { getSettings, ext } from '../store/settings.js';
import { init as initClock } from '../components/Clock.js';
import { init as initDateLabel } from '../components/DateLabel.js';
import { init as initSearchBar } from '../components/SearchBar.js';
import { init as initQuickLinks } from '../components/QuickLinks.js';
import { init as initQuote } from '../components/Quote.js';
import { init as initStatusBar } from '../components/StatusBar.js';

async function setup() {
  const settings = await getSettings();
  
  // Top bar actions
  document.getElementById('btn-settings').addEventListener('click', () => {
    ext.runtime.openOptionsPage();
  });

  document.getElementById('btn-refresh-page').addEventListener('click', () => {
    window.location.reload();
  });
  
  // Init components
  initClock(document.getElementById('clock-container'), settings);
  initDateLabel(document.getElementById('date-container'), settings);
  initSearchBar(document.getElementById('search-container'), settings);
  initQuickLinks(document.getElementById('quicklinks-container'), settings);
  
  if (settings.showQuote) {
    initQuote(document.getElementById('quote-container'), settings);
  } else {
    document.getElementById('quote-container').style.display = 'none';
  }
  
  if (settings.showStatus) {
    initStatusBar(document.getElementById('status-container'), settings);
  } else {
    document.getElementById('status-container').style.display = 'none';
  }
}

setup();
