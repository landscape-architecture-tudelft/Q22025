// Fetch and parse the markdown content
async function loadMarkdown() {
    try {
        // Fetch the markdown file
        const response = await fetch('content.md');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdown = await response.text();
        
        // Parse markdown to HTML
        const html = marked.parse(markdown);
        
    // Build lazy cards & inject
    const processedHtml = processIframes(html);
    document.getElementById('content').innerHTML = processedHtml;
    // Wire up interactions
    setupCardInteractions();
        
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById('content').innerHTML = '<div class="header"><h1>Error loading content</h1><p>' + error.message + '</p></div>';
    }
}

// Process custom iframe tags and raw HTML iframes into LAZY clickable cards
function processIframes(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const h1 = tempDiv.querySelector('h1');
    const headerTitle = h1 ? h1.textContent : 'IFrame Gallery';

    // Collect iframe URLs from raw HTML iframes
    const rawIframes = tempDiv.querySelectorAll('iframe');
    const gridItems = [];
    rawIframes.forEach((iframe, index) => {
        const src = iframe.getAttribute('src');
        if (!src) return;
        const title = iframe.getAttribute('title') || `Item ${index + 1}`;
        gridItems.push({ title, url: src });
    });

    // Collect custom markdown [iframe] tags
    const customRegex = /\[iframe(?::(\w+))?\](.*?)\[\/iframe(?::\w+)?\]/g;
    let m; let customIndex = 1;
    while ((m = customRegex.exec(tempDiv.innerHTML)) !== null) {
        gridItems.push({ title: `Custom ${customIndex++}`, url: m[2] });
    }

    let result = `<div class="header"><h1>${headerTitle}</h1><p>Click a card to open fullscreen. Press ESC or the close button to exit.</p></div>`;
    if (gridItems.length) {
        result += '<div class="grid-container">';
        gridItems.forEach(item => {
            result += `
            <button class="iframe-card iframe-card-button" data-url="${item.url}" data-title="${item.title}" aria-label="Open ${item.title} fullscreen">
                <div class="iframe-header"><h3>${item.title}</h3></div>
                <div class="card-body">
                    <span class="open-hint">Open ▶</span>
                </div>
            </button>`;
        });
        result += '</div>';
    } else {
        result += '<p>No iframes found in markdown.</p>';
    }
    // Add hidden overlay container root
    result += `<div id="fullscreen-overlay" class="fullscreen-overlay" hidden></div>`;
    return result;
}

// Setup card click handlers
function setupCardInteractions() {
    const container = document.getElementById('content');
    const overlay = document.getElementById('fullscreen-overlay');
    if (!container || !overlay) return;

    function closeOverlay() {
        overlay.innerHTML = '';
        overlay.setAttribute('hidden', '');
        document.body.classList.remove('no-scroll');
    }

    // Safety: if overlay accidentally visible with no content, hide after short delay
    setTimeout(() => {
        if (!overlay.hasAttribute('hidden') && !overlay.querySelector('iframe')) {
            closeOverlay();
            console.warn('Overlay auto-closed (no iframe loaded).');
        }
    }, 1500);

    container.addEventListener('click', e => {
        const card = e.target.closest('.iframe-card-button');
        if (!card) return;
        const url = card.getAttribute('data-url');
        const title = card.getAttribute('data-title');
        if (!url) return;
        // Prevent duplicate overlays
        if (!overlay.hasAttribute('hidden')) return;
        // Build fullscreen content lazily
        overlay.innerHTML = `
            <div class="overlay-inner" role="dialog" aria-label="${title}">
                <div class="overlay-header">
                    <h2>${title}</h2>
                    <button class="close-btn" aria-label="Close fullscreen">✕</button>
                </div>
                <div class="overlay-iframe-wrapper">
                    <div class="loading">Loading...</div>
                    <iframe src="${url}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking" allowfullscreen></iframe>
                </div>
            </div>`;
        overlay.removeAttribute('hidden');
        document.body.classList.add('no-scroll');
        const iframe = overlay.querySelector('iframe');
        iframe.addEventListener('load', () => {
            const loading = overlay.querySelector('.loading');
            if (loading) loading.style.display = 'none';
        });
        iframe.addEventListener('error', () => {
            const loading = overlay.querySelector('.loading');
            if (loading) {
                loading.textContent = 'Failed to load iframe';
                loading.style.color = '#e57373';
            }
        });
    });

    overlay.addEventListener('click', e => {
        if (e.target.classList.contains('close-btn') || e.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) {
            closeOverlay();
        }
    });
}

// Load markdown when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMarkdown);
} else {
    loadMarkdown();
}
