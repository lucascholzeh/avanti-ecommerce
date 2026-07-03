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
│   ├── carousel.js      # carrosséis (Swiper)
│   └── main.js          # inicialização
├── assets/
│   ├── images/          # fotos exportadas do Figma
│   └── icons/           # ícones e logos SVG exportados do Figma
└── tailwind.config.js   # tokens de cor/tipografia do Figma
```
