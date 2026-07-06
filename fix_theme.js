const fs = require('fs');
const path = require('path');

// Helper to extract main tag
function extractMain(html) {
    const start = html.indexOf('<main');
    const end = html.indexOf('</main>') + 7;
    if (start === -1 || end === -1) return '';
    return html.substring(start, end);
}

// 1. Process Collection Filters
let collectionLiquid = fs.readFileSync('sections/main-collection.liquid', 'utf-8');
const filterLayout = `
        {%- for filter in collection.filters -%}
          <div>
            <h3 class="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-widest">{{ filter.label }}</h3>
            
            {%- if filter.type == 'list' -%}
              {%- if filter.label == 'Size' or filter.label == 'Ukuran' -%}
                <div class="flex flex-wrap gap-2">
                  {%- for filter_value in filter.values -%}
                    <label class="cursor-pointer relative">
                      <input type="checkbox" name="{{ filter_value.param_name }}" value="{{ filter_value.value }}" class="sr-only peer" {% if filter_value.active %}checked{% endif %} onchange="this.form.submit()">
                      <span class="w-10 h-10 border flex items-center justify-center font-label-sm text-label-sm transition-colors {% if filter_value.active %}border-primary text-primary bg-surface-variant{% else %}border-outline-variant text-on-surface-variant hover:border-primary{% endif %} peer-checked:border-primary peer-checked:text-primary peer-checked:bg-surface-variant">{{ filter_value.label }}</span>
                    </label>
                  {%- endfor -%}
                </div>
              {%- elsif filter.label == 'Color' or filter.label == 'Colour' or filter.label == 'Warna' -%}
                <div class="flex flex-wrap gap-3">
                  {%- for filter_value in filter.values -%}
                    <label class="cursor-pointer relative">
                      <input type="checkbox" name="{{ filter_value.param_name }}" value="{{ filter_value.value }}" class="sr-only peer" {% if filter_value.active %}checked{% endif %} onchange="this.form.submit()">
                      <span aria-label="{{ filter_value.label }}" class="block w-6 h-6 rounded-full border border-outline-variant focus:outline-none ring-offset-background transition-all peer-checked:ring-1 peer-checked:ring-primary peer-checked:ring-offset-2" style="background-color: {{ filter_value.label | downcase | replace: ' ', '' }};"></span>
                    </label>
                  {%- endfor -%}
                </div>
              {%- else -%}
                <ul class="space-y-3">
                  {%- for filter_value in filter.values -%}
                    <li>
                      <label class="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" name="{{ filter_value.param_name }}" value="{{ filter_value.value }}" class="form-checkbox text-primary border-outline-variant focus:ring-primary rounded-sm" {% if filter_value.active %}checked{% endif %} onchange="this.form.submit()">
                        <span class="font-body-md text-body-md transition-colors {% if filter_value.active %}text-primary{% else %}text-on-surface-variant group-hover:text-primary{% endif %}">{{ filter_value.label }}</span>
                      </label>
                    </li>
                  {%- endfor -%}
                </ul>
              {%- endif -%}
            {%- endif -%}
            
            {%- if filter.type == 'price_range' -%}
              <div class="flex items-center gap-2">
                <div class="relative w-full">
                  <span class="absolute left-2 top-1/2 -translate-y-1/2 font-label-sm text-on-surface-variant">{{ cart.currency.symbol }}</span>
                  <input type="number" name="{{ filter.min_value.param_name }}" 
                         {% if filter.min_value.value %}value="{{ filter.min_value.value | money_without_currency | replace: ',', '' }}"{% endif %} 
                         placeholder="0" min="0" max="{{ filter.range_max | money_without_currency | replace: ',', '' }}"
                         class="w-full bg-transparent border border-outline-variant focus:border-primary focus:ring-0 pl-6 py-2 font-body-md text-primary"
                         onchange="this.form.submit()">
                </div>
                <span class="text-on-surface-variant">-</span>
                <div class="relative w-full">
                  <span class="absolute left-2 top-1/2 -translate-y-1/2 font-label-sm text-on-surface-variant">{{ cart.currency.symbol }}</span>
                  <input type="number" name="{{ filter.max_value.param_name }}" 
                         {% if filter.max_value.value %}value="{{ filter.max_value.value | money_without_currency | replace: ',', '' }}"{% endif %} 
                         placeholder="{{ filter.range_max | money_without_currency | replace: ',', '' }}" min="0" max="{{ filter.range_max | money_without_currency | replace: ',', '' }}"
                         class="w-full bg-transparent border border-outline-variant focus:border-primary focus:ring-0 pl-6 py-2 font-body-md text-primary"
                         onchange="this.form.submit()">
                </div>
              </div>
            {%- endif -%}
          </div>
        {%- endfor -%}
`;
const newCollectionLiquid = collectionLiquid.replace(/{%- for filter in collection\.filters -%}[\s\S]*?{%- endfor -%}/, filterLayout.trim());
fs.writeFileSync('sections/main-collection.liquid', newCollectionLiquid);

