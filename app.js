// Markdown content embedded directly
const markdownContent = `# 📱 Responsive IFrame Grid Gallery

> Displays multiple embedded content in a responsive grid layout

## Featured Content

### Luma 1
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 2
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 3
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 4
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 5
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 6
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 7
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 8
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 9
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

### Luma 10
[iframe]https://lumalabs.ai/embed/a4a1d958-963e-49bd-892d-88a3d0e15f62?mode=sparkles&background=%23000000&color=%23FFFFFF&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false[/iframe]

---

*Edit the markdown content in app.js to customize your iframes!*
`;

// Fetch and parse the markdown content
async function loadMarkdown() {
    try {
        // Use embedded markdown content instead of fetching
        const markdown = markdownContent;
        
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
        document.getElementById('content').innerHTML = '<div class="header"><h1>Error loading content</h1><p>Could not render content</p></div>';
    }
}

// Process custom iframe tags into proper iframe elements
function processIframes(html) {
    // Split content into header and body
    const lines = html.split('\n');
    let headerHtml = '';
    let bodyHtml = '';
    let gridItems = [];
    let currentTitle = '';
    let inHeader = true;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we've moved past the header (first hr or first iframe)
        if (line.includes('<hr>') || line.includes('[iframe')) {
            inHeader = false;
        }
        
        if (inHeader) {
            headerHtml += line + '\n';
        } else {
            // Look for h3 headers (titles)
            if (line.includes('<h3>')) {
                currentTitle = line.replace(/<\/?h3>/g, '').trim();
            }
            
            // Look for iframe tags
            const iframeMatch = line.match(/\[iframe(?::(\w+))?\](.*?)\[\/iframe(?::\w+)?\]/);
            if (iframeMatch) {
                const aspectRatio = iframeMatch[1] || 'default';
                const url = iframeMatch[2];
                
                gridItems.push({
                    title: currentTitle,
                    url: url,
                    aspectRatio: aspectRatio
                });
                
                currentTitle = ''; // Reset title
            } else if (line.includes('<hr>')) {
                // Add footer content
                bodyHtml += line + '\n';
            } else if (!line.includes('<h3>')) {
                // Add other content (like footer text)
                bodyHtml += line + '\n';
            }
        }
    }
    
    // Build the header
    let result = '<div class="header">' + headerHtml + '</div>';
    
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
                        <h3>${item.title || 'IFrame'}</h3>
                    </div>
                    <div class="${wrapperClass}">
                        <div class="loading">Loading...</div>
                        <iframe src="${item.url}" 
                                title="${item.title || 'IFrame'}"
                                loading="lazy"></iframe>
                    </div>
                </div>
            `;
        });
        
        result += '</div>';
    }
    
    // Add footer
    if (bodyHtml.trim()) {
        result += '<div class="footer">' + bodyHtml + '</div>';
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
