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

        <h3 class="absolute left-[8px] right-[8px] top-[244px] font-normal capitalize leading-[normal]">
          <span aria-hidden="true" class="text-[12px] font-bold text-grey-dark">${product.titlePrefix.replace('<', '&lt;').replace('>', '&gt;')}</span>
          <span class="text-[14px] text-grey-darkest">${product.titleText}</span>
          <span aria-hidden="true" class="text-[12px] font-bold text-grey-dark">${product.titleSuffix.replace('<', '&lt;').replace('>', '&gt;')}</span>
        </h3>

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

    // Além dos cards visíveis, o Figma prevê algumas posições extras de rolagem
    // (scrollPositions). Acrescentamos esses cards ao final para haver conteúdo
    // real a girar; como os cards são idênticos, repetimos o badge padrão.
    const extra = Array(config.scrollPositions).fill('navy');
    const variants = [...instance.badgeVariants, ...extra];
    const wrapper = section.querySelector(config.wrapperSelector);
    wrapper.innerHTML = variants
      .map((variant) => buildSlideHtml(config.product, variant))
      .join('');
  };

  /**
   * Cria a instância Swiper de um carrossel com swipe, teclado e loop.
   * As setas e a paginação são controladas à parte (setupNavigation) para
   * navegar de forma circular pelas N posições fixas do Figma.
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
      a11y: {
        prevSlideMessage: config.a11yMessages.prevSlide,
        nextSlideMessage: config.a11yMessages.nextSlide
      }
    });
  };

  /**
   * Liga setas e bolinhas a um índice de posição 0..N-1 com wrap circular:
   * ir além da última volta à primeira e vice-versa (a seta esquerda no
   * início leva à última bolinha), como o Figma indica com as 3 bolinhas.
   * @param {Element} section Elemento com [data-carousel].
   * @param {Swiper} swiper Instância do Swiper.
   * @param {Object} config Configuração global (AvantiConfig.carousel).
   */
  const setupNavigation = (section, swiper, config) => {
    const container = section.querySelector(config.paginationSelector);
    const total = config.scrollPositions;
    let position = 0;

    const bullets = Array.from({ length: total }, (_, index) => {
      const bullet = document.createElement('button');
      bullet.type = 'button';
      bullet.className = config.bulletClass;
      bullet.setAttribute('aria-label', config.a11yMessages.paginationBullet.replace('{{index}}', index + 1));
      bullet.addEventListener('click', () => goTo(index));
      container.appendChild(bullet);
      return bullet;
    });

    const render = () => {
      bullets.forEach((bullet, index) => {
        bullet.classList.toggle(config.bulletActiveClass, index === position);
      });
    };

    function goTo(index) {
      position = ((index % total) + total) % total;
      swiper.slideToLoop(position);
      render();
    }

    section.querySelector(config.prevSelector).addEventListener('click', () => goTo(position - 1));
    section.querySelector(config.nextSelector).addEventListener('click', () => goTo(position + 1));

    // Mantém a bolinha certa quando o usuário arrasta ou usa o teclado.
    swiper.on('slideChange', () => {
      position = swiper.realIndex % total;
      render();
    });

    render();
  };

  /** Inicializa todos os carrosséis da página. */
  const init = (config) => {
    document.querySelectorAll(config.sectionSelector).forEach((section) => {
      renderSlides(section, config);
      const swiper = createSwiper(section, config);
      setupNavigation(section, swiper, config);
    });
  };

  return { init };
})();
