# Telas da Aplicação

Descrição de cada tela, seu propósito e o que o usuário pode fazer nela.

---

## Lista de projetos `/`

**Página:** `PaginaMainProjetos`

**Propósito:** Gerenciar a lista de projetos.

**Conteúdo:**
- Título da aplicação
- Formulário para criar novo projeto
- Grid de cards de projetos (`MainProjetos`)
- Em cada card: nome, barra de progresso, editar e excluir
- Clique no card abre o detalhe do projeto

**Chamadas à API:**
- `GET /api/projeto`
- `POST /api/projeto`
- `PUT /api/projeto/{id}`
- `DELETE /api/projeto/{id}`
- `PATCH /api/projeto/{id}/editando`
- `GET /api/parteprojeto/projeto/{projetoId}` (barra de progresso)

---

## Detalhe do projeto `/projeto/:id`

**Página:** `PaginaProjeto`

**Propósito:** Gerenciar as tarefas (partes) de um projeto específico.

**Conteúdo:**
- Botão voltar para a lista
- Nome do projeto
- Barra de progresso das tarefas
- Formulário para criar nova tarefa
- Lista de tarefas com checkbox, editar e excluir

**Chamadas à API:**
- `GET /api/projeto/{id}`
- `GET /api/parteprojeto/projeto/{projetoId}`
- `POST /api/parteprojeto`
- `PUT /api/parteprojeto/{id}`
- `DELETE /api/parteprojeto/{id}`
- `PATCH /api/parteprojeto/{id}/concluido`
- `PATCH /api/parteprojeto/{id}/editando`

---

## Navegação

```
Lista de projetos (/)
└── clique no card → Detalhe do projeto (/projeto/:id)
    └── botão Voltar → Lista de projetos (/)
```
