// Ponto de entrada — inicializa os módulos quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', () => {
  AvantiSearch.init(AvantiConfig.search);
  AvantiMegaMenu.init({ entries: AvantiConfig.menus });
  AvantiDeptScroll.init();
  AvantiCarousel.init(AvantiConfig.carousel);
  AvantiFooterAccordion.init();
});
