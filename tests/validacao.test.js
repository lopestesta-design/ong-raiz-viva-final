/* Testes automatizados das regras de validação e das máscaras.
   Execute com: npm test   (ou: node --test) */
import test from "node:test";
import assert from "node:assert/strict";
import { cpfValido, telefoneValido, cepValido, emailValido, nomeValido, maiorDeIdade, validarCampo, validarTudo } from "../js/modules/validacao.js";
import { mascaraCPF, mascaraTelefone, mascaraCEP } from "../js/modules/mascaras.js";

test("CPF: aceita número válido e rejeita inválidos", () => {
  assert.equal(cpfValido("529.982.247-25"), true);
  assert.equal(cpfValido("52998224725"), true);
  assert.equal(cpfValido("529.982.247-24"), false);   // dígito verificador errado
  assert.equal(cpfValido("111.111.111-11"), false);   // todos os dígitos iguais
  assert.equal(cpfValido("123"), false);
});

test("Telefone: aceita fixo e celular com DDD", () => {
  assert.equal(telefoneValido("(12) 91234-5678"), true);
  assert.equal(telefoneValido("(12) 1234-5678"), true);
  assert.equal(telefoneValido("(12) 81234-5678"), false); // celular precisa começar com 9
  assert.equal(telefoneValido("(05) 91234-5678"), false); // DDD inexistente
  assert.equal(telefoneValido("1234"), false);
});

test("CEP, e-mail e nome", () => {
  assert.equal(cepValido("12000-000"), true);
  assert.equal(cepValido("1200-000"), false);
  assert.equal(emailValido("maria@exemplo.com"), true);
  assert.equal(emailValido("maria@exemplo"), false);
  assert.equal(nomeValido("Maria Silva"), true);
  assert.equal(nomeValido("Maria"), false);
  assert.equal(nomeValido("Maria 2"), false);
});

test("Maioridade: considera a data de hoje informada", () => {
  const hoje = new Date("2026-10-01T12:00:00");
  assert.equal(maiorDeIdade("2008-10-01", hoje), true);   // faz 18 anos hoje
  assert.equal(maiorDeIdade("2008-10-02", hoje), false);  // faz 18 amanhã
  assert.equal(maiorDeIdade("", hoje), false);
});

test("Regras condicionais: valor só é obrigatório para doadores", () => {
  assert.equal(validarCampo("valor", "", { tipo: "voluntario" }), "");
  assert.notEqual(validarCampo("valor", "", { tipo: "doador" }), "");
  assert.notEqual(validarCampo("valor", "5", { tipo: "ambos" }), "");
  assert.equal(validarCampo("valor", "30", { tipo: "doador" }), "");
  assert.notEqual(validarCampo("disponibilidade", "", { tipo: "voluntario" }), "");
});

test("validarTudo: formulário vazio gera erros; formulário completo não gera nenhum", () => {
  assert.ok(Object.keys(validarTudo({})).length >= 10);
  const completo = {
    nome: "Maria Silva", cpf: "529.982.247-25", nascimento: "1990-05-10", email: "maria@exemplo.com",
    telefone: "(12) 91234-5678", cep: "12000-000", logradouro: "Rua A", numero: "10", bairro: "Centro",
    cidade: "Taubaté", estado: "SP", tipo: "voluntario", disponibilidade: "sabado", lgpd: true,
  };
  assert.deepEqual(validarTudo(completo), {});
});

test("Máscaras formatam enquanto a pessoa digita", () => {
  assert.equal(mascaraCPF("52998224725"), "529.982.247-25");
  assert.equal(mascaraCPF("5299"), "529.9");
  assert.equal(mascaraTelefone("12912345678"), "(12) 91234-5678");
  assert.equal(mascaraTelefone("1212345678"), "(12) 1234-5678");
  assert.equal(mascaraCEP("12000000"), "12000-000");
});
