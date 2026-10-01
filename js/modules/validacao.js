/* Regras de validação. Funções puras: não tocam no DOM, por isso podem ser testadas no Node.
   Cada regra recebe o valor (e os demais dados do formulário) e devolve
   uma mensagem de erro, ou "" quando o valor é válido. */

export const somenteDigitos = (valor) => String(valor ?? "").replace(/\D/g, "");

export function cpfValido(cpf) {
  const d = somenteDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (let tamanho = 9; tamanho < 11; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(d[i]) * (tamanho + 1 - i);
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(d[tamanho])) return false;
  }
  return true;
}

export function telefoneValido(telefone) {
  const d = somenteDigitos(telefone);
  if (d.length !== 10 && d.length !== 11) return false;
  if (Number(d.slice(0, 2)) < 11) return false;              // DDD inexistente
  return d.length === 10 || d[2] === "9";                    // celular começa com 9
}

export const cepValido = (cep) => somenteDigitos(cep).length === 8 && !/^0{8}$/.test(somenteDigitos(cep));

export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email ?? "").trim());

export function nomeValido(nome) {
  const partes = String(nome ?? "").trim().split(/\s+/);
  return partes.length >= 2 && partes.every((p) => /^[A-Za-zÀ-ÖØ-öø-ÿ']{2,}$/.test(p) || /^(de|da|do|e)$/i.test(p));
}

export function maiorDeIdade(dataISO, hoje = new Date()) {
  const nascimento = new Date(`${dataISO}T00:00:00`);
  if (Number.isNaN(nascimento.getTime())) return false;
  const limite = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
  return nascimento <= limite;
}

const obrigatorio = (valor) => String(valor ?? "").trim() === "";
const doa = (dados) => dados.tipo === "doador" || dados.tipo === "ambos";
const voluntaria = (dados) => dados.tipo === "voluntario" || dados.tipo === "ambos";

/* Uma regra por campo. A ordem das chaves é a ordem de foco no primeiro erro. */
export const regras = {
  nome: (v) => (obrigatorio(v) ? "Informe seu nome completo." : nomeValido(v) ? "" : "Informe nome e sobrenome, usando apenas letras."),
  cpf: (v) => (obrigatorio(v) ? "Informe seu CPF." : cpfValido(v) ? "" : "CPF inválido. Confira os números digitados."),
  nascimento: (v) => (obrigatorio(v) ? "Informe sua data de nascimento." : maiorDeIdade(v) ? "" : "É preciso ter 18 anos ou mais."),
  email: (v) => (obrigatorio(v) ? "Informe seu e-mail." : emailValido(v) ? "" : "Informe um e-mail válido, como nome@exemplo.com."),
  telefone: (v) => (obrigatorio(v) ? "Informe seu telefone com DDD." : telefoneValido(v) ? "" : "Telefone inválido. Use o formato (12) 91234-5678."),
  cep: (v) => (obrigatorio(v) ? "Informe o CEP." : cepValido(v) ? "" : "CEP inválido. Use o formato 00000-000."),
  logradouro: (v) => (obrigatorio(v) ? "Informe a rua ou avenida." : ""),
  numero: (v) => (obrigatorio(v) ? "Informe o número (ou S/N)." : /^(\d+[A-Za-z]?|s\/n)$/i.test(String(v).trim()) ? "" : "Use apenas o número (ex.: 120) ou S/N."),
  bairro: (v) => (obrigatorio(v) ? "Informe o bairro." : ""),
  cidade: (v) => (obrigatorio(v) ? "Informe a cidade." : ""),
  estado: (v) => (obrigatorio(v) ? "Selecione o estado." : ""),
  tipo: (v) => (obrigatorio(v) ? "Escolha como você quer ajudar." : ""),
  valor: (v, dados) => {
    if (!doa(dados)) return "";
    if (obrigatorio(v)) return "Informe o valor mensal da doação.";
    const numero = Number(v);
    return numero >= 10 && numero <= 10000 ? "" : "O valor deve estar entre R$ 10 e R$ 10.000.";
  },
  disponibilidade: (v, dados) => (voluntaria(dados) && obrigatorio(v) ? "Informe sua disponibilidade para o voluntariado." : ""),
  lgpd: (v) => (v ? "" : "É preciso autorizar o uso dos dados para concluir o cadastro."),
};

export function validarCampo(nome, valor, dados = {}) {
  const regra = regras[nome];
  return regra ? regra(valor, dados) : "";
}

/* Valida o formulário inteiro e devolve { campo: "mensagem" } só com os campos inválidos. */
export function validarTudo(dados) {
  const erros = {};
  for (const nome of Object.keys(regras)) {
    const mensagem = regras[nome](dados[nome] ?? "", dados);
    if (mensagem) erros[nome] = mensagem;
  }
  return erros;
}
