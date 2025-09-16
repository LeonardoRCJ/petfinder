🐾 Petfinder API
Uma API RESTful completa e robusta para gestão de um sistema de adoção de animais de estimação, construída com Node.js, Express e Prisma.

📜 Sobre o Projeto
A Petfinder API fornece uma plataforma centralizada onde utilizadores podem encontrar animais para adoção e administradores podem gerir todo o ecossistema da aplicação. O sistema conta com autenticação segura, diferentes níveis de permissão, gestão de perfis, catálogo de animais com upload de imagens e um fluxo completo para solicitações de adoção.

✨ Funcionalidades Principais
🔐 Autenticação e Autorização: Sistema de registo e login com tokens JWT e hashing de senhas. As rotas são protegidas e o acesso é controlado por funções (ADMIN vs. USER).

👤 Gestão de Utilizadores:

Admins podem listar, visualizar e eliminar utilizadores.

Utilizadores podem editar as suas próprias informações de perfil.

🐶 Gestão de Pets:

CRUD completo para os registos dos animais (disponível apenas para admins).

Listagem pública para que todos possam ver os animais disponíveis.

🖼️ Upload de Imagens: Integração com a Cloudinary para armazenamento de imagens na nuvem, garantindo performance e escalabilidade.

❤️ Sistema de Adoção:

Utilizadores autenticados podem submeter pedidos de adoção.

Admins podem gerir os pedidos, alterando o seu estado (PENDING, APPROVED, REJECTED).

🛠️ Tecnologias Utilizadas
Este projeto foi construído com as seguintes tecnologias:

Categoria	Tecnologia
Backend	Node.js, Express.js
Base de Dados	PostgreSQL
ORM	Prisma
Autenticação	jsonwebtoken, bcryptjs
Upload de Ficheiros	Multer, Cloudinary
Variáveis de Ambiente	dotenv

Exportar para as Planilhas
🚀 Como Começar
Siga os passos abaixo para configurar e executar o projeto localmente.

1. Pré-requisitos
Node.js (v18.18 ou superior)

npm (Node Package Manager)

Uma instância de PostgreSQL a correr

Uma conta na Cloudinary

2. Instalação
Clone o repositório e instale as dependências:

Bash

# Clone o repositório
git clone <URL_DO_SEU_REPOSITORIO>

# Navegue para o diretório do projeto
cd petfinder-api

# Instale as dependências
npm install
3. Configuração do Ambiente
Crie um ficheiro .env na raiz do projeto e adicione as suas credenciais. Pode usar o exemplo abaixo como modelo:

Snippet de código

# URL de conexão do seu banco de dados PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Porta do servidor
PORT=3000

# Segredos para o JWT
JWT_SECRET=seu-jwt-secret-super-seguro
JWT_EXPIRES_IN=90d

# Credenciais da sua conta Cloudinary
CLOUDINARY_NAME=seu-nome-na-cloudinary
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
4. Base de Dados
Execute as migrações do Prisma para criar as tabelas na sua base de dados:

Bash

npx prisma migrate deploy
5. Iniciar o Servidor
Agora, inicie a aplicação:

Bash

npm start
O servidor estará disponível em http://localhost:3000.

📖 Guia da API (Endpoints)
<details>
<summary><strong>🔑 Autenticação (/auth)</strong></summary>

POST /register: Regista um novo utilizador.

POST /login: Autentica um utilizador e retorna um token JWT.

</details>

<details>
<summary><strong>👤 Utilizadores (/users)</strong></summary>

GET /: Lista todos os utilizadores. (Apenas Admin)

GET /:id: Obtém detalhes de um utilizador. (Autenticado)

PUT /:id: Atualiza um utilizador. (Autenticado)

DELETE /:id: Elimina um utilizador. (Apenas Admin)

</details>

<details>
<summary><strong>🐾 Pets (/pets)</strong></summary>

GET /: Lista todos os animais. (Público)

GET /:id: Obtém detalhes de um animal. (Público)

POST /: Adiciona um novo animal. (Apenas Admin)

PUT /:id: Atualiza um animal. (Apenas Admin)

PATCH /:id: Atualiza a imagem de um animal. (Apenas Admin)

DELETE /:id: Elimina um animal. (Apenas Admin)

</details>

<details>
<summary><strong>❤️ Adoções (/adoptions)</strong></summary>

GET /: Lista todos os pedidos de adoção. (Apenas Admin)

GET /:id: Lista os pedidos de um utilizador. (Autenticado)

POST /: Cria um pedido de adoção. (Autenticado)

PATCH /:id: Atualiza o estado de um pedido. (Apenas Admin)

DELETE /:id: Elimina um pedido. (Autenticado)

</details>
