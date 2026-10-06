# Componentes React

Mapa dos componentes da aplicação ProjectM.

---

## Estrutura geral

```
App
├── Routes
│   ├── /              → PaginaMainProjetos
│   └── /projeto/:id   → PaginaProjeto
├── Components
│   ├── MainProjetos      (card de projeto na lista)
│   ├── ParteProjeto      (item de tarefa na lista)
│   └── BarraProgresso    (progresso das tarefas)
└── Services
    ├── api.js
    ├── ProjetoService.js
    └── ParteProjetoService.js
```

---

## Componentes de página

### `PaginaMainProjetos`
Tela inicial com a lista de projetos.
- Formulário para criar novo projeto
- Grid de cards (`MainProjetos`)
- Edição inline do nome do projeto
- Exclusão de projeto
- Clique no card navega para `/projeto/:id`

### `PaginaProjeto`
Detalhe de um projeto e suas tarefas.
- Busca o projeto pelo `id` da URL (`useParams`)
- Lista de partes (`ParteProjeto`)
- Criar, editar, concluir e excluir tarefas
- Barra de progresso
- Botão voltar para `/`

---

## Componentes reutilizáveis

### `MainProjetos`
Card de um projeto na listagem principal.
- Exibe nome do projeto
- Botões de editar e excluir
- Modo edição (input + salvar)
- Clique no card abre a página do projeto
- Pode exibir `BarraProgresso`

### `ParteProjeto`
Item de uma tarefa na lista do projeto.
- Checkbox de concluído
- Texto da descrição
- Modo edição (input + salvar)
- Botões de editar e excluir

### `BarraProgresso`
Indicador de progresso das tarefas de um projeto.
- Recebe o `projeto` e busca as partes na API
- Exibe `<progress>` + contador `concluídas/total`

---

> **Convenção:** Componentes de página ficam em `src/pages/`. Componentes reutilizáveis ficam em `src/components/`.
