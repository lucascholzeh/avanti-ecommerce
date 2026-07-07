# Avanti E-commerce

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?logo=swiper&logoColor=white)

Landing page de e-commerce desenvolvida como desafio técnico de front-end para o **Innovation Class**.

Reprodução fiel do layout do Figma em **HTML, CSS e JavaScript vanilla**, com busca funcional, mega menu, carrosséis interativos e layout responsivo (desktop e mobile).

## Stack

- **HTML5** semântico
- **Tailwind CSS** — build via CLI, com os tokens do design (cores, tipografia, sombras) em [`tailwind.config.js`](tailwind.config.js)
- **JavaScript vanilla** (ES6+), sem frameworks
- [**Swiper**](https://swiperjs.com/) via CDN para os carrosséis
- **Google Fonts** — Nunito e Nunito Sans

## Como rodar

O CSS já vem compilado e versionado em [`dist/output.css`](dist/output.css), então basta abrir o `index.html` no navegador. É necessária conexão com a internet para as fontes do Google Fonts e o Swiper via CDN.

Para servir localmente (recomendado, evita restrições de `file://`):

```bash
npx serve .
```

## Desenvolvimento

Para alterar estilos é preciso recompilar o Tailwind:

```bash
npm install
npm run watch   # recompila a cada alteração (dev)
npm run build   # build único minificado (produção)
```

## Estrutura

```
├── index.html                   # marcação da página (todas as seções)
├── src/input.css                # diretivas do Tailwind + utilitários custom
├── dist/output.css              # CSS gerado (versionado)
├── js/
│   ├── config.js                # dados e seletores (separados da lógica)
│   ├── search.js                # busca do cabeçalho
│   ├── megamenu.js              # mega menu "Todas as Categorias" e departamentos
│   ├── dept-scroll.js           # scrollbar custom da lista de departamentos
│   ├── carousel.js              # carrosséis de produtos (Swiper)
│   ├── footer-accordion.js      # accordion do rodapé (mobile)
│   └── main.js                  # ponto de entrada / inicialização
├── assets/
│   ├── images/                  # fotos exportadas do Figma
│   └── icons/                   # ícones e logos exportados do Figma
├── docs/
│   └── figma-mobile-specs.md    # medidas do mobile derivadas do Figma
└── tailwind.config.js           # tokens de cor/tipografia/sombra do Figma
```

## Arquitetura

- **Padrão módulo (IIFE):** cada arquivo em `js/` expõe um único objeto (`AvantiSearch`, `AvantiMegaMenu`, `AvantiDeptScroll`, `AvantiCarousel`, `AvantiFooterAccordion`) com um método `init`, evitando poluir o escopo global. [`main.js`](js/main.js) apenas orquestra a inicialização no `DOMContentLoaded`.
- **Dados fora da lógica:** textos, seletores e parâmetros ficam centralizados em [`config.js`](js/config.js). Os módulos não têm strings ou medidas "mágicas" espalhadas — a fonte de verdade é uma só.
- **Marcação data-driven:** a interatividade é ligada por atributos `data-*` (`data-carousel`, `data-megamenu-toggle`, `data-footer-toggle`…), não por classes de estilo, mantendo CSS e comportamento desacoplados.

## Funcionalidades

- **Busca:** o clique na lupa ou a tecla Enter exibem `Você buscou por: '{termo}'` abaixo do campo; um termo vazio mostra `Digite um termo para buscar`. Cada busca substitui a anterior, e a mensagem some ao esvaziar o campo ou clicar fora dele.
- **Mega menu e departamentos:** "Todas as Categorias" abre o mega menu completo (departamentos + categorias + card promo); cada "Departamento" abre o painel de categorias. O item clicado é realçado em azul, abrir um menu fecha os demais, e todos fecham com Escape (devolvendo o foco ao gatilho) ou clique fora. A lista de departamentos usa uma **scrollbar customizada** ([`dept-scroll.js`](js/dept-scroll.js)), idêntica em qualquer navegador.
- **Carrosséis:** Swiper com setas, bullets, arraste e navegação por teclado, em loop circular. A quantidade de bullets segue o mock do Figma (posições de rolagem, não o total de slides). O gap entre cards é responsivo — 2 cards por vez no mobile, 5 no desktop — e a área visível é recortada para mostrar **apenas cards inteiros**, sem "espiadas" na borda. A tag "10% off" é um link navegável apenas no desktop.
- **Rodapé (mobile):** as colunas viram accordions exclusivos (abrir um fecha os outros); no desktop ficam sempre abertas. No desktop as mesmas colunas aparecem lado a lado.

## Acessibilidade

- HTML semântico com landmarks (`header`, `main`, `footer`, `section` com `aria-label`/`aria-labelledby`).
- Estados dos menus e accordions expostos via `aria-expanded`; elementos decorativos marcados com `aria-hidden`.
- Textos de apoio para leitores de tela via `sr-only` (labels dos inputs).
- Navegação por teclado nos carrosséis e mensagens de acessibilidade do Swiper (`prevSlideMessage`, `nextSlideMessage`).
- `Escape` fecha os menus abertos e devolve o foco ao botão que os abriu.

## Decisões de implementação

- **Fidelidade ao Figma:** cores, tipografia, espaçamentos, textos e imagens seguem o design. As tags `<h3>`/`<h4>`/`<h5>` que apareciam no mock foram interpretadas como instrução de formatação (usar o heading correto) e reproduzidas visualmente como marcadores, não como texto a exibir semanticamente. Todos os cards dos carrosséis usam o mesmo badge "Novo" navy.
- **Mobile:** o Figma traz um frame mobile próprio (390×4981), usado como base da implementação — a largura de **390px** foi a referência para medidas, gaps e quebras. As seções empilham abaixo de 1024px seguindo esse frame, enquanto o desktop é preservado pixel a pixel acima do breakpoint. As medidas extraídas do Figma estão documentadas em [`docs/figma-mobile-specs.md`](docs/figma-mobile-specs.md).
- **CSS versionado:** o `dist/output.css` é commitado para que a página abra sem passo de build — conveniente para avaliação, mas qualquer mudança de estilo exige recompilar o Tailwind (ver *Desenvolvimento*).

## Autor

**Lucas Hoffmann**
