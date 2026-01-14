# -*- coding: utf-8 -*-
import json
import os
import sys

# Fix encoding for Windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# Base directory
base_dir = r"c:\Users\HP\Documents\MIRZA\Website Kantor Notaris & PPAT Havis Akbar\static-cp-notary"

# Read artikel.json
with open(os.path.join(base_dir, 'artikel.json'), 'r', encoding='utf-8') as f:
    articles = json.load(f)

# HTML template function
def generate_article_html(article_data, related_articles):
    # Clean filename for breadcrumb
    filename = article_data['link'].split('/')[-1].replace('.html', '')
    breadcrumb_title = article_data['title'][:50] + '...' if len(article_data['title']) > 50 else article_data['title']
    
    # Estimate reading time (assume 200 words per minute, ~100 words per paragraph with 1.5 paragraphs per minute)
    reading_time = "3 Menit Baca"  # Default
    
    # Generate related articles HTML
    related_html = ""
    for rel in related_articles[:3]:
        related_html += f'''                            <a href="{rel['link'].split('/')[-1]}" class="related-article-card">
                                <img src="{rel['image']}" alt="{rel['title']}" class="related-article-image">
                                <div class="related-article-content">
                                    <span class="related-article-category">{rel['category']}</span>
                                    <h4 class="related-article-title">{rel['title'][:80]}{'...' if len(rel['title']) > 80 else ''}</h4>
                                    <p class="related-article-date">{rel['date']}</p>
                                </div>
                            </a>
'''
    
    # Generate tags from category
    tags = f'''                        <a href="#" class="article-tag">#{article_data['category'].replace(' ', '')}</a>
                        <a href="#" class="article-tag">#Notaris</a>
                        <a href="#" class="article-tag">#Legal</a>'''
    
    html = f'''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{article_data['title']} - Notaris & PPAT Havis Akbar</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{article_data['excerpt']}">
    <link rel="icon" type="image/x-icon" href="../img/logo/logo-main.png">
    <link rel="apple-touch-icon" href="../img/logo/logo-main.png">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../artikel-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <div class="reading-progress">
        <div class="reading-progress-bar" id="progressBar"></div>
    </div>

    <div id="header"></div>
    
    <div class="article-wrapper">
        <div class="article-container">
            <nav class="article-breadcrumb">
                <a href="../index.html"><i class="fa fa-home"></i> Beranda</a>
                <span class="separator">›</span>
                <a href="../artikel.html">Artikel</a>
                <span class="separator">›</span>
                <span class="current">{breadcrumb_title}</span>
            </nav>

            <article class="article-card">
                <header class="article-header">
                    <span class="article-category-badge">{article_data['category']}</span>
                    <h1 class="article-title">{article_data['title']}</h1>
                    <div class="article-meta">
                        <span class="article-meta-item">
                            <i class="fa fa-calendar"></i>
                            <span>{article_data['date']}</span>
                        </span>
                        <span class="article-meta-item">
                            <i class="fa fa-clock-o"></i>
                            <span>{reading_time}</span>
                        </span>
                        <span class="article-meta-item">
                            <i class="fa fa-user"></i>
                            <span>Tim Notaris & PPAT Havis Akbar</span>
                        </span>
                    </div>
                </header>

                <img src="{article_data['image']}" alt="{article_data['title']}" class="article-featured-image">

                <div class="article-content">
                    <!-- CONTENT ORIGINAL TETAP DI SINI - AKAN DIAMBIL DARI FILE LAMA -->
                    __ORIGINAL_CONTENT__
                </div>

                <footer class="article-footer">
                    <div class="article-disclaimer">
                        <p style="margin: 0;">
                            <strong>Disclaimer:</strong> Informasi dalam artikel ini bersifat umum dan edukatif. Untuk kebutuhan spesifik, konsultasikan dengan Notaris & PPAT profesional.
                        </p>
                    </div>

                    <div class="article-tags">
{tags}
                    </div>

                    <div class="article-share">
                        <h3><i class="fa fa-share-alt"></i> Bagikan Artikel Ini</h3>
                        <div class="share-buttons">
                            <a href="https://wa.me/?text={article_data['title']} - https://notarishavisakbar.com/artikel/{filename}.html" target="_blank" class="share-btn whatsapp">
                                <i class="fa fa-whatsapp"></i> WhatsApp
                            </a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=https://notarishavisakbar.com/artikel/{filename}.html" target="_blank" class="share-btn facebook">
                                <i class="fa fa-facebook"></i> Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?text={article_data['title']}&url=https://notarishavisakbar.com/artikel/{filename}.html" target="_blank" class="share-btn twitter">
                                <i class="fa fa-twitter"></i> Twitter
                            </a>
                        </div>
                    </div>

                    <div class="related-articles">
                        <h3><i class="fa fa-newspaper-o"></i> Artikel Terkait</h3>
                        <div class="related-articles-grid">
{related_html}                        </div>
                    </div>

                    
                </footer>
            </article>
        </div>
    </div>

    <div id="footer"></div>
    
    <script src="../script.js"></script>
    <script>
        window.addEventListener('scroll', function() {{
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';
        }});
    </script>
</body>
</html>'''
    
    return html

# Function to extract original content from existing file
def extract_content(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract the content between specific markers
        # Looking for content inside max-w-4xl or similar main content div
        import re
        
        # Try to find the main content div
        patterns = [
            r'<div class="max-w-4xl[^>]*">(.*?)</div>\s*<div id="footer">',
            r'<div class="prose[^>]*">(.*?)</div>\s*</div>\s*<div id="footer">',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, content, re.DOTALL)
            if match:
                extracted = match.group(1)
                # Clean up: remove the wrapping divs but keep the content
                # Remove title if it exists (will be in header now)
                extracted = re.sub(r'<h1[^>]*>.*?</h1>', '', extracted, count=1)
                # Remove image if it exists (will be featured image now)
                extracted = re.sub(r'<img[^>]*class="w-full[^>]*>', '', extracted, count=1)
                return extracted.strip()
        
        # Fallback: just return a placeholder
        return '<p>Konten artikel akan segera tersedia. Silakan hubungi kami untuk informasi lebih lanjut.</p>'
    except:
        return '<p>Konten artikel akan segera tersedia. Silakan hubungi kami untuk informasi lebih lanjut.</p>'

# Process each article
artikel_dir = os.path.join(base_dir, 'artikel')
updated_count = 0

for i, article in enumerate(articles):
    filename = article['link'].split('/')[-1]
    filepath = os.path.join(artikel_dir, filename)
    
    # Skip if already updated (check for artikel-style.css)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            existing_content = f.read()
            if 'artikel-style.css' in existing_content:
                print(f"[OK] Skipped {filename} (already updated)")
                continue
    
    # Get related articles (same category, different article)
    related = [a for a in articles if a['category'] == article['category'] and a != article]
    if len(related) < 3:
        # Add more from other categories
        related += [a for a in articles if a != article and a not in related]
    related = related[:3]
    
    # Generate new HTML
    new_html = generate_article_html(article, related)
    
    # Extract original content
    original_content = extract_content(filepath)
    new_html = new_html.replace('__ORIGINAL_CONTENT__', original_content)
    
    # Write new file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    updated_count += 1
    print(f"[UPDATED] {filename}")

print(f"\n{'='*50}")
print(f"Updated {updated_count} artikel files successfully!")
print(f"{'='*50}")
