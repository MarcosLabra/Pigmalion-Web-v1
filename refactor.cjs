const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add preconnect
content = content.replace(
  '<link\n      rel="stylesheet"\n      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"\n    />',
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link\n      rel="stylesheet"\n      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"\n    />'
);

// 2. Add aria to button
content = content.replace(
  'id="menu-btn"\n          aria-label="Abrir menú"\n          class="text-text-light focus:outline-none md:hidden',
  'id="menu-btn"\n          aria-label="Abrir menú"\n          aria-expanded="false"\n          aria-controls="mobile-menu"\n          class="text-text-light focus:outline-none md:hidden'
);

// 3. Add <main>
content = content.replace(
  '</header>\n\n    <!-- Hero Section',
  '</header>\n\n    <main>\n    <!-- Hero Section'
);

// 4. Close </main>
content = content.replace(
  '</section>\n    <!-- Footer Section',
  '</section>\n    </main>\n    <!-- Footer Section'
);

// 5. Add aria to modal
content = content.replace(
  'id="modal-propuesta"\n        class="fixed inset-0 z-50 hidden',
  'id="modal-propuesta"\n        role="dialog"\n        aria-modal="true"\n        aria-labelledby="modal-title"\n        class="fixed inset-0 z-50 hidden'
);

// 6. Replace massive hero text
const heroRegex = /<p\s+class="text-text-light\/10 font-body text-xs md:text-sm leading-loose tracking-widest text-left w-full h-full text-pretty break-words pl-2"\s*>[\s\S]*?<\/p>/;
content = content.replace(
  heroRegex,
  '<p id="hero-background-text" class="text-text-light/10 font-body text-xs md:text-sm leading-loose tracking-widest text-left w-full h-full text-pretty break-words pl-2"></p>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('index.html updated successfully.');
