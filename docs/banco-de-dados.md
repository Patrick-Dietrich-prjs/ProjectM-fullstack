# Banco de Dados

## Tecnologia

- **MySQL 8**
- **Hibernate 6**
- **Spring Data JPA**

---

## Tabelas

### `projeto`

Projetos gerenciados pelo usuário.

| Coluna         | Tipo         | Descrição                |
| -------------- | ------------ | ------------------------ |
| `id`           | BIGINT (PK)  | Identificador único      |
| `nome_projeto` | VARCHAR      | Nome do projeto          |
| `editando`     | BOOLEAN      | Flag de modo edição      |

### `projeto_partes`

Tarefas (partes) de cada projeto.

| Coluna       | Tipo         | Descrição                          |
| ------------ | ------------ | ---------------------------------- |
| `id`         | BIGINT (PK)  | Identificador único                |
| `id_projeto` | BIGINT (FK)  | Referência ao projeto             |
| `descricao`  | VARCHAR      | Texto da tarefa                    |
| `concluido`  | BOOLEAN      | Se a tarefa foi concluída          |
| `editando`   | BOOLEAN      | Flag de modo edição                |
| `criado_em`  | DATE         | Data de criação                    |

---

## Relacionamento

```
projeto (1) ──────── (*) projeto_partes
              id_projeto
```

- Um projeto possui várias partes
- Uma parte pertence a um único projeto
- FK: `projeto_partes.id_projeto` → `projeto.id`

---

## Configuração de conexão

Arquivo: `src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todo?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.open-in-view=false
```

> **Nota:** `ddl-auto=update` faz o Hibernate criar/atualizar as tabelas automaticamente durante o desenvolvimento. Em produção, usar `validate` ou `none`.
