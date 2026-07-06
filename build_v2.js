const fs = require('fs');

function extractMain(html) {
    const start = html.indexOf('<main');
    const end = html.indexOf('</main>') + 7;
    if (start === -1 || end === -1) return '';
    return html.substring(start, end);
}

// 1. templates/collection.liquid
let collectionHtml = fs.readFileSync('our-collection.html', 'utf-8');
let mainCollection = extractMain(collectionHtml);

// Extract the product card (Product Card 1)
const cardStartRegex = /<!-- Product Card 1 -->\s*<a class="group block cursor-pointer" href="#">/;
const cardEndRegex = /<\/a>\s*<!-- Product Card 2 -->/;
const cardStartMatch = mainCollection.match(cardStartRegex);
const cardEndMatch = mainCollection.match(cardEndRegex);

if (cardStartMatch && cardEndMatch) {
    let cardHtml = mainCollection.substring(cardStartMatch.index, cardEndMatch.index + 4);
    // Remove "Product Card 1" comment
    cardHtml = cardHtml.replace(/<!-- Product Card 1 -->\s*/, '');
    
    // Make card dynamic
    cardHtml = cardHtml.replace(/href="#"/, `href="{{ product.url }}"`);
    cardHtml = cardHtml.replace(/src="[^"]+"/, `src="{{ product.featured_image | image_url: width: 600 }}"`);
    cardHtml = cardHtml.replace(/<h3[^>]+>Silk Drape Tunic<\/h3>/, `<h3 class="font-body-md text-body-md text-primary mb-1 group-hover:underline underline-offset-4 decoration-1">{{ product.title }}</h3>`);
    cardHtml = cardHtml.replace(/<p[^>]+>Cream<\/p>/, `{% if product.variants.first.title != 'Default Title' %}<p class="font-label-sm text-label-sm text-on-surface-variant">{{ product.variants.first.title }}</p>{% endif %}`);
    cardHtml = cardHtml.replace(/<span[^>]+>\$420<\/span>/, `<span class="font-body-md text-body-md text-primary">{{ product.price | money }}</span>`);

    let dynamicGrid = `{% paginate collection.products by 12 %}
{% assign products_to_loop = collection.products %}
{% if products_to_loop.size == 0 and collection.handle == blank %}
    {% assign products_to_loop = collections.all.products %}
{% endif %}
{% for product in products_to_loop %}
${cardHtml}
{% else %}
<p>No products found.</p>
{% endfor %}
</div>
{% if paginate.pages > 1 %}
    <div class="mt-16 flex justify-center w-full col-span-full">
        {{ paginate | default_pagination }}
    </div>
{% endif %}
{% endpaginate %}`;

    // Replace the grid content
    const gridStartRegex = /<div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-stack-md">/;
    const gridStartMatch = mainCollection.match(gridStartRegex);
    const gridEndStr = '<div class="mt-stack-lg flex justify-center">';
    
    // Find the end of the grid div
    const gridEndIndex = mainCollection.indexOf(gridEndStr);
    
    if (gridStartMatch && gridEndIndex !== -1) {
        // We replace everything from the start of the grid content to the end of the main tag
        let beforeGrid = mainCollection.substring(0, gridStartMatch.index + gridStartMatch[0].length);
        let afterPagination = mainCollection.substring(gridEndIndex);
        afterPagination = afterPagination.replace(/<div class="mt-stack-lg flex justify-center">[\s\S]*?<\/div>\s*<\/main>/, '</main>');

        let finalMainCollection = `{% layout 'theme' %}\n\n` + beforeGrid + '\n' + dynamicGrid + '\n' + afterPagination;
        fs.writeFileSync('templates/collection.liquid', finalMainCollection);
    }
}

// 2. Static Pages
const pages = [
    { source: 'contact.html', target: 'templates/page.contact.liquid', injectRegex: /(<p>\s*We are here to assist you.*?<\/p>)/s, injectStr: '{{ page.content }}' },
    { source: 'ourstory.html', target: 'templates/page.story.liquid', injectRegex: /(<p class="font-body-lg text-body-lg text-on-surface-variant mt-stack-md max-w-2xl font-light">\s*A dedication to architectural precision and quiet luxury.\s*<\/p>)/, injectStr: '<div class="font-body-lg text-body-lg text-on-surface-variant mt-stack-md max-w-2xl font-light">\n{{ page.content }}\n</div>' },
    { source: 'sustainability.html', target: 'templates/page.sustainability.liquid', injectRegex: /(<p class="font-body-lg text-body-lg text-on-surface-variant mt-12 max-w-lg">\s*We believe true luxury lies in preservation\.\s*Every garment is a testament to architectural precision and ecological responsibility\.\s*<\/p>)/, injectStr: '<div class="font-body-lg text-body-lg text-on-surface-variant mt-12 max-w-lg">\n{{ page.content }}\n</div>' },
    { source: 'privacypolicy.html', target: 'templates/page.privacy.liquid', injectRegex: /(<div class="space-y-stack-md font-body-md text-body-md text-on-surface-variant leading-relaxed">)[\s\S]*?(<\/article>)/, injectStr: '<div class="space-y-stack-md font-body-md text-body-md text-on-surface-variant leading-relaxed [&>h2]:font-headline-md [&>h2]:text-headline-md [&>h2]:text-primary [&>h2]:mb-6 [&>h2]:mt-10 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul]:text-secondary [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-6">\n{{ page.content }}\n</div>\n$2' },
    { source: 'termsofuse.html', target: 'templates/page.terms.liquid', injectRegex: /(<div class="w-full md:w-9\/12 lg:w-3\/4 flex flex-col gap-stack-lg mt-12 md:mt-0">)[\s\S]*?(<\/main>)/, injectStr: '$1\n<div class="prose prose-lg max-w-none text-on-surface-variant [&>h2]:font-headline-md [&>h2]:text-headline-md [&>h2]:text-primary [&>h2]:mb-8 [&>h2]:mt-12 [&>p]:font-body-lg [&>p]:text-body-lg [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:font-body-lg [&>ul]:text-body-lg [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-4 [&>ul]:mt-6">\n{{ page.content }}\n</div>\n</div>\n$2' }
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
