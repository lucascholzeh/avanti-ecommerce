/**
 * Abre e fecha o mega menu "Todas as Categorias" do cabeçalho,
 * mantendo o aria-expanded sincronizado e fechando com Escape ou clique fora.
 */
const AvantiMegaMenu = (() => {
  /**
   * Inicializa o mega menu a partir dos seletores configurados.
   * @param {Object} config Configuração do mega menu (AvantiConfig.megaMenu).
   */
  const init = (config) => {
    const toggle = document.querySelector(config.toggleSelector);
    const panel = document.querySelector(config.panelSelector);
    if (!toggle || !panel) return;

    const setOpen = (open) => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setOpen(panel.hidden));

    document.addEventListener('click', (event) => {
      if (panel.hidden) return;
      if (!panel.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
  };

  return { init };
})();
