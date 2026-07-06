/**
 * Accordions do rodapé (somente mobile). No desktop os botões têm
 * pointer-events-none e os painéis ficam sempre visíveis (lg:block),
 * então este módulo só tem efeito prático em telas pequenas.
 */
const AvantiFooterAccordion = (() => {
  const init = () => {
    const sections = document.querySelectorAll('[data-footer-acc]');

    sections.forEach((section) => {
      const toggle = section.querySelector('[data-footer-toggle]');
      const panel = section.querySelector('[data-footer-panel]');
      const chevron = section.querySelector('[data-footer-chevron]');
      if (!toggle || !panel) return;

      toggle.addEventListener('click', () => {
        // No desktop o clique é neutralizado por pointer-events-none; esta guarda
        // evita alternar o estado caso o evento chegue por outro caminho (teclado).
        if (window.matchMedia('(min-width: 1024px)').matches) return;

        const open = panel.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
        if (chevron) {
          // Fechado: seta pra baixo (rotate-90). Aberto: seta pra cima (-rotate-90).
          chevron.classList.toggle('rotate-90', !open);
          chevron.classList.toggle('-rotate-90', open);
        }
      });
    });
  };

  return { init };
})();
