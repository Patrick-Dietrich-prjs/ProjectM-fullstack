# ProjectM - Gerenciador de Projetos v1.0.1

Aplicação fullstack para gerenciar projetos e suas tarefas (partes). Backend em Java/Spring Boot e frontend em React + Vite.

## Stack

| Camada                      | Tecnologia              |
| --------------------------- | ----------------------- |
| Linguagem (backend)         | Java 21                 |
| Framework (backend)         | Spring Boot 3           |
| ORM                         | Hibernate 6 / JPA       |
| Banco de dados              | MySQL 8                 |
| Gerenciador de dependências | Maven                   |
| Frontend                    | React + Vite            |
| Roteamento                  | React Router DOM        |
| HTTP Client                 | Axios                   |
| IDE                         | IntelliJ IDEA Community |

## Pré-requisitos

- Java 21 instalado
- Node.js 18+ instalado
- MySQL 8 rodando localmente
- Maven (embutido no IntelliJ ou `./mvnw`)

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone github.com/Patrick-Dietrich-prjs/ProjectM-fullstack

# 2. Configure as credenciais do banco em:
# src/main/resources/application.properties

# 3. Rode o backend
./mvnw spring-boot:run

# 4. Rode o frontend
cd frontend
npm install
npm run dev
```

## Configuração do banco

```sql
CREATE DATABASE projectm;
```

```properties
spring.application.name=projectM-backend

spring.datasource.url=jdbc:mysql://localhost:3306/projectm?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=<SUA_SENHA>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.open-in-view=false
```

## Estrutura de pastas Backend

```
src/main/java/com/patrick/projectM_backend/
├── config/       → configuração de CORS
├── model/        → entidades JPA (Projeto, ParteProjeto)
├── repository/   → interfaces Spring Data JPA
├── service/      → regras de negócio
└── controller/   → endpoints REST
```

## Estrutura de pastas Frontend

```
src/
├── assets/       → imagens e estáticos
├── components/   → MainProjetos, ParteProjeto
├── pages/        → PaginaMainProjetos, PaginaProjeto
├── services/     → ProjetoService, ParteProjetoService, api.js
├── App.jsx       → rotas (React Router)
├── App.css       → estilos dos componentes
└── index.css     → variáveis de tema e estilos globais
```

## Entidades

| Entidade       | Tabela           | Descrição                                    |
| -------------- | ---------------- | -------------------------------------------- |
| `Projeto`      | `projeto`        | Projeto do usuário (nome, editando)          |
| `ParteProjeto` | `projeto_partes` | Tarefa/parte ligada a um projeto (ManyToOne) |

### Relacionamento

```
Projeto 1 ─────── * ParteProjeto
         id_projeto (FK)
```

## Endpoints principais

### Projetos — `/api/projeto`

| Método | URL                          | Descrição              |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/projeto`               | Lista todos os projetos|
| GET    | `/api/projeto/{id}`          | Busca projeto por id   |
| POST   | `/api/projeto`               | Cria um projeto        |
| PUT    | `/api/projeto/{id}`          | Atualiza um projeto    |
| DELETE | `/api/projeto/{id}`          | Remove um projeto      |
| PATCH  | `/api/projeto/{id}/editando` | Alterna modo de edição |

### Partes do projeto — `/api/parteprojeto`

| Método | URL                                     | Descrição                    |
| ------ | --------------------------------------- | ---------------------------- |
| GET    | `/api/parteprojeto`                     | Lista todas as partes        |
| GET    | `/api/parteprojeto/{id}`                | Busca parte por id           |
| GET    | `/api/parteprojeto/projeto/{projetoId}` | Lista partes de um projeto   |
| POST   | `/api/parteprojeto`                     | Cria uma parte               |
| PUT    | `/api/parteprojeto/{id}`                | Atualiza uma parte           |
| DELETE | `/api/parteprojeto/{id}`                | Remove uma parte             |
| PATCH  | `/api/parteprojeto/{id}/concluido`      | Alterna status concluído     |
| PATCH  | `/api/parteprojeto/{id}/editando`       | Alterna modo de edição       |

## Rotas do frontend

| Rota           | Página               | Descrição                         |
| -------------- | -------------------- | --------------------------------- |
| `/`            | `PaginaMainProjetos` | Lista de projetos + criar projeto |
| `/projeto/:id` | `PaginaProjeto`      | Detalhe do projeto e suas tarefas |

## Fluxo da aplicação

1. Usuário cria/visualiza projetos na página inicial
2. Ao clicar em um card, navega para `/projeto/{id}`
3. Na página do projeto, gerencia as partes (tarefas): criar, editar, concluir, excluir
4. Botão "Voltar" retorna à lista de projetos

## Documentação

| Arquivo                                          | Conteúdo                                    |
| ------------------------------------------------ | ------------------------------------------- |
| [docs/arquitetura.md](docs/arquitetura.md)       | Visão geral das camadas e decisões técnicas |
| [docs/banco-de-dados.md](docs/banco-de-dados.md) | Modelagem das tabelas e relacionamentos     |
| [docs/endpoints.md](docs/endpoints.md)           | Lista completa dos endpoints da API         |
| [docs/componentes.md](docs/componentes.md)       | Componentes do frontend                     |
| [docs/telas.md](docs/telas.md)                   | Telas do projeto                            |

## Status do projeto

Versão inicial - Concluída - Gestão de projetos e partes funcionando (CRUD + navegação entre telas)
Em andamento — Uso diário para ajustes de eventuais bugs e aplicação de funcionalidades novas caso necessário.
```
