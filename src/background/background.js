// Minimal Manifest V3 background service worker
const ext = globalThis.browser ?? globalThis.chrome;

ext.runtime.onInstalled.addListener(() => {
  // Initialization logic if needed
  console.log("ZenTab installed.");
});
