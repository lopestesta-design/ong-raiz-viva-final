/* Dados dos projetos sociais. As páginas geram os cartões a partir desta lista. */
export const projetos = [
  {
    id: "hortas",
    titulo: "Hortas Comunitárias",
    texto: "Terrenos ociosos viram hortas cuidadas pelos próprios moradores. O que colhemos abastece as famílias do bairro e o excedente vai para as cestas solidárias.",
    badge: { texto: "Vagas abertas", tipo: "sucesso" },
    detalhes: { Onde: "12 bairros da cidade", Quando: "Mutirões aos sábados, das 8h às 11h", "Quem participa": "Moradores de todas as idades" },
  },
  {
    id: "oficinas",
    titulo: "Oficinas Cozinha Inteira",
    texto: "Aulas práticas de aproveitamento integral dos alimentos, com receitas baratas, nutritivas e que evitam desperdício.",
    badge: { texto: "Inscrições abertas", tipo: "" },
    detalhes: { Onde: "Sede do Instituto", Quando: "Terças e quintas, às 14h", "Quem participa": "Famílias atendidas e voluntários" },
  },
  {
    id: "cestas",
    titulo: "Cestas Solidárias",
    texto: "Cestas com alimentos frescos e itens básicos entregues todo mês para famílias em situação de insegurança alimentar, indicadas pela rede de assistência social.",
    badge: { texto: "Precisa de doações", tipo: "aviso" },
    detalhes: { Onde: "Entregas nos bairros atendidos", Quando: "Primeira sexta-feira de cada mês", "Quem participa": "Doadores, motoristas e voluntários de separação" },
  },
];

export const numeros = [
  { valor: "12", rotulo: "hortas comunitárias ativas" },
  { valor: "850", rotulo: "famílias atendidas por mês" },
  { valor: "140", rotulo: "voluntários e voluntárias" },
  { valor: "6 anos", rotulo: "de atuação" },
];