// 2. Process Static Pages
const pages = [
    { source: 'contact.html', target: 'templates/page.contact.liquid', injectRegex: /(<p>\s*We are here to assist you.*?<\/p>)/, injectStr: '{{ page.content }}' },
    { source: 'ourstory.html', target: 'templates/page.story.liquid', injectRegex: /(<p>\s*A dedication to architectural precision.*?<\/p>)/, injectStr: '{{ page.content }}' },
    { source: 'sustainability.html', target: 'templates/page.sustainability.liquid', injectRegex: /(<p class="font-body-lg text-body-lg text-on-surface-variant mt-12 max-w-lg">\s*We believe true luxury lies in preservation.*?<\/p>)/, injectStr: '{{ page.content }}' },
    { source: 'privacypolicy.html', target: 'templates/page.privacy.liquid', injectRegex: /(<div class="space-y-stack-md font-body-md text-body-md text-on-surface-variant leading-relaxed">)[\s\S]*?(<\/article>)/, injectStr: '$1\n      {{ page.content }}\n    </div>\n  $2' },
    { source: 'termsofuse.html', target: 'templates/page.terms.liquid', injectRegex: /(<div class="space-y-stack-md font-body-md text-body-md text-on-surface-variant leading-relaxed">)[\s\S]*?(<\/article>)/, injectStr: '$1\n      {{ page.content }}\n    </div>\n  $2' }
];

pages.forEach(p => {
    let html = fs.readFileSync(p.source, 'utf-8');
    let main = extractMain(html);
    
    // specifically for contact page form action
    if(p.source === 'contact.html') {
        main = main.replace(/<form action="#" class="w-full max-w-lg" method="POST">[\s\S]*?<\/form>/, `{% form 'contact', class: 'w-full max-w-lg' %}
            {% if form.posted_successfully? %}
              <p class="font-body-md text-green-700 bg-green-50 p-4 border border-green-200 mb-6">Thanks for contacting us. We'll get back to you as soon as possible.</p>
            {% endif %}
            {% if form.errors %}
              <div class="font-body-md text-red-700 bg-red-50 p-4 border border-red-200 mb-6">
                {{ form.errors | default_errors }}
              </div>
            {% endif %}
            <div class="mb-6">
                <label class="font-label-sm uppercase tracking-widest text-primary block mb-2" for="name">Name</label>
                <input class="border-0 border-b border-outline-variant/50 focus:border-primary focus:outline-none bg-transparent w-full py-2 font-body-md text-primary transition-colors focus:ring-0 px-0" id="name" name="contact[name]" required="" type="text" value="{% if form.name %}{{ form.name }}{% elsif customer %}{{ customer.name }}{% endif %}"/>
            </div>
            <div class="mb-6">
                <label class="font-label-sm uppercase tracking-widest text-primary block mb-2" for="email">Email</label>
                <input class="border-0 border-b border-outline-variant/50 focus:border-primary focus:outline-none bg-transparent w-full py-2 font-body-md text-primary transition-colors focus:ring-0 px-0" id="email" name="contact[email]" required="" type="email" value="{% if form.email %}{{ form.email }}{% elsif customer %}{{ customer.email }}{% endif %}"/>
            </div>
            <div class="mb-8">
                <label class="font-label-sm uppercase tracking-widest text-primary block mb-2" for="message">Message</label>
                <textarea class="border-0 border-b border-outline-variant/50 focus:border-primary focus:outline-none bg-transparent w-full py-2 font-body-md text-primary transition-colors resize-none focus:ring-0 px-0" id="message" name="contact[body]" required="" rows="1">{% if form.body %}{{ form.body }}{% endif %}</textarea>
            </div>
            <div>
                <button class="bg-primary text-on-primary font-label-sm uppercase tracking-widest py-4 px-12 rounded-none hover:opacity-80 transition-opacity w-full md:w-auto" type="submit">
                    Send Message
                </button>
            </div>
        {% endform %}`);
    }

    // Inject page content
    main = main.replace(p.injectRegex, p.injectStr);
    
    // Prepend theme layout
    let finalCode = `{% layout 'theme' %}\n\n` + main;
    fs.writeFileSync(p.target, finalCode);
});

// 3. Fix Footer links
let footer = fs.readFileSync('sections/footer.liquid', 'utf-8');
footer = footer.replace(/href="[^"]*pages\/our-story[^"]*"/g, 'href="/pages/our-story"');
footer = footer.replace(/href="[^"]*pages\/sustainability[^"]*"/g, 'href="/pages/sustainability"');
footer = footer.replace(/href="[^"]*pages\/contact[^"]*"/g, 'href="/pages/contact"');
footer = footer.replace(/href="[^"]*pages\/privacy-policy[^"]*"/g, 'href="/pages/privacy-policy"');
footer = footer.replace(/href="[^"]*pages\/terms-of-service[^"]*"/g, 'href="/pages/terms-of-use"');
// Wait, my previous footer might have different hrefs. I will just rewrite the links explicitly.
fs.writeFileSync('sections/footer.liquid', footer);
