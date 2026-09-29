# Fullstack ToDo App v0.1.1

API REST desenvolvida em Java com Spring Boot, responsável por toda a lógica de negócio e persistência de dados do aplicativo.

## Stack

| Camada | Tecnologia |
|---|---|
| Linguagem | Java 21 |
| Framework | Spring Boot 3 |
| ORM | Hibernate 6 / JPA |
| Banco de dados | MySQL 8 |
| Gerenciador de dependências | Maven |
| IDE | IntelliJ IDEA Community |

## Pré-requisitos

- Java 21 instalado
- MySQL 8 rodando localmente
- Maven (embutido no IntelliJ)

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Configure as credenciais do banco em:
src/main/resources/application.properties

# 3. Rode o projeto pelo IntelliJ ou via terminal:
./mvnw spring-boot:run
```

A API sobe em: `http://localhost:8080`

## Configuração do banco

Crie o banco de dados antes de rodar o projeto:

```sql
CREATE DATABASE toDo;
```

Arquivo `application.properties`:

```properties
spring.application.name=toDo-backend

spring.datasource.url=jdbc:mysql://localhost:3306/todo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.open-in-view=false

logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

## Estrutura de pastas Backend

```
src/main/java/com/patrick/toDo_backend/
├── config/         → configuração de CORS
├── model/          → entidades JPA e enums
├── repository/     → interfaces de acesso ao banco
├── service/        → lógica de negócio
└── controller/     → endpoints REST
```
## Estrutura de pastas Frontend

```
toDo-fullstack\frontend\src
├── assets/      → Imagens pré carregadas do React + Vite
├── components/  → Componente renderizado na aplicação
├── pages/       → Vazia(Uso futuro)
└── services/    → API
```

## Entidades

| Entidade | Tabela | Descrição |
|---|---|---|
| `ToDo` | `toDo` | Lista de afazeres do usuário |

## Endpoints principais

| Método | URL | Descrição |
|---|---|---|
| GET | `/api/todo` | Lista todos os afazeres |
| POST | `/api/todo` | Cria um afazer |
| PUT | `/api/todo/{id}` | Atualiza um afazer |
| DELETE | `/api/todo/{id}` | Remove um afazer |

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [docs/arquitetura.md](docs/arquitetura.md) | Visão geral das camadas e decisões técnicas |
| [docs/banco-de-dados.md](docs/banco-de-dados.md) | Modelagem das tabelas e relacionamentos |
| [docs/endpoints.md](docs/endpoints.md) | Lista completa dos endpoints da API |
| [docs/decisoes.md](docs/componentes.md) | Registro dos componentes técnicos do projeto |
| [docs/decisoes.md](docs/telas.md) | Registro das telas do projeto |

## Status do projeto

Em andamento - fase inicial
