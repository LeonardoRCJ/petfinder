# 🐾 Petfinder API

## Visão Geral

Esta é uma API para uma plataforma de adoção de animais, desenvolvida com Node.js e Express. A API permite o gerenciamento completo de animais (pets), utilizadores e pedidos de adoção, utilizando um sistema de autenticação e autorização baseado em tokens JWT para proteger as rotas.

## Tecnologias Utilizadas
* **Node.js**
* **Express.js:** Para a criação de APIs REST.
* **Prisma:** Como ORM para o acesso e persistência de dados.
* **PostgreSQL:** Como banco de dados.
* **JWT (jsonwebtoken):** Para a geração e validação de tokens de autenticação.
* **Bcrypt.js:** Para a encriptação de senhas.
* **Cloudinary e Multer:** Para o upload e armazenamento de imagens.
* **Dotenv:** Para o gerenciamento de variáveis de ambiente.

## Como Executar o Projeto
1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure o banco de dados e as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do projeto e configure a URL do seu banco de dados PostgreSQL, os segredos do token e as chaves da API da Cloudinary.
    ```properties
    # Configuração do Banco de Dados
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Configuração do Servidor
    PORT=3000

    # Segredos do JWT
    JWT_SECRET=seu-segredo-super-secreto
    JWT_EXPIRES_IN=90d

    # Credenciais da Cloudinary
    CLOUDINARY_NAME=seu-cloud-name
    CLOUDINARY_API_KEY=sua-api-key
    CLOUDINARY_API_SECRET=seu-api-secret
    ```

4.  **Execute as migrações do banco de dados:**
    * Utilize o script `migrate` do `package.json` para criar as tabelas no banco de dados.
    ```bash
    npm run migrate
    ```

5.  **Execute a aplicação:**
    * Utilize o script `start` para iniciar o servidor:
    ```bash
    npm start
    ```

## Endpoints da API

### Autenticação
* **`POST /auth/login`**
    * Realiza o login de um usuário.
* **`POST /auth/register`**
    * Registra um novo usuário.

### Pets
* **`GET /pets`**
    * Retorna a lista de todos os pratos. Acessível a todos.
* **`GET /pets/{id}`**
    * Retorna um prato específico pelo seu ID. Acessível a todos.
* **`POST /pets`**
    * Cria um novo prato. Requer autenticação de administrador.
* **`PUT /pets/{id}`**
    * Atualiza um prato existente. Requer autenticação de administrador.
* **`PATCH /pets/{id}`**
    * Atualiza a imagem de um pet. Requer autenticação de administrador.
* **`DELETE /pets/{id}`**
    * Deleta um prato pelo seu ID. Requer autenticação de administrador.

### Adoções
* **`GET /adoptions`**
    * Retorna a lista de todas as adoções. Requer autenticação de administrador.
* **`GET /adoptions/{id}`**
    * Retorna as adoções de um usuário específico. Requer autenticação.
* **`POST /adoptions`**
    * Cria um novo pedido de adoção. Requer autenticação.
* **`PATCH /adoptions/{id}`**
    * Atualiza o status de uma adoção. Requer autenticação de administrador.
* **`DELETE /adoptions/{id}`**
    * Deleta uma adoção. Requer autenticação.

### Usuários
* **`GET /users`**
    * Retorna a lista de todos os usuários. Requer autenticação de administrador.
* **`GET /users/{id}`**
    * Retorna um usuário específico pelo seu ID. Requer autenticação.
* **`PUT /users/{id}`**
    * Atualiza um usuário existente. Requer autenticação.
* **`DELETE /users/{id}`**
    * Deleta um usuário pelo seu ID. Requer autenticação de administrador.
