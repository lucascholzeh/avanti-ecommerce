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

    /**
     * Abre/fecha o painel. Quando abre, realça em azul (#005CFF) apenas o
     * botão efetivamente clicado (activeToggle); os demais que compartilham
     * o mesmo painel ficam neutros. Ao fechar, limpa todos.
     * @param {boolean} open
     * @param {Element} [activeToggle] Botão que disparou a abertura.
     */
    const setOpen = (open, activeToggle) => {
      panel.hidden = !open;
      toggles.forEach((toggle) => {
        const active = open && toggle === activeToggle;
        toggle.setAttribute('aria-expanded', String(open));
        // Item clicado: azul (#005CFF) + negrito enquanto o painel está aberto.
        toggle.classList.toggle('text-primary', active);
        // O negrito do realce só entra em botões que não são bold por padrão
        // (ex.: "Departamento"). O "Todas as Categorias" já nasce bold (marcado
        // com data-always-bold), então não mexemos nele — senão ao fechar ele
        // perderia o bold original. Testamos a PRESENÇA do atributo (o valor é "").
        if (!toggle.hasAttribute('data-always-bold')) {
          toggle.classList.toggle('font-bold', active);
        }
      });
    };

    return {
      panel,
      toggles,
      close: () => setOpen(false),
      contains: (target) => panel.contains(target) || toggles.some((t) => t.contains(target)),
      toggle: (activeToggle) => setOpen(panel.hidden, activeToggle)
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
          menu.toggle(toggle);
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
