# Arquitetura do Backend

## Visão geral

O backend segue o padrão de camadas do Spring Boot, separando responsabilidades de forma clara. Cada camada tem um papel bem definido e só se comunica com a camada adjacente.

```
Request HTTP
     ↓
Controller       → recebe a requisição, valida entrada, devolve resposta
     ↓
Service          → aplica as regras de negócio
     ↓
Repository       → acessa o banco de dados via JPA/Hibernate
     ↓
MySQL
```

---

## Camadas

### Controller
- Recebe as requisições HTTP do frontend React
- Expõe os endpoints REST de `Projeto` e `ParteProjeto`
- Chama o Service correspondente
- Devolve a resposta em JSON (`ResponseEntity` quando aplicável)

### Service
- Contém a lógica de negócio (criar, atualizar, alternar status, modo edição)
- Usa `@Transactional` nas operações de escrita
- Chama o Repository para persistir ou consultar dados
- No save de `ParteProjeto`, associa o `Projeto` pelo id antes de gravar

### Repository
- Interface que herda de `JpaRepository`
- Spring Data JPA gera as queries automaticamente
- Exemplo de query derivada: `findByProjetoId(Long projetoId)`

### Model (Entidade)
- Classes Java anotadas com `@Entity`
- Mapeadas para tabelas do MySQL via Hibernate
- Relacionamento: `ParteProjeto` → `@ManyToOne` → `Projeto`

---

## Entidades principais

| Entidade       | Tabela           | Descrição                                      |
| --------------- | ---------------- | ---------------------------------------------- |
| `Projeto`       | `projeto`        | Projeto do usuário (nome, flag editando)       |
| `ParteProjeto`  | `projeto_partes` | Tarefa/parte ligada a um projeto (ManyToOne)   |

---

## Frontend (visão rápida)

```
App (React Router)
 ├── /                → PaginaMainProjetos (lista de projetos)
 └── /projeto/:id     → PaginaProjeto (partes + barra de progresso)
```

O frontend consome a API via Axios (`src/services/`).
