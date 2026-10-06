# Endpoints da API

Base URL: `http://localhost:8080/api`

---

## Projetos `/projeto`

| Método | Endpoint                   | Descrição                    |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/projeto`                 | Lista todos os projetos      |
| GET    | `/projeto/{id}`            | Busca um projeto por ID      |
| POST   | `/projeto`                 | Cria um novo projeto         |
| PUT    | `/projeto/{id}`            | Atualiza um projeto          |
| DELETE | `/projeto/{id}`            | Remove um projeto            |
| PATCH  | `/projeto/{id}/editando`   | Alterna o modo de edição     |

---

## Partes do projeto `/parteprojeto`

| Método | Endpoint                              | Descrição                         |
| ------ | ------------------------------------- | --------------------------------- |
| GET    | `/parteprojeto`                       | Lista todas as partes             |
| GET    | `/parteprojeto/{id}`                  | Busca uma parte por ID            |
| GET    | `/parteprojeto/projeto/{projetoId}`   | Lista partes de um projeto        |
| POST   | `/parteprojeto`                       | Cria uma nova parte               |
| PUT    | `/parteprojeto/{id}`                  | Atualiza uma parte                |
| DELETE | `/parteprojeto/{id}`                  | Remove uma parte                  |
| PATCH  | `/parteprojeto/{id}/concluido`        | Alterna status concluído          |
| PATCH  | `/parteprojeto/{id}/editando`         | Alterna o modo de edição          |

---

## Convenções

- Todos os endpoints retornam **JSON**
- Datas no formato **ISO 8601**: `yyyy-MM-dd`
- Códigos de resposta:
  - `200` — sucesso
  - `201` — criado com sucesso
  - `204` — removido com sucesso (sem corpo)
  - `400` — dados inválidos
  - `404` — recurso não encontrado
  - `500` — erro interno do servidor

---

> **Como testar:** Use o **Postman** ou **Insomnia** para testar os endpoints antes de conectar ao frontend React.
