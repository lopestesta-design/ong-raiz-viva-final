/* Camada de acesso ao localStorage.
   Todas as chaves usam um prefixo e todas as operações tratam erros
   (JSON inválido, armazenamento cheio ou bloqueado pelo navegador). */

const PREFIXO = "raizviva:";

export function ler(chave, padrao = null) {
  try {
    const bruto = localStorage.getItem(PREFIXO + chave);
    return bruto === null ? padrao : JSON.parse(bruto);
  } catch {
    return padrao;
  }
}

export function gravar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function remover(chave) {
  try {
    localStorage.removeItem(PREFIXO + chave);
  } catch {
    /* sem armazenamento disponível: nada a fazer */
  }
}
