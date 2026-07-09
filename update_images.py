import os

files_to_update = ['index.html', 'services.html', 'training.html']

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace consultancy image
    content = content.replace('images/video_consultancy.png', 'images/new_industrial_consultancy.jpeg')
    
    # Replace training image
    content = content.replace('images/video_training.png', 'images/new_technical_training.jpeg')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
