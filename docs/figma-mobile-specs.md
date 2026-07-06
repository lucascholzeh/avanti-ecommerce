# Figma Mobile — Specs EXATAS (frame LP avanti 22:2645, 390×4981)

Coordenadas Y ABSOLUTAS no frame (medidas via get_metadata). ORDEM REAL das seções:

| Y topo | Node | Seção | Tam |
|--------|------|-------|-----|
| 0 | 22:2862 | Header | 390×229.76 |
| 231 | 22:2314 | Hero SUPERSALE (Component 14) | 390×306 |
| 593 | 22:2684 | Carrossel Lançamentos (**ÚNICO** — só 1 no mobile!) | 373×426 (x=9) |
| 1075 | 22:2646 | Primeiro banner (img 391×390 + texto) | 391×732 |
| 1863 | 22:2656 | Features/regiões (Group 23837) | 391×717 |
| 2636 | 22:2651 | Segundo banner (img 391×390 + texto) | 391×732 |
| 3424 | 22:2680 | Contato/showroom (Group 2) | 390×449 |
| 3929 | 22:2517 | Newsletter (Group 23789) | 358×330 (x=14) |
| 4299 | 22:2695 | Footer (Frame 71) | 390×666.67 |

## ‼️ CORREÇÕES DE ATENÇÃO (erros que cometi antes)
- **NÃO EXISTE 2º carrossel no mobile.** Só 1 carrossel (Y=593), ANTES do primeiro banner. Remover o segundo no mobile.
- Ordem correta: header → hero → CARROSSEL → banner1 → features → banner2 → contato → newsletter → footer.
- Posições são DESCENTRALIZADAS de propósito. Copiar x/y exatos.

