import glob
import os

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Remove old widget from index.html if it exists
    if '<!-- Audio Experience Widget -->' in content:
        parts = content.split('<!-- Audio Experience Widget -->')
        before_widget = parts[0]
        if '</body>' in parts[1]:
            after_script = parts[1].split('</body>', 1)[1]
            content = before_widget + '\n</body>' + after_script

    # 2. Inject global_audio.js script just before </body>
    if '<script src="js/global_audio.js"></script>' not in content and '</body>' in content:
        content = content.replace('</body>', '<script src="js/global_audio.js"></script>\n</body>')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f'Updated {f}')
