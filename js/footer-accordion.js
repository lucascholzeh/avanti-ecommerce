/**
 * Accordions do rodapé (somente mobile). No desktop os botões têm
 * pointer-events-none e os painéis ficam sempre visíveis (lg:block),
 * então este módulo só tem efeito prático em telas pequenas.
 *
 * Comportamento mobile:
 * - Exclusivo: abrir uma seção fecha as demais.
 * - Clicar num item do painel apenas fecha aquela seção (não navega/pula pro topo).
 * - Clicar fora não fecha nada (o painel aberto permanece).
 */
const AvantiFooterAccordion = (() => {
  const isMobile = () => !window.matchMedia('(min-width: 1024px)').matches;

  const init = () => {
    const sections = Array.from(document.querySelectorAll('[data-footer-acc]'));

    // Aplica o estado (aberto/fechado) a uma seção, mexendo no painel,
    // no aria-expanded do botão e na direção do chevron.
    const setOpen = (section, open) => {
      const toggle = section.querySelector('[data-footer-toggle]');
      const panel = section.querySelector('[data-footer-panel]');
      const chevron = section.querySelector('[data-footer-chevron]');
      if (!toggle || !panel) return;

      panel.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      if (chevron) {
        // Fechado: seta pra baixo (rotate-90). Aberto: seta pra cima (-rotate-90).
        chevron.classList.toggle('rotate-90', !open);
        chevron.classList.toggle('-rotate-90', open);
      }
    };

    sections.forEach((section) => {
      const toggle = section.querySelector('[data-footer-toggle]');
      const panel = section.querySelector('[data-footer-panel]');
      if (!toggle || !panel) return;

      toggle.addEventListener('click', () => {
        // No desktop o clique é neutralizado por pointer-events-none; esta guarda
        // evita alternar o estado caso o evento chegue por outro caminho (teclado).
        if (!isMobile()) return;

        const willOpen = panel.classList.contains('hidden');
        // Exclusivo: ao abrir esta, fecha todas as outras.
        if (willOpen) {
          sections.forEach((other) => {
            if (other !== section) setOpen(other, false);
          });
        }
        setOpen(section, willOpen);
      });

      // Clicar num item do painel (links placeholder #) só fecha o dropdown,
      // sem deixar o href="#" rolar a página pro topo.
      panel.addEventListener('click', (event) => {
        if (!isMobile()) return;
        const link = event.target.closest('a');
        if (!link || !panel.contains(link)) return;
        event.preventDefault();
        setOpen(section, false);
      });
    });
  };

  return { init };
})();
