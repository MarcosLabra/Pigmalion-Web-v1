export function initHeroText() {
  const textElement = document.getElementById("hero-background-text");
  if (!textElement) return;

  const baseText = `El efecto Pigmalión determina que las expectativas altas de un educador se transforman en una profecía autocumplida. When teachers expect intellectual growth, it occurs. Lorsvque los enseignants s'attendent à uma croissance intellectuelle, cela se produit. Quando os professores esperam o crescimento intelectual, ele acontece. Wenn Lehrkräfte intellektuelles Wachstum erwarten, tritt es ein. 教師が知的成長を期待するとき、それは現実に起こる。当教师期待学生的智力增长时，这种增长就会发生。Rosenthal & Jacobson (1968). Cuando anticipamos el éxito, el desarrollo cognitivo se potencia de forma medible. `;
  
  // Se repite 40 veces para asegurar que cubra toda la pantalla en resoluciones grandes.
  const repeatedText = baseText.repeat(40);
  
  textElement.textContent = repeatedText;
}
