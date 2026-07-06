/**
 * Funcionalidade de busca do cabeçalho.
 * O submit do formulário cobre tanto o clique na lupa quanto a tecla Enter;
 * cada busca substitui a mensagem anterior (não é um histórico acumulado).
 */
const AvantiSearch = (() => {
  /**
   * Inicializa a busca a partir dos seletores e mensagens configurados.
   * @param {Object} config Configuração da busca (AvantiConfig.search).
   */
  const init = (config) => {
    const form = document.querySelector(config.formSelector);
    if (!form) return;

    const input = form.querySelector(config.inputSelector);
    const feedback = form.querySelector(config.feedbackSelector);

    const clearFeedback = () => {
      feedback.textContent = '';
      feedback.hidden = true;
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const term = input.value.trim();
      feedback.textContent = term
        ? config.messages.result.replace('{termo}', term)
        : config.messages.emptyField;
      feedback.hidden = false;
    });

    // Esvaziar o campo (inclusive pelo "x" do type=search) remove a mensagem,
    // para que a busca anterior não fique "presa" na tela depois de sair.
    input.addEventListener('input', () => {
      if (input.value.trim() === '') clearFeedback();
    });

    // Clicar fora do campo de busca também dispensa a mensagem: a busca
    // anterior não deve permanecer visível depois que o usuário sai do campo.
    document.addEventListener('click', (event) => {
      if (!feedback.hidden && !form.contains(event.target)) clearFeedback();
    });
  };

  return { init };
})();
