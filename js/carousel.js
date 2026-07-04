/**
 * Renderização e interação dos carrosséis de produtos.
 * Os dados dos cards vêm de AvantiConfig.carousel (js/config.js);
 * este arquivo só contém a lógica de montagem e navegação.
 */
const AvantiCarousel = (() => {
  const BADGE_VARIANT_CLASSES = {
    navy: 'bg-badge-navy text-white',
    teal: 'bg-tag-teal text-tag-teal'
  };

  /**
   * Monta o HTML de um card de produto do carrossel.
   * @param {Object} product Dados do produto (AvantiConfig.carousel.product).
   * @param {'navy'|'teal'} badgeVariant Variante de cor do badge "Novo".
   * @returns {string} Markup do slide.
   */
  const buildSlideHtml = (product, badgeVariant) => `
    <li class="swiper-slide !w-[238px]">
      <article class="relative h-[409px] w-[238px] rounded-[10px] border border-grey-medium bg-white">
        <img src="${product.image}" alt="${product.imageAlt}" class="absolute left-[8px] top-[6px] h-[222px] w-[222px] object-cover" />
        <span class="absolute left-[8px] top-[7px] rounded-[4px] px-[5px] text-[10px] font-bold uppercase leading-[22px] ${BADGE_VARIANT_CLASSES[badgeVariant]}">${product.badgeLabel}</span>

        <h3 class="absolute left-[8px] right-[8px] top-[244px] text-[14px] font-normal capitalize leading-[normal] text-grey-darkest">${product.titleText}</h3>

        <s class="absolute left-[8px] top-[287px] text-[12px] leading-[normal] text-grey-darkest">${product.oldPrice}</s>
        <span class="absolute left-[80px] top-[295px] rounded-[4px] bg-tag-teal px-[8px] py-[4px] text-[11px] font-bold uppercase leading-[12px] text-white underline">${product.discountTag}</span>
        <strong class="absolute left-[8px] top-[303px] text-[16px] font-bold leading-[normal] text-black">${product.price}</strong>
        <p class="absolute left-[8px] top-[329px] text-[12px] leading-[normal] text-grey-darkest">${product.installmentsPrefix}<strong class="font-bold">${product.installmentsValue}</strong></p>

        <button type="button" class="absolute left-[8px] top-[361px] flex h-[40px] w-[222px] items-center justify-center rounded-[8px] bg-primary px-[24px] py-[10px] text-[14px] font-bold leading-[20px] text-white transition-opacity hover:opacity-90">${product.buttonLabel}</button>
      </article>
    </li>`;

  /**
   * Renderiza os slides de um carrossel a partir da configuração.
   * @param {Element} section Elemento com [data-carousel].
   * @param {Object} config Configuração global (AvantiConfig.carousel).
   */
  const renderSlides = (section, config) => {
    const instanceId = section.dataset.carousel;
    const instance = config.instances.find((item) => item.id === instanceId);
    if (!instance) return;

    // No frame de 1920px os 5 cards cabem exatos no container, então não haveria
    // overflow para rolar. Repetimos a sequência (os cards são idênticos no Figma)
    // para que o loop tenha conteúdo real a girar em qualquer largura de tela.
    const variants = [...instance.badgeVariants, ...instance.badgeVariants];
    const wrapper = section.querySelector(config.wrapperSelector);
    wrapper.innerHTML = variants
      .map((variant) => buildSlideHtml(config.product, variant))
      .join('');
  };

  /**
   * Cria a instância Swiper de um carrossel com setas, dots, swipe e teclado.
   * @param {Element} section Elemento com [data-carousel].
   * @param {Object} config Configuração global (AvantiConfig.carousel).
   * @returns {Swiper} Instância criada.
   */
  const createSwiper = (section, config) => {
    return new Swiper(section.querySelector(config.swiperSelector), {
      slidesPerView: 'auto',
      spaceBetween: config.slideGap,
      loop: true,
      watchOverflow: false,
      grabCursor: true,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: {
        prevEl: section.querySelector(config.prevSelector),
        nextEl: section.querySelector(config.nextSelector)
      },
      pagination: {
        el: section.querySelector(config.paginationSelector),
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
        bulletClass: config.bulletClass,
        bulletActiveClass: config.bulletActiveClass
      },
      a11y: {
        prevSlideMessage: config.a11yMessages.prevSlide,
        nextSlideMessage: config.a11yMessages.nextSlide,
        paginationBulletMessage: config.a11yMessages.paginationBullet
      }
    });
  };

  /** Inicializa todos os carrosséis da página. */
  const init = (config) => {
    document.querySelectorAll(config.sectionSelector).forEach((section) => {
      renderSlides(section, config);
      createSwiper(section, config);
    });
  };

  return { init };
})();
