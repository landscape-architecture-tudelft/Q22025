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
        
        // Process the HTML to convert custom iframe tags
        const processedHtml = processIframes(html);
        
        // Inject into the page
        document.getElementById('content').innerHTML = processedHtml;
        
        // Add loading handlers
        setupIframeLoading();
        
    } catch (error) {
        console.error('Error loading markdown:', error);
        document.getElementById('content').innerHTML = '<div class="header"><h1>Error loading content</h1><p>' + error.message + '</p></div>';
    }
}

// Process custom iframe tags and raw HTML iframes into proper iframe elements
function processIframes(html) {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Extract title
    const h1 = tempDiv.querySelector('h1');
    const headerTitle = h1 ? h1.textContent : 'IFrame Grid Gallery';
    
    // Extract all iframes
    const iframes = tempDiv.querySelectorAll('iframe');
    const gridItems = [];
    
    iframes.forEach((iframe, index) => {
        const src = iframe.getAttribute('src');
        const title = iframe.getAttribute('title') || `IFrame ${index + 1}`;
        
        if (src) {
            gridItems.push({
                title: title,
                url: src,
                aspectRatio: 'default'
            });
        }
    });
    
    // Also look for custom [iframe] tags
    const customIframeRegex = /\[iframe(?::(\w+))?\](.*?)\[\/iframe(?::\w+)?\]/g;
    let match;
    const htmlText = tempDiv.innerHTML;
    
    while ((match = customIframeRegex.exec(htmlText)) !== null) {
        const aspectRatio = match[1] || 'default';
        const url = match[2];
        
        gridItems.push({
            title: `Custom IFrame ${gridItems.length + 1}`,
            url: url,
            aspectRatio: aspectRatio
        });
    }
    
    // Build the header
    let result = `<div class="header"><h1>${headerTitle}</h1></div>`;
    
    // Build the grid
    if (gridItems.length > 0) {
        result += '<div class="grid-container">';
        
        gridItems.forEach(item => {
            const wrapperClass = item.aspectRatio === 'wide' ? 'iframe-wrapper wide' : 
                                item.aspectRatio === 'square' ? 'iframe-wrapper square' : 
                                'iframe-wrapper';
            
            result += `
                <div class="iframe-card">
                    <div class="iframe-header">
                        <h3>${item.title}</h3>
                    </div>
                    <div class="${wrapperClass}">
                        <div class="loading">Loading...</div>
                        <iframe src="${item.url}" 
                                title="${item.title}"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                                allowfullscreen></iframe>
                    </div>
                </div>
            `;
        });
        
        result += '</div>';
    }
    
    return result;
}

// Setup loading indicators
function setupIframeLoading() {
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.addEventListener('load', function() {
            const loading = this.previousElementSibling;
            if (loading && loading.classList.contains('loading')) {
                loading.style.display = 'none';
            }
        });
        
        // Handle iframe loading errors
        iframe.addEventListener('error', function() {
            const loading = this.previousElementSibling;
            if (loading && loading.classList.contains('loading')) {
                loading.textContent = 'Failed to load';
                loading.style.color = '#d73a49';
            }
        });
    });
}

// Load markdown when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMarkdown);
} else {
    loadMarkdown();
}