## HEADER (22:1918) 390×229.757
Ver design_context salvo. Badge carrinho: elipse ~21w×26h (achatada vertical). Ver [[avanti-figma-quirks]].
NOVO: usar assets/icons/icon-cart.svg (carrinho c/ rodas) + icon-cart-badge.svg (elipse #005CFF 21.08×20.99) com "2".

## HERO Component 14 (22:2314) 390×306, fundo #E7E7EA
- Imagem: inset-[0_42.31%_0_0] → ocupa da esq até 57.69% (≈225px largura), altura total 306, mix-blend-darken sobre #D9D9D9, object-bottom.
- Bloco texto: centralizado em left calc(50%+87.5px) = x≈282.5 (DESLOCADO À DIREITA). gap 12px, items-center.
  - "super"(Nunito Bold 40px leading40) + "sale"(Nunito Light 40px leading40), EMPILHADOS, uppercase preto.
  - "Selected items up to" Nunito Bold 12px #005CFF uppercase.
  - "50%off" Nunito Bold 32px #005CFF uppercase.
- 3 dots embaixo (Grupo 18057). SEM sombra no mobile. INGLÊS.

## CARROSSEL (22:2684) x=9 y=593 w=373 h=426 — ÚNICO
- Header (Group 23834) y=593: "Lançamentos" x=9 Nunito 20px (w=103); "Button Medium" (Ver mais) x=312 y=594 w=69.8 h=20 → alinhado à DIREITA.
- 2 cards (Componente 371) x=9 e x=199.67, cada w=181.29 h=365, y=631. Gap = 199.67-9-181.29 ≈ 9.4px.
- Dots (Grupo 18057) x=177.79 y=1012 w=36.47 h=7 → CENTRALIZADO embaixo, 3 dots.
- Card: badge NOVO navy (ambos legíveis no mobile), img, "<h3> Lorem..." , R$100 riscado, 10% OFF, R$79,90, "Ou em até 10x...", botão Comprar azul.

## PRIMEIRO BANNER (22:2646) x=-2 y=1075 w=391 h=732
- image (22:2647): x=0 y=0(rel) w=391 h=390 → FULL WIDTH 391×390, object-cover.
- Texto (22:2648): x=24 y=428(rel) w=343 h=266 → margin-left 24px (NÃO centralizado), gap interno.
  - Titulo (22:2649): "Lorem Ipsum" Nunito Bold 24px, w=255 (quebra), tracking .96, uppercase.
  - Parágrafo (22:2650): y=52 dentro do texto, Nunito Regular 14px tracking .7, w=343, com <br><br> no meio.
- gap image→texto: 428-390 = 38px.

## FEATURES / REGIÕES (22:2656) x=-1 y=1863 w=391 h=717, fundo #DEDEDE
- segundo banner img (22:2659): x=19 y=1891(abs) w=349 h=349 → QUADRADA 349×349, x=19 (NÃO full width, margem 19 à esq, ~23 à dir).
- Titulo (22:2660): x=2 y=2261 w=384 h=28 → "Lorem Ipsum" Nunito Bold 20px CENTRALIZADO (w=384 ~ full, text-center).
- 3 pins (Group 23835) x=19 y=2310 w=350 h=242:
  - Círculos (Circulo e Icone) x=19, w=60 h=60, em y=2314 / 2403 / 2488 (gap centros ≈ 89px).
  - map-pin ícone x=34 (15px dentro do círculo), 30×30.
  - Textos x=93 (=19+60+14 gap), w=276, Nunito Regular 12px tracking .6, y=2310/2399/2484 (alinhados ao TOPO de cada círculo, não centro).
- Ordem: IMG topo → título → pins.

## SEGUNDO BANNER (22:2651) x=-2 y=2636 w=391 h=732 — IDÊNTICO ao primeiro banner (img 391×390 + texto x=24).

## CONTATO/SHOWROOM (22:2680) x=0 y=3424 w=390 h=449
- quarto banner img (22:2681): y=3424 h=449 full width, blur 1px.
- banner whapp (22:2682): faixa #005CFF y=3617 h=75 (offset 193px do topo da seção) full width.
- Texto (22:2683): x=2 y=3635 w=386 h=39 → "Entre em contato..." Nunito SemiBold 16px branco center leading1.4.
- Faixa azul NÃO está centralizada verticalmente: começa em y-offset 193 (3617-3424) numa seção de 449 → mais pra cima do centro.

## NEWSLETTER (22:2517) x=14 y=3929 w=358 h=330
- Empilhado: título "Cadastre-se na nossa newsletter" (newsletter em azul), card cinza com 2 inputs, checkbox+Política, botão Cadastrar full-width azul. CONFERE com atual.

## FOOTER (22:2695) x=0 y=4299 w=390 h=666.67
- Frame 70 (bloco cinza #F5F5F5) h=495.67.
  - Grupo 10399 (logo+social) x=98 y=40 w=194: logo AVANTI (Frame14 x=21 w=152 h=27) + redes (Frame x=0 y=67 w=194): instagram x=0, facebook x=59, youtube x=109.4, tiktok x=175.4. Gaps IRREGULARES.
  - Frame 69 (accordions) x=0 y=181 w=390 h=162 → 3 accordions fechados c/ chevron azul + linhas.
  - Pagamentos (Grupo 17899) x=50.8 y=391 w=288.4:
    - Linha1 (Grupo 10397) y=391 h=18.8: amex x=50.8, união32 x=111.8, visa x=170.8, hipercard x=237.8, b(elo) x=306.8 → 5 itens.
    - Linha2 (Grupo 17898) x=83.36 y=431 w=223.29 → 4 itens (paypal, pix, boleto, diners), CENTRALIZADA e mais estreita.
- Group 23793 (bloco branco) x=16 y=535.67 w=358 h=131:
  - Grupo 9962 (selos) x=47 y=634.67 w=295.76: let's-encrypt x=0, vtex-pci x=62.6, linha x=137.4, frame14(avanti) x=161.4, vtex x=242.8.
  - Texto (22:2790): x=16 y=535.67 w=358 h=59 → Lorem CURTO (só ~3 linhas, "...quis nostrud exerci."), Nunito Sans Regular 12px #303030 center leading20. **É MAIS CURTO que o desktop.**

## TOKENS
#6220C1 (cupom), #005CFF (azul), #DDD (bordas), #F5F5F5 (footer bg), #303030 (texto), #DEDEDE (features bg), #E7E7EA (hero bg).

## DECISÕES DO USUÁRIO
- Fidelidade LITERAL: copiar mesmo o que parece errado (descentralizações intencionais).
- Hero mobile: INGLÊS + sem sombra.
- Banners mobile: imagem quadrada full-width + texto (não caneca rotacionada).
