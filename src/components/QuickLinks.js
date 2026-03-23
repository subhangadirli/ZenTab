import { saveSettings } from '../store/settings.js';

export function init(container, settings) {
  let isEditing = false;
  let links = [...settings.quickLinks];

  function getDomain(urlStr) {
    try {
      return new URL(urlStr).hostname;
    } catch {
      return '';
    }
  }

  function render() {
    container.innerHTML = `
      <div class="quick-links-grid" style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        ${links.map((link, idx) => `
          <a href="${isEditing ? '#' : link.url}" class="ql-card" data-index="${idx}" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100px; height: 100px; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; text-decoration: none; transition: all var(--transition-speed) var(--transition-ease);">
            ${isEditing ? `<div style="position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; background: var(--text-main); color: var(--bg-color-top); display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div>` : ''}
            <img src="https://www.google.com/s2/favicons?domain=${getDomain(link.url)}&sz=64" style="width: 28px; height: 28px; border-radius: 6px; margin-bottom: 12px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));" />
            <div style="font-size: 0.65rem; font-weight: 500; letter-spacing: 1px; color: var(--text-muted); max-width: 80px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;">${link.name}</div>
          </a>
        `).join('')}
        ${isEditing ? `
          <button id="add-link-btn" class="ql-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100px; height: 100px; background: rgba(255,255,255,0.02); border: 1px dashed var(--text-faint); border-radius: 16px; color: var(--text-muted); transition: all var(--transition-speed); cursor: pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span style="font-size: 0.65rem; margin-top: 8px;">ADD</span>
          </button>
        ` : ''}
      </div>
      <style>
        .ql-card:hover {
          background: var(--card-hover-bg) !important;
          border-color: var(--card-border-hover) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
      </style>
      <div id="ql-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: var(--z-index-overlay); align-items: center; justify-content: center; backdrop-filter: blur(8px);">
        <div style="background: var(--bg-color-top); padding: 32px; border-radius: 16px; border: 1px solid var(--card-border); width: 400px; box-shadow: 0 24px 48px rgba(0,0,0,0.5);">
          <h2 id="ql-modal-title" style="margin-bottom: 24px; font-size: 1.2rem; font-weight: 400; font-family: var(--font-serif);">Edit Shortcut</h2>
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 1px;">NAME</label>
            <input id="ql-input-name" type="text" style="width: 100%; background: var(--search-bg); border: 1px solid var(--search-border); padding: 12px 16px; border-radius: 8px; color: white; transition: border-color var(--transition-speed);" />
          </div>
          <div style="margin-bottom: 32px;">
            <label style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 1px;">URL</label>
            <input id="ql-input-url" type="text" style="width: 100%; background: var(--search-bg); border: 1px solid var(--search-border); padding: 12px 16px; border-radius: 8px; color: white; transition: border-color var(--transition-speed);" />
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button id="ql-btn-delete" style="color: #ef4444; font-size: 0.85rem; font-weight: 500; cursor: pointer; visibility: hidden;">Delete</button>
            <div style="display: flex; gap: 12px;">
              <button id="ql-btn-cancel" style="color: var(--text-muted); font-size: 0.85rem; padding: 8px 16px; border-radius: 8px; cursor: pointer;">Cancel</button>
              <button id="ql-btn-save" style="background: var(--text-main); color: var(--bg-color-top); font-size: 0.85rem; padding: 8px 24px; border-radius: 8px; font-weight: 500; cursor: pointer;">Save</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = container.querySelector('#ql-modal');
    const inputName = container.querySelector('#ql-input-name');
    const inputUrl = container.querySelector('#ql-input-url');
    const btnCancel = container.querySelector('#ql-btn-cancel');
    const btnSave = container.querySelector('#ql-btn-save');
    const btnDelete = container.querySelector('#ql-btn-delete');
    const modalTitle = container.querySelector('#ql-modal-title');
    
    let editingIndex = -1;

    function openModal(index = -1) {
      editingIndex = index;
      if (index >= 0) {
        modalTitle.textContent = "Edit Shortcut";
        inputName.value = links[index].name;
        inputUrl.value = links[index].url;
        btnDelete.style.visibility = 'visible';
      } else {
        modalTitle.textContent = "Add Shortcut";
        inputName.value = '';
        inputUrl.value = '';
        btnDelete.style.visibility = 'hidden';
      }
      modal.style.display = 'flex';
      inputName.focus();
    }

    function closeModal() {
      modal.style.display = 'none';
      editingIndex = -1;
    }

    btnCancel.addEventListener('click', closeModal);

    btnSave.addEventListener('click', async () => {
      const name = inputName.value.trim().toUpperCase();
      let url = inputUrl.value.trim();
      if (!name || !url) return;
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

      if (editingIndex >= 0) {
        links[editingIndex] = { name, url };
      } else {
        links.push({ name, url });
      }
      await saveSettings({ quickLinks: links });
      closeModal();
      render();
    });

    btnDelete.addEventListener('click', async () => {
      if (editingIndex >= 0) {
        links.splice(editingIndex, 1);
        await saveSettings({ quickLinks: links });
        closeModal();
        render();
      }
    });

    // Attach click events
    if (isEditing) {
      container.querySelectorAll('.ql-card[data-index]').forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          const idx = parseInt(card.dataset.index, 10);
          openModal(idx);
        });
      });

      const addBtn = container.querySelector('#add-link-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => openModal(-1));
      }
    }
  }

  // Hook into the edit button from header
  const editBtn = document.getElementById('btn-edit-links');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      isEditing = !isEditing;
      editBtn.style.color = isEditing ? 'var(--status-nominal)' : 'inherit';
      editBtn.style.opacity = isEditing ? '1' : '';
      render();
    });
  }

  render();
}
