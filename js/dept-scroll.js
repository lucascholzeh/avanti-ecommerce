/**
 * Scrollbar customizada da lista de Departamentos do mega menu.
 * A barra nativa é escondida (.no-scrollbar) e desenhamos um trilho fino
 * com um thumb, sincronizado com o scroll da lista. Assim a barra fica
 * idêntica em qualquer navegador/SO: fina, sem setas e começando no topo.
 */
const AvantiDeptScroll = (() => {
  /**
   * Liga um container [data-dept-scroll] à sua barra custom.
   * @param {Element} root Wrapper com a lista e o trilho.
   */
  const setup = (root) => {
    const list = root.querySelector('ul');
    const thumb = root.querySelector('[data-dept-scroll-thumb]');
    const track = root.querySelector('[data-dept-scroll-track]');
    if (!list || !thumb || !track) return;

    // Recalcula o tamanho/posição do thumb a partir do estado de scroll da lista.
    const render = () => {
      const { scrollHeight, clientHeight, scrollTop } = list;
      const overflow = scrollHeight - clientHeight;
      if (overflow <= 0) {
        track.style.display = 'none';
        return;
      }
      track.style.display = '';
      const trackH = track.clientHeight;
      const thumbH = Math.max((clientHeight / scrollHeight) * trackH, 24);
      const maxThumbTop = trackH - thumbH;
      const thumbTop = (scrollTop / overflow) * maxThumbTop;
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    list.addEventListener('scroll', render);
    window.addEventListener('resize', render);

    // Arrastar o thumb rola a lista proporcionalmente.
    let dragStartY = 0;
    let dragStartScroll = 0;
    const onMove = (event) => {
      const overflow = list.scrollHeight - list.clientHeight;
      const maxThumbTop = track.clientHeight - thumb.offsetHeight;
      const delta = event.clientY - dragStartY;
      list.scrollTop = dragStartScroll + (delta / maxThumbTop) * overflow;
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    thumb.addEventListener('mousedown', (event) => {
      event.preventDefault();
      dragStartY = event.clientY;
      dragStartScroll = list.scrollTop;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    // O painel abre com display:none → recalcula quando ele fica visível.
    const panel = root.closest('[data-megamenu], [data-dept-menu]');
    if (panel) {
      new MutationObserver(render).observe(panel, { attributes: true, attributeFilter: ['hidden'] });
    }
    render();
  };

  /** Inicializa todas as listas com scrollbar custom da página. */
  const init = () => {
    document.querySelectorAll('[data-dept-scroll]').forEach(setup);
  };

  return { init };
})();
