/**
 * Dados e seletores da página, mantidos separados da lógica que os consome
 * (js/search.js e js/carousel.js). Textos e itens copiados exatamente do Figma.
 */
const AvantiConfig = {
  search: {
    formSelector: '[data-search-form]',
    inputSelector: '[data-search-input]',
    feedbackSelector: '[data-search-feedback]',
    messages: {
      result: "Você buscou por: '{termo}'",
      emptyField: 'Digite um termo para buscar'
    }
  },

  /**
   * Menus suspensos do cabeçalho. Cada entrada é um par botão→painel:
   * "Todas as Categorias" abre o mega menu; cada "Departamento" abre o
   * painel de categorias. Abrir um fecha os demais.
   */
  menus: [
    { toggleSelector: '[data-megamenu-toggle]', panelSelector: '[data-megamenu]' },
    { toggleSelector: '[data-dept-toggle]', panelSelector: '[data-dept-menu]' }
  ],

  carousel: {
    sectionSelector: '[data-carousel]',
    swiperSelector: '.swiper',
    wrapperSelector: '.swiper-wrapper',
    prevSelector: '[data-carousel-prev]',
    nextSelector: '[data-carousel-next]',
    paginationSelector: '[data-carousel-pagination]',

    /** Espaço entre cards: (1260px do container − 5 × 238px de card) ÷ 4 vãos. */
    slideGap: 17.5,
    bulletClass: 'carousel-bullet',
    bulletActiveClass: 'carousel-bullet-active',

    a11yMessages: {
      prevSlide: 'Produtos anteriores',
      nextSlide: 'Próximos produtos',
      paginationBullet: 'Ir para a página {{index}}'
    },

    /** Produto exibido nos cards, conforme o Figma (os 5 cards são idênticos). */
    product: {
      image: 'assets/images/product-tshirt.png',
      imageAlt: 'Homem vestindo camiseta branca básica',
      badgeLabel: 'Novo',
      titleText: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit',
      oldPrice: 'R$ 100,00',
      discountTag: '10% off',
      price: 'R$79,90',
      installmentsPrefix: 'Ou em até ',
      installmentsValue: '10x de R$ 7,90',
      buttonLabel: 'Comprar'
    },

    /**
     * Um registro por carrossel da página. No Figma o 1º card do 1º carrossel
     * usa o badge teal (texto na mesma cor); todos os demais usam navy.
     */
    instances: [
      { id: 'lancamentos-1', badgeVariants: ['teal', 'navy', 'navy', 'navy', 'navy'] },
      { id: 'lancamentos-2', badgeVariants: ['navy', 'navy', 'navy', 'navy', 'navy'] }
    ]
  }
};
