/* Repositório de apoiadores (doadores e voluntários) guardados no localStorage. */
import { ler, gravar, remover as removerChave } from "../core/storage.js";
import { somenteDigitos } from "../modules/validacao.js";

const CHAVE = "apoiadores";
const CHAVE_RASCUNHO = "rascunho";

export const listar = () => ler(CHAVE, []);

export const cpfJaCadastrado = (cpf) =>
  listar().some((apoiador) => somenteDigitos(apoiador.cpf) === somenteDigitos(cpf));

export function adicionar(dados) {
  const registro = {
    ...dados,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    criadoEm: new Date().toISOString(),
  };
  return gravar(CHAVE, [...listar(), registro]) ? registro : null;
}

export const remover = (id) => gravar(CHAVE, listar().filter((apoiador) => apoiador.id !== id));
export const limpar = () => gravar(CHAVE, []);

/* Rascunho do formulário: guarda o que a pessoa já digitou, para não perder se fechar a aba. */
export const lerRascunho = () => ler(CHAVE_RASCUNHO, null);
export const salvarRascunho = (dados) => gravar(CHAVE_RASCUNHO, dados);
export const apagarRascunho = () => removerChave(CHAVE_RASCUNHO);
