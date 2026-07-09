import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def add_services_btn(match):
    return match.group(1) + '\n<a href="services.html" class="btn btn-outline-primary btn-sm mt-auto">Explore More</a>\n</div>'

services_match = re.search(r'<section id="services".*?</section>', content, re.DOTALL)
if services_match:
    services_html = services_match.group(0)
    # The previous python script made the cards structure:
    # <div class="card-body p-4">
    # <h4>...</h4>
    # <p>...</p>
    # </div>
    # We replace card-body p-4 with card-body p-4 d-flex flex-column
    services_html = services_html.replace('class="card-body p-4"', 'class="card-body p-4 d-flex flex-column"')
    
    # We want to match everything inside <div class="card-body ...">...</div> and insert the button before the </div>
    # match.group(1) will capture up to the text before </div>
    services_html = re.sub(r'(<div class="card-body p-4 d-flex flex-column">.*?)(</div>)', add_services_btn, services_html, flags=re.DOTALL)
    content = content.replace(services_match.group(0), services_html)

def add_training_btn(match):
    return match.group(1) + '\n<a href="training.html" class="btn btn-outline-success btn-sm mt-auto">Explore More</a>\n</div>'

training_match = re.search(r'<section id="training".*?</section>', content, re.DOTALL)
if training_match:
    training_html = training_match.group(0)
    # However, wait, did the training cards get wrapped in card-body p-4 by my previous script?
    # Let's check: the training cards previously had `<div class="card ..."><i ...><h4>...`
    # No, wait, in training section my previous script did not apply because the cards didn't have `p-4` in the main wrapper, or maybe they didn't have images.
    # Ah! The training section IN INDEX.HTML originally had NO images! It just had icons!
    # Wait, my previous multi_replace_file_content replaced the icons with images.
    # Let's see if they have `card-body`
    
    if 'class="card-body' in training_html:
        training_html = training_html.replace('class="card-body p-4"', 'class="card-body p-4 d-flex flex-column"')
        training_html = re.sub(r'(<div class="card-body p-4 d-flex flex-column">.*?)(</div>)', add_training_btn, training_html, flags=re.DOTALL)
    else:
        # If they don't have card-body, they are structured like <div class="card h-100 border-0 shadow p-4 w-100">
        training_html = training_html.replace('class="card h-100 border-0 shadow p-4 w-100"', 'class="card h-100 border-0 shadow p-4 w-100 d-flex flex-column"')
        training_html = re.sub(r'(<div class="card h-100 border-0 shadow p-4 w-100 d-flex flex-column">.*?)(</div>)', add_training_btn, training_html, flags=re.DOTALL)
        
    content = content.replace(training_match.group(0), training_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
