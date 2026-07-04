/**
 * Menus suspensos do cabeçalho ("Todas as Categorias" e "Departamento").
 * Cada painel pode ter um ou mais botões que o controlam; abrir um painel
 * fecha os demais, e todos fecham com Escape ou clique fora.
 */
const AvantiMegaMenu = (() => {
  /**
   * Monta um menu (painel + seus botões) e devolve seus controles.
   * @param {Object} entry Par de seletores { toggleSelector, panelSelector }.
   * @returns {{panel: Element, toggles: Element[], close: Function}|null}
   */
  const buildMenu = (entry) => {
    const panel = document.querySelector(entry.panelSelector);
    const toggles = Array.from(document.querySelectorAll(entry.toggleSelector));
    if (!panel || toggles.length === 0) return null;

    const setOpen = (open) => {
      panel.hidden = !open;
      toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(open)));
    };

    return {
      panel,
      toggles,
      close: () => setOpen(false),
      contains: (target) => panel.contains(target) || toggles.some((t) => t.contains(target)),
      toggle: () => setOpen(panel.hidden)
    };
  };

  /**
   * Inicializa todos os menus do cabeçalho.
   * @param {Object} config Configuração dos menus (AvantiConfig.menus wrapper).
   */
  const init = (config) => {
    const menus = config.entries.map(buildMenu).filter(Boolean);
    if (menus.length === 0) return;

    const closeAllExcept = (current) => {
      menus.forEach((menu) => { if (menu !== current) menu.close(); });
    };

    menus.forEach((menu) => {
      menu.toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
          closeAllExcept(menu);
          menu.toggle();
        });
      });
    });

    document.addEventListener('click', (event) => {
      menus.forEach((menu) => {
        if (!menu.panel.hidden && !menu.contains(event.target)) menu.close();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      menus.forEach((menu) => {
        if (!menu.panel.hidden) {
          menu.close();
          menu.toggles[0].focus();
        }
      });
    });
  };

  return { init };
})();
