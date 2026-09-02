const fs = require('fs');
const path = require('path');

// --- index.html ---
let indexPath = path.join(__dirname, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');

// Hero CTA
index = index.replace(
  /class="([^"]*)text-base lg:text-lg xl:text-base 2xl:text-lg([^"]*)"/g,
  'class="$1text-base sm:text-lg 2xl:text-xl$2"'
);

// Philosophy H2
index = index.replace(
  /class="([^"]*)text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl([^"]*)"/g,
  'class="$1text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl$2"'
);
index = index.replace(
  /class="([^"]*)text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl([^"]*)"/g,
  'class="$1text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl$2"'
);

// Philosophy Cards H3
index = index.replace(
  /class="([^"]*)text-xl sm:text-2xl([^"]*)"/g,
  'class="$1text-2xl sm:text-3xl$2"'
);

// Philosophy Cards P
index = index.replace(
  /class="([^"]*)text-sm sm:text-base([^"]*)"/g,
  'class="$1text-base sm:text-lg 2xl:text-xl$2"'
);

// Philosophy CTA (Vení a formarte)
index = index.replace(
  /class="([^"]*)w-full max-w-md py-4 px-8 border border-interactive-yellow text-interactive-yellow font-heading font-semibold text-base rounded-xl([^"]*)"/g,
  'class="$1w-full max-w-md py-4 px-8 border border-interactive-yellow text-interactive-yellow font-heading font-semibold text-base sm:text-lg 2xl:text-xl rounded-xl$2"'
);

// Services H2
index = index.replace(
  /class="([^"]*)text-3xl sm:text-4xl lg:text-5xl([^"]*)"/g,
  'class="$1text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl$2"'
);

// Services Cards H3
index = index.replace(
  /class="([^"]*)text-xl sm:text-3xl([^"]*)"/g,
  'class="$1text-2xl sm:text-3xl 2xl:text-4xl$2"'
);

// Propuestas Filters
index = index.replace(
  /font-semibold text-sm/g,
  'font-semibold text-base'
);

// Contact CTA
index = index.replace(
  /class="([^"]*)font-bold text-base 2xl:text-lg([^"]*)"/g,
  'class="$1font-bold text-base sm:text-lg 2xl:text-xl$2"'
);

// Contact Subtitle text
index = index.replace(
  /class="([^"]*)text-sm sm:text-base font-semibold([^"]*)"/g,
  'class="$1text-base sm:text-lg font-semibold$2"'
);

// Menu Links Mobile
index = index.replace(
  /class="([^"]*)mobile-link text-text-light text-lg([^"]*)"/g,
  'class="$1mobile-link text-text-light text-xl sm:text-2xl$2"'
);


fs.writeFileSync(indexPath, index, 'utf8');

// --- src/modules/cards.js ---
let cardsPath = path.join(__dirname, 'src', 'modules', 'cards.js');
if (fs.existsSync(cardsPath)) {
  let cards = fs.readFileSync(cardsPath, 'utf8');
  
  // Card H3
  cards = cards.replace(
    /text-xl font-bold/g,
    'text-2xl sm:text-3xl font-bold'
  );
  
  // Card P
  cards = cards.replace(
    /text-sm line-clamp-3/g,
    'text-base sm:text-lg line-clamp-3'
  );
  
  // Card Details
  cards = cards.replace(
    /justify-between text-xs font-body/g,
    'justify-between text-sm sm:text-base font-body'
  );

  fs.writeFileSync(cardsPath, cards, 'utf8');
}

// --- src/modules/modal.js ---
let modalPath = path.join(__dirname, 'src', 'modules', 'modal.js');
if (fs.existsSync(modalPath)) {
  let modal = fs.readFileSync(modalPath, 'utf8');
  
  // Modal Ejes H5
  modal = modal.replace(
    /text-base mb-1/g,
    'text-lg sm:text-xl mb-1'
  );
  
  // Modal Ejes P
  modal = modal.replace(
    /text-sm leading-relaxed/g,
    'text-base leading-relaxed'
  );
  
  // Modal Title H3
  modal = modal.replace(
    /text-2xl sm:text-3xl font-bold/g,
    'text-2xl sm:text-3xl 2xl:text-4xl font-bold'
  );
  
  // Modal Desc P
  modal = modal.replace(
    /text-base leading-relaxed mb-6/g,
    'text-base sm:text-lg leading-relaxed mb-6'
  );
  
  // Modal Details
  modal = modal.replace(
    /space-y-2 text-sm font-body/g,
    'space-y-2 text-base font-body'
  );
  
  // Modal CTA
  modal = modal.replace(
    /font-bold text-sm rounded-xl/g,
    'font-bold text-base sm:text-lg rounded-xl'
  );
  
  fs.writeFileSync(modalPath, modal, 'utf8');
}

console.log('Typography refactor completed successfully.');
