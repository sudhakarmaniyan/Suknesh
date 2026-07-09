import os

files_to_update = ['index.html', 'services.html', 'training.html']

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace industrial consultancy image
    content = content.replace('images/new_industrial_consultancy.jpeg', 'images/new_industrial_documentation.jpeg')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
