import { saveSettings } from '../store/settings.js';

export function init(container, settings) {
  let links = [...settings.quickLinks];
  let activeDropdownIdx = -1;

  function getDomain(urlStr) {
    try {
      return new URL(urlStr).hostname;
    } catch {
      return '';
    }
  }

  function render() {
    container.innerHTML = `
      <div class="quick-links-grid" style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
        ${links.map((link, idx) => `
          <div class="ql-card-container" style="position: relative;">
            <a href="${link.url}" class="ql-card" data-index="${idx}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100px; height: 100px; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 20px; text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
              <img src="https://www.google.com/s2/favicons?domain=${getDomain(link.url)}&sz=64" style="width: 32px; height: 32px; border-radius: 8px; margin-bottom: 12px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));" />
              <div style="font-size: 0.7rem; font-weight: 500; letter-spacing: 0.5px; color: var(--text-muted); max-width: 80px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;">${link.name}</div>
            </a>
            
            <button class="ql-kebab-btn" data-index="${idx}" title="Options" style="position: absolute; top: 8px; right: 8px; width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,0.05); color: var(--text-muted); display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; opacity: 0; transition: all 0.2s; z-index: 5;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>

            <div class="ql-dropdown ${activeDropdownIdx === idx ? 'active' : ''}" data-index="${idx}" style="position: absolute; top: 40px; right: 0; background: rgba(25, 25, 25, 0.95); border: 1px solid var(--card-border); border-radius: 12px; padding: 6px; z-index: 20; box-shadow: 0 12px 32px rgba(0,0,0,0.5); display: none; min-width: 110px; backdrop-filter: blur(20px);">
              <button class="ql-action-btn edit" data-index="${idx}" style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 10px 12px; border-radius: 8px; font-size: 0.8rem; color: #ddd; text-align: left; transition: all 0.2s; background: transparent; border: none; cursor: pointer;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Edit
              </button>
              <button class="ql-action-btn delete" data-index="${idx}" style="display: flex; align-items: center; gap: 8px; width: 100%; padding: 10px 12px; border-radius: 8px; font-size: 0.8rem; color: #ef4444; text-align: left; transition: all 0.2s; background: transparent; border: none; cursor: pointer;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Delete
              </button>
            </div>
          </div>
        `).join('')}
        <button id="add-link-btn" class="ql-card add-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100px; height: 100px; background: rgba(255,255,255,0.02); border: 1px dashed var(--text-faint); border-radius: 20px; color: var(--text-muted); transition: all 0.3s; cursor: pointer; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span style="font-size: 0.65rem; margin-top: 8px; font-weight: 600; letter-spacing: 1px;">ADD</span>
        </button>
      </div>
      <style>
        .ql-card-container:hover .ql-kebab-btn { opacity: 1; }
        .ql-card-container:hover .ql-card { transform: translateY(-4px); border-color: var(--card-border-hover); background: var(--card-hover-bg) !important; }
        .ql-kebab-btn:hover { background: rgba(255,255,255,0.15) !important; color: white; }
        .ql-dropdown.active { display: block; animation: qlDropdownIn 0.2s ease-out; }
        @keyframes qlDropdownIn { from { opacity: 0; transform: translateY(-8px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .ql-action-btn:hover { background: rgba(255,255,255,0.08); color: white !important; }
        .ql-action-btn.delete:hover { background: rgba(239, 68, 68, 0.15); color: #ff5f5f !important; }
        .add-card:hover { border-color: var(--text-main) !important; color: var(--text-main) !important; background: rgba(255,255,255,0.08) !important; transform: translateY(-4px); }
      </style>
      <div id="ql-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: var(--z-index-overlay); align-items: center; justify-content: center; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
        <div style="background: rgba(20, 20, 20, 0.85); padding: 40px; border-radius: 28px; border: 1px solid var(--card-border); width: 440px; box-shadow: 0 32px 64px rgba(0,0,0,0.6); animation: qlFadeIn 0.3s ease;">
          <h2 id="ql-modal-title" style="margin-bottom: 32px; font-size: 1.5rem; font-weight: 400; font-family: var(--font-serif); letter-spacing: 0.5px; color: white;">Edit Shortcut</h2>
          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 1.5px; font-weight: 600;">NAME</label>
            <input id="ql-input-name" type="text" placeholder="e.g. GitHub" style="width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--search-border); padding: 14px 18px; border-radius: 12px; color: white; font-size: 1rem; transition: all 0.3s; outline: none;" />
          </div>
          <div style="margin-bottom: 40px;">
            <label style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 1.5px; font-weight: 600;">URL</label>
            <input id="ql-input-url" type="text" placeholder="e.g. github.com" style="width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--search-border); padding: 14px 18px; border-radius: 12px; color: white; font-size: 1rem; transition: all 0.3s; outline: none;" />
          </div>
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 16px;">
            <button id="ql-btn-cancel" style="color: var(--text-muted); font-size: 0.95rem; padding: 10px 24px; border-radius: 14px; cursor: pointer; background: none; border: 1px solid transparent; transition: all 0.2s;">Cancel</button>
            <button id="ql-btn-save" style="background: var(--text-main); color: var(--bg-color-top); font-size: 0.95rem; padding: 10px 32px; border-radius: 14px; font-weight: 600; cursor: pointer; border: none; box-shadow: 0 4px 20px rgba(255,255,255,0.15); transition: all 0.2s;">Save</button>
          </div>
        </div>
      </div>
      <style>
        @keyframes qlFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    `;

    const modal = container.querySelector('#ql-modal');
    const inputName = container.querySelector('#ql-input-name');
    const inputUrl = container.querySelector('#ql-input-url');
    const btnCancel = container.querySelector('#ql-btn-cancel');
    const btnSave = container.querySelector('#ql-btn-save');
    const modalTitle = container.querySelector('#ql-modal-title');
    
    let editingIndex = -1;

    function openModal(index = -1) {
      editingIndex = index;
      if (index >= 0) {
        modalTitle.textContent = "Edit Shortcut";
        inputName.value = links[index].name;
        inputUrl.value = links[index].url;
      } else {
        modalTitle.textContent = "Add Shortcut";
        inputName.value = '';
        inputUrl.value = '';
      }
      modal.style.display = 'flex';
      inputName.focus();
    }

    function closeModal() {
      modal.style.display = 'none';
      editingIndex = -1;
      activeDropdownIdx = -1;
      render();
    }

    btnCancel.addEventListener('click', closeModal);

    btnSave.addEventListener('click', async () => {
      const name = inputName.value.trim().toUpperCase();
      let url = inputUrl.value.trim();
      if (!name || !url) return;
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

      if (editingIndex >= 0) {
        links[editingIndex] = { ...links[editingIndex], name, url };
      } else {
        links.push({ name, url });
      }
      await saveSettings({ quickLinks: links });
      closeModal();
    });

    // Kebab buttons
    container.querySelectorAll('.ql-kebab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const idx = parseInt(btn.dataset.index, 10);
        activeDropdownIdx = (activeDropdownIdx === idx) ? -1 : idx;
        render();
      });
    });

    // Dropdown actions
    container.querySelectorAll('.ql-action-btn.edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index, 10);
        openModal(idx);
      });
    });

    container.querySelectorAll('.ql-action-btn.delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index, 10);
        links.splice(idx, 1);
        await saveSettings({ quickLinks: links });
        activeDropdownIdx = -1;
        render();
      });
    });

    // Add button
    const addBtn = container.querySelector('#add-link-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => openModal(-1));
    }

    // Close dropdown on click away
    document.addEventListener('click', (e) => {
      if (activeDropdownIdx !== -1 && !e.target.closest('.ql-card-container')) {
        activeDropdownIdx = -1;
        render();
      }
    }, { once: true });
  }

  render();
}
