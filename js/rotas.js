/* Tabela de rotas: cada página é um objeto { caminho, titulo, render, aposRenderizar }. */
import { home } from "./templates/paginas/home.js";
import { paginaProjetos } from "./templates/paginas/projetos.js";
import { cadastro } from "./templates/paginas/cadastro.js";
import { apoiadores } from "./templates/paginas/apoiadores.js";
import { naoEncontrada } from "./templates/paginas/erro404.js";

export const rotas = [home, paginaProjetos, cadastro, apoiadores];
export { naoEncontrada };
