/**
 * Renderização e interação dos carrosséis de produtos.
 * Os dados dos cards vêm de AvantiConfig.carousel (js/config.js);
 * este arquivo só contém a lógica de montagem e navegação.
 */
const AvantiCarousel = (() => {
  // No desktop o 1º card do 1º carrossel usa o badge teal com texto na mesma cor
  // (some de propósito, conforme o Figma desktop). No Figma MOBILE, porém, esse
  // mesmo card aparece como "Novo" navy legível — então a variante teal cai para
  // navy no mobile e só vira teal-invisível a partir de lg.
  const BADGE_VARIANT_CLASSES = {
    navy: 'bg-badge-navy text-white',
    teal: 'bg-badge-navy text-white lg:bg-tag-teal lg:text-tag-teal'
  };

  /**
   * Monta o HTML de um card de produto do carrossel.
   * @param {Object} product Dados do produto (AvantiConfig.carousel.product).
   * @param {'navy'|'teal'} badgeVariant Variante de cor do badge "Novo".
   * @returns {string} Markup do slide.
   */
  // Card em layout de fluxo (não absoluto) para escalar naturalmente entre o
  // mobile (181px, Figma 22:2688) e o desktop (238px). As medidas internas
  // acompanham a largura via padding/gap; só a largura do slide muda por breakpoint.
  const buildSlideHtml = (product, badgeVariant) => `
    <li class="swiper-slide !w-[181px] lg:!w-[238px]">
      <article class="flex h-full flex-col rounded-[10px] border border-grey-medium bg-white p-[8px]">
        <div class="relative">
          <img src="${product.image}" alt="${product.imageAlt}" class="aspect-square w-full object-cover" />
          <span class="absolute left-0 top-[1px] rounded-[4px] px-[5px] pr-[12px] text-[10px] font-bold uppercase leading-[22px] lg:pr-[5px] ${BADGE_VARIANT_CLASSES[badgeVariant]}">${product.badgeLabel}</span>
        </div>

        <h3 class="mt-[10px] font-normal capitalize leading-[normal]">
          <span aria-hidden="true" class="text-[12px] font-bold lowercase text-grey-dark">${product.titlePrefix.replace('<', '&lt;').replace('>', '&gt;')}</span>
          <span class="text-[14px] text-grey-darkest">${product.titleText}</span>
          <span aria-hidden="true" class="text-[12px] font-bold lowercase text-grey-dark">${product.titleSuffix.replace('<', '&lt;').replace('>', '&gt;')}</span>
        </h3>

        <div class="mt-[10px] flex items-center ">
          <s class="text-[12px] leading-[normal] text-grey-darkest">${product.oldPrice}</s>
          <span class="mx-auto rounded-[4px] bg-tag-teal px-[8px] py-[4px] text-[11px] font-bold uppercase leading-[12px] text-white no-underline lg:mx-0 lg:underline">${product.discountTag}</span>
        </div>
        <strong class="text-[16px] font-bold leading-[normal] text-black">${product.price}</strong>
        <p class="mt-[4px] text-[12px] leading-[normal] text-grey-darkest">${product.installmentsPrefix}<strong class="font-bold">${product.installmentsValue}</strong></p>

        <button type="button" class="mt-[10px] flex h-[40px] w-full items-center justify-center rounded-[8px] bg-primary px-[24px] py-[10px] text-[14px] font-bold leading-[20px] text-white transition-opacity hover:opacity-90">${product.buttonLabel}</button>
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
  /**
   * Encolhe a largura do .swiper para caber SÓ cards inteiros e o centraliza,
   * de modo que nenhum card fique "espiando" cortado na borda. Como os cards
   * têm largura fixa (!w-[181px]/238px) e o Swiper em 'auto' deixaria o próximo
   * card aparecer parcialmente, limitamos a largura do .swiper ao espaço exato
   * de N cards + (N-1) gaps: o overflow hidden do .swiper recorta o restante e
   * `margin: 0 auto` centraliza a área dentro do container do carrossel. O card
   * seguinte só surge ao navegar para o lado.
   *
   * Mede contra a largura do elemento-pai (container do carrossel), pois é ele
   * que dá o espaço total disponível — o próprio .swiper será estreitado aqui.
   * @param {Element} swiperEl Elemento .swiper (overflow hidden).
   * @param {number} gap Espaço entre cards (config.slideGap).
   */
  const fitWholeCards = (swiperEl, gap) => {
    const firstSlide = swiperEl.querySelector('.swiper-slide');
    if (!firstSlide) return;

    const slideWidth = firstSlide.getBoundingClientRect().width;

    // Mede o espaço REAL disponível sem contaminação: o .swiper (com seus muitos
    // slides) pode esticar o container pai, que não tem overflow contido. Ao
    // ocultá-lo com display:none durante a medição, o container volta à sua
    // largura natural (limitada pelo max-w/padding da section) e lemos o valor
    // correto tanto no desktop quanto no mobile.
    swiperEl.style.display = 'none';
    const available = swiperEl.parentElement.clientWidth;
    swiperEl.style.display = '';
    if (!available) return;
    // Quantos cards + (n-1) gaps cabem inteiros. Pelo menos 1 (se um card for
    // mais largo que a área, mostramos 1 e não deixamos a largura ir a zero).
    const perView = Math.max(1, Math.floor((available + gap) / (slideWidth + gap)));
    const used = Math.min(available, perView * slideWidth + (perView - 1) * gap);

    swiperEl.style.width = `${used}px`;
    swiperEl.style.marginLeft = 'auto';
    swiperEl.style.marginRight = 'auto';
  };

  const createSwiper = (section, config) => {
    const swiperEl = section.querySelector(config.swiperSelector);
    fitWholeCards(swiperEl, config.slideGap);

    const swiper = new Swiper(swiperEl, {
      // 'auto' respeita a largura fixa dos cards; o padding do .swiper (acima)
      // garante que só cards inteiros fiquem na área visível.
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

    // Recalcula ao redimensionar a JANELA (não via evento do próprio Swiper):
    // o nº de cards inteiros e a largura útil mudam com a janela e entre os
    // breakpoints (card 181px ↔ 238px). Ouvir o observer interno do Swiper aqui
    // criaria retroalimentação — alteramos a largura do .swiper, o que dispararia
    // outro resize e poderia travar num valor obsoleto. O window.resize é a
    // fonte única e estável. rAF garante medir só depois de o layout assentar.
    let raf = 0;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        fitWholeCards(swiperEl, config.slideGap);
        swiper.update();
      });
    });

    return swiper;
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
