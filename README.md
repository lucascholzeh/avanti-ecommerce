# avanti-ecommerce

Desafio técnico de Landing page de e-commerce para o Innovation Class, desenvolvido em HTML, CSS e JavaScript.

Reprodução fiel de layout do Figma com busca funcional e carrosséis interativos, responsiva para desktop e mobile.

## Stack

- HTML5 semântico
- Tailwind CSS (build via CLI, tokens do design no `tailwind.config.js`)
- JavaScript vanilla (ES6+)
- [Swiper](https://swiperjs.com/) via CDN para os carrosséis

## Como rodar

O CSS compilado já está versionado em `dist/output.css`, então basta abrir o `index.html` no navegador (é necessária conexão com a internet para as fontes do Google Fonts e o Swiper via CDN).

Se preferir servir localmente:

```bash
npx serve .
```

## Desenvolvimento

Para alterar estilos é preciso recompilar o Tailwind:

```bash
npm install
npm run watch   # recompila a cada alteração
npm run build   # build único minificado
```

## Estrutura

```
├── index.html
├── src/input.css        # diretivas do Tailwind
├── dist/output.css      # CSS gerado (versionado)
├── js/
│   ├── config.js        # dados e seletores (separados da lógica)
│   ├── search.js        # funcionalidade de busca
│   ├── megamenu.js      # mega menu "Todas as Categorias"
│   ├── carousel.js      # carrosséis (Swiper)
│   └── main.js          # inicialização
├── assets/
│   ├── images/          # fotos exportadas do Figma
│   └── icons/           # ícones e logos SVG exportados do Figma
└── tailwind.config.js   # tokens de cor/tipografia do Figma
```

## Decisões de implementação

- **Fidelidade**: cores, tipografia, espaçamentos, textos e imagens seguem o Figma — inclusive as tags `<h3>`/`<h4>`/`<h5>` que aparecem como texto visível no design e o badge "Novo" do 1º card (texto na mesma cor do fundo, como no mock).
- **Busca**: clique na lupa ou Enter exibem `Você buscou por: '{valor}'` abaixo do campo; cada busca substitui a anterior. Campo vazio mostra um aviso para digitar um termo.
- **Carrosséis**: Swiper via CDN com setas, dots, arraste e teclado. O mock mostra 3 dots estáticos; a paginação implementada reflete as páginas reais do carrossel (em telas largas os 5 cards cabem inteiros, então há menos páginas).
- **Mobile**: o Figma possui apenas o frame desktop (1920px); a versão mobile é uma adaptação com as seções empilhadas abaixo de 1024px, preservando o desktop pixel a pixel.
