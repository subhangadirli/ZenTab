// Cross-browser polyfill
export const ext = (typeof browser !== 'undefined' ? browser : chrome);

// Default settings
export const DEFAULT_SETTINGS = {
  clock24h: true,
  searchEngine: 'google', // 'google', 'duckduckgo', 'bing'
  showStatus: true,
  showQuote: true,
  quickLinks: [
    { name: 'GITHUB', url: 'https://github.com', icon: 'code' },
    { name: 'YOUTUBE', url: 'https://youtube.com', icon: 'play' },
    { name: 'GMAIL', url: 'https://mail.google.com', icon: 'mail' },
    { name: 'FIGMA', url: 'https://figma.com', icon: 'layout' },
    { name: 'STACKOVERFLOW', url: 'https://stackoverflow.com', icon: 'database' }
  ]
};

export async function getSettings() {
  return new Promise((resolve) => {
    const callback = (result) => {
      if (result && result.settings) {
        resolve({ ...DEFAULT_SETTINGS, ...result.settings });
      } else {
        // First initialization, save defaults
        ext.storage.sync.set({ settings: DEFAULT_SETTINGS }, () => {
          resolve(DEFAULT_SETTINGS);
        });
      }
    };

    // Handle both Promise (Firefox native) and Callback (Chrome/fallback) APIs
    const req = ext.storage.sync.get("settings", callback);
    if (req && typeof req.then === 'function') {
      req.then(callback).catch(() => resolve(DEFAULT_SETTINGS));
    }
  });
}

export async function saveSettings(patch) {
  const current = await getSettings();
  const next = { ...current, ...patch };
  return new Promise((resolve) => {
    ext.storage.sync.set({ settings: next }, () => {
      resolve(next);
    });
  });
}
