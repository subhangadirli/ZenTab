# ZenTab

> A minimal, instant-loading new tab extension for Firefox — built for focus, not distraction.

![ZenTab Preview](assets/preview.png)

---

## Features

- **Live clock** — large serif display, 12h/24h toggle
- **Date label** — spaced uppercase, always current
- **Deep search bar** — `Cmd+K` / `Ctrl+K` to focus, configurable search engine
- **Quick links** — editable icon grid with pencil-mode add/remove
- **Rotating quotes** — design & philosophy, refreshes each tab
- **Status bar** — systems nominal, version, date
- **Settings page** — persistent via `browser.storage.sync`

---

## Philosophy

ZenTab is built on one rule: **every millisecond is a design decision.**

- Zero external requests on load
- No framework, no bundler, no runtime overhead
- Total page weight under 50KB (excluding icons)
- Fully interactive in under 100ms

---

## Project Structure

```
zentab/
├── manifest.json
├── src/
│   ├── newtab/
│   │   ├── newtab.html
│   │   └── newtab.js
│   ├── settings/
│   │   ├── settings.html
│   │   └── settings.js
│   ├── background/
│   │   └── background.js
│   ├── components/
│   │   ├── Clock.js
│   │   ├── DateLabel.js
│   │   ├── SearchBar.js
│   │   ├── QuickLinks.js
│   │   ├── Quote.js
│   │   └── StatusBar.js
│   └── store/
│       └── settings.js
└── assets/
    ├── icons/
    │   ├── icon-16.png
    │   ├── icon-48.png
    │   ├── icon-96.png
    │   └── icon-128.png
    └── styles/
        ├── main.css
        └── themes/
            └── dark.css
```

---

## Installation (Firefox)

1. Clone the repo
   ```bash
   git clone https://github.com/subhangadirli/ZenTab.git
   ```
2. Open Firefox and go to `about:debugging`
3. Click **This Firefox** → **Load Temporary Add-on**
4. Select `manifest.json` from the project root

Open a new tab — ZenTab is live.

---

## Settings

Click the gear icon (top-right) or go to `about:addons` → ZenTab → Preferences.

| Setting | Options |
|---|---|
| Clock format | 12h / 24h |
| Search engine | Google / DuckDuckGo / Bing |
| Show quote | On / Off |
| Show status bar | On / Off |

All settings persist via `browser.storage.sync`.

---

## Customizing Quick Links

Click the **pencil icon** (top-right) to enter edit mode. Cards get an ✕ to remove. A **+** card appears to add a new link — enter a name and URL when prompted. Changes are saved instantly.

---

## Architecture Notes

**`store/settings.js`** is the single source of truth. It defines the cross-browser polyfill:

```js
const ext = window.browser ?? window.chrome;
```

and exports `getSettings()` and `saveSettings(patch)`. Every other file imports `ext` from here — `browser` and `chrome` are never referenced directly anywhere else.

**`newtab.js`** calls `ext.storage.sync.get()` exactly once at startup and passes the result down to all components. Storage is never touched inside a component.

**`background.js`** is a pure service worker — no DOM, no `window`, no persistent state. Safe for Chromium MV3.

---

## Chromium Port

ZenTab is Chromium-ready. The codebase uses Manifest V3 and the `window.browser ?? window.chrome` polyfill throughout. When porting:

1. Remove the polyfill from `store/settings.js` — use `chrome` directly
2. Package for the Chrome Web Store

No logic changes required.

---

## Roadmap

- [ ] Settings page UI
- [ ] Custom background / accent color
- [ ] Widget system (weather, todos, Pomodoro)
- [ ] Chromium release
- [ ] Theme presets

---

## License

Mozilla Public License 2.0 — see [LICENSE](./LICENSE) for details.