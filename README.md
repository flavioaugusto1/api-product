# API Product 📦

Este é um projeto de API para gerenciamento de produtos e usuários, desenvolvido com Node.js, Fastify e Prisma. A API permite criar, atualizar, buscar, deletar e listar produtos, além de gerenciar usuários com autenticação JWT.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução para JavaScript no lado do servidor.
- **Fastify**: Framework web rápido e eficiente para Node.js.
- **Prisma**: ORM para manipulação de banco de dados com suporte a PostgreSQL.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **Zod**: Biblioteca para validação de esquemas e dados.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **Vitest**: Framework de testes para JavaScript/TypeScript.
- **Docker**: Utilizado para configurar o banco de dados PostgreSQL.

## Funcionalidades

### Usuários
- Cadastro de usuários.
- Autenticação de usuários com JWT.

### Produtos
- Criação de produtos.
- Atualização de produtos.
- Busca de produtos por ID.
- Listagem de todos os produtos.
- Pesquisa de produtos com paginação.
- Exclusão de produtos.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- [Docker](https://www.docker.com/) instalado.
- [Git](https://git-scm.com/) instalado.

## Como Baixar e Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/api-product.git
   cd api-product

2. Instale as dependências:
   ```bash
   npm install

3. Configure o banco de dados:
- Certifique-se de que o Docker está rodando.
- Suba o container do PostgreSQL com o comando:
   ```bash
   docker compose up -d


- Crie o banco de dados e aplique as migrações:
   ```bash
   npx prisma migrate dev

4. Configure as variáveis de ambiente:

- Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
  ```bash
  DATABASE_URL=postgresql://docker:docker@localhost5432/api-product
  JWT_SECRET=sua_chave_secreta
  NODE_ENV=dev


5. Rode o servidor:
   ```bash
    npm run dev
  
6. Acesse a API:
- O servidor estará disponível em http://localhost:3333.

## Scripts Disponíveis
- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run test`: Executa os testes automatizados.

## Estrutura do Projeto
- src/controllers: Contém os controladores HTTP para gerenciar as rotas.
- src/use-cases: Contém os casos de uso (lógica de negócios).
- src/repositories: Contém os repositórios para manipulação de dados.
- src/errors: Contém as classes de erros personalizados.
- prisma: Contém o esquema do banco de dados e as migrações.

## Testes
Os testes foram implementados utilizando o Vitest. Para rodar os testes, use o comando:
  ```bash
  npm run test
