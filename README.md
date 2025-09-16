Petfinder API
Bem-vindo à Petfinder API, uma API RESTful robusta construída com Node.js, Express e Prisma para gerir um sistema de adoção de animais de estimação.

📜 Descrição
Esta API fornece uma plataforma completa para utilizadores encontrarem animais para adoção e para administradores gerirem os animais, utilizadores e os processos de adoção. Inclui funcionalidades como autenticação de utilizadores, gestão de perfis, listagem de animais, upload de imagens e um sistema de pedidos de adoção com diferentes níveis de acesso para utilizadores comuns e administradores.

✨ Funcionalidades
Autenticação e Autorização: Sistema de registo e login seguro baseado em tokens JWT, com proteção de rotas e controlo de acesso baseado em funções (Admin vs. Utilizador).

Gestão de Utilizadores: Os administradores podem listar, visualizar detalhes e eliminar utilizadores do sistema. Os utilizadores podem editar as suas próprias informações.

Gestão de Pets: Funcionalidades CRUD completas para os registos dos animais, disponíveis apenas para administradores.

Upload de Imagens: Integração com a Cloudinary para o upload e armazenamento de imagens dos animais, utilizando multer e multer-storage-cloudinary.

Sistema de Adoção: Utilizadores autenticados podem criar e visualizar os seus pedidos de adoção. Administradores podem visualizar todos os pedidos, atualizar o seu estado (Pendente, Aprovado, Rejeitado) e eliminá-los.

Base de Dados Robusta: Utiliza o Prisma como ORM para interagir com uma base de dados PostgreSQL, garantindo segurança e escalabilidade.

🛠️ Tecnologias Utilizadas
Backend: Node.js, Express.js

Base de Dados: PostgreSQL

ORM: Prisma

Autenticação: jsonwebtoken para tokens JWT e bcryptjs para hashing de passwords.

Upload de Ficheiros: multer e cloudinary para armazenamento de imagens na nuvem.

Variáveis de Ambiente: dotenv para gestão de configurações.

🚀 Como Começar
Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

Pré-requisitos
Node.js (versão 18.18 ou superior)

npm (Node Package Manager)

Uma instância de PostgreSQL a correr

Uma conta na Cloudinary

Instalação
Clone o repositório:

Bash

git clone <URL_DO_SEU_REPOSITORIO>
cd petfinder-api
Instale as dependências do projeto:

Bash

npm install
Configure as variáveis de ambiente:
Crie um ficheiro .env na raiz do projeto e preencha com as suas credenciais.

Snippet de código

# URL de conexão do seu banco de dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Porta em que o servidor irá correr
PORT=3000

# Segredos para o JWT
JWT_SECRET=seu-jwt-secret-super-seguro
JWT_EXPIRES_IN=90d

# Credenciais da sua conta Cloudinary
CLOUDINARY_NAME=seu-nome-na-cloudinary
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
Execute as migrações da base de dados:
Este comando irá aplicar o schema da base de dados (schema.prisma) à sua instância do PostgreSQL.

Bash

npx prisma migrate deploy
Inicie o servidor:

Bash

npm start
O servidor estará a funcionar em http://localhost:3000.

📖 Endpoints da API
🔑 Autenticação (/auth)
POST /register: Regista um novo utilizador.

POST /login: Autentica um utilizador e retorna um token JWT.

👤 Utilizadores (/users)
GET /: Lista todos os utilizadores. (Apenas Admin)

GET /:id: Obtém os detalhes de um utilizador específico. (Autenticado)

PUT /:id: Atualiza as informações de um utilizador. (Autenticado)

DELETE /:id: Elimina um utilizador. (Apenas Admin)

🐾 Pets (/pets)
GET /: Lista todos os animais. (Público)

GET /:id: Obtém os detalhes de um animal específico. (Público)

POST /: Adiciona um novo animal. (Apenas Admin)

PUT /:id: Atualiza as informações de um animal. (Apenas Admin)

PATCH /:id: Atualiza a imagem de um animal. (Apenas Admin)

DELETE /:id: Elimina um animal. (Apenas Admin)

❤️ Adoções (/adoptions)
GET /: Lista todos os pedidos de adoção. (Apenas Admin)

GET /:id: Lista os pedidos de adoção de um utilizador específico. (Autenticado)

POST /: Cria um novo pedido de adoção. (Autenticado)

PATCH /:id: Atualiza o estado de um pedido de adoção. (Apenas Admin)

DELETE /:id: Elimina um pedido de adoção. (Autenticado)
