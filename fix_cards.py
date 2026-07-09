import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the cards that currently have: <div class="card ... p-4 ...">
# We want to change it to: <div class="card ... overflow-hidden"><img ... class="card-img-top"><div class="card-body p-4">
def replace_card(match):
    card_div = match.group(1)
    # Remove p-4 from the main card wrapper
    card_div = card_div.replace(' p-4 ', ' overflow-hidden ').replace(' p-4"', ' overflow-hidden"')
    
    img_tag = match.group(2)
    
    # Rest of card content
    rest = match.group(3)
    
    # Update img tag to remove rounded mb-3 w-100, add card-img-top and style
    # We use height 250px, object-fit: contain to make them all equal size.
    # Wait, the user specifically wants "full image", meaning object-fit: contain so it's not cropped.
    # But they also want "full grid", which means edge to edge horizontally. 
    # If we use background #f8f9fa or just white, it will look like it's full grid.
    img_tag = re.sub(r'class=".*?"', 'class="card-img-top w-100" style="height: 250px; object-fit: contain; padding: 1rem; background-color: #f8f9fa;"', img_tag)
    
    return f'{card_div}\n{img_tag}\n<div class="card-body p-4">\n{rest}\n</div>\n</div>'

pattern = r'(<div class="card [^"]*?p-4[^"]*?w-100">\s*)(<img [^>]*?>)\s*(.*?)\s*</div>'

new_content = re.sub(pattern, replace_card, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done index.html!')

# Also do it for services.html and training.html
for file in ['services.html', 'training.html']:
    with open(file, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    # The pattern in services/training is slightly different: <div class="card border-0 shadow h-100 p-4 d-flex flex-column">
    # Wait, they have p-4 text-center d-flex flex-column or similar.
    # We can match `p-4` inside card
    pattern2 = r'(<div class="card [^"]*?p-4[^"]*?">\s*)(<img [^>]*?>)\s*(.*?)\s*</div>'
    new_file_content = re.sub(pattern2, replace_card, file_content, flags=re.DOTALL)
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_file_content)
    print(f'Done {file}!')
