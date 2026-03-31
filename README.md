# 📺 Big Bento Brasil — Sistema de Gerenciamento BBB 26

> Aplicativo mobile de gerenciamento de participantes inspirado no Big Brother Brasil, desenvolvido com React Native (Expo) e JSON Server.

---

## Índice

- [📌 Descrição do Projeto](#-descrição-do-projeto)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [⚙️ Instalação](#️-instalação)
- [▶️ Execução](#️-execução)
- [💡 Explicação da Solução](#-explicação-da-solução)
- [🎥 Vídeo Explicativo](#-vídeo-explicativo)

---

## 📌 Descrição do Projeto

O **Big Bento Brasil** é um aplicativo mobile desenvolvido como projeto prático de CRUD, utilizando uma temática inspirada no reality show Big Brother Brasil. O sistema permite gerenciar participantes de uma edição fictícia do programa (BBB 26), oferecendo funcionalidades completas de criação, leitura, atualização e exclusão de dados.

### O que o sistema resolve

O projeto resolve o problema de gerenciar o ciclo de vida de participantes dentro do programa:

- **Cadastrar** novos participantes com validação completa de dados
- **Acompanhar** o status de cada participante (Na casa, No paredão ou Eliminado)
- **Gerenciar o paredão**, com votação em tempo real e contagem de votos
- **Eliminar** participantes com confirmação do usuário
- **Excluir** participantes do sistema via soft delete (os dados são preservados no banco, apenas marcados como inativos)

A solução foi construída com separação clara entre frontend (React Native) e backend (JSON Server), comunicando-se via API REST.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
| Tecnologia | Descrição |
|---|---|
| React Native | Framework para desenvolvimento mobile multiplataforma |
| Expo | Plataforma que simplifica o desenvolvimento e build do app |
| React Navigation | Gerenciamento de navegação entre telas (Stack Navigator) |
| react-native-safe-area-context | Garante compatibilidade com notch e bordas de tela |

### Backend
| Tecnologia | Descrição |
|---|---|
| JSON Server | Servidor REST fake baseado em arquivo JSON — ideal para prototipagem |
| Node.js | Ambiente de execução do servidor |

[![Skills](https://skillicons.dev/icons?i=react,nodejs,js&theme=light)](https://skillicons.dev)

---

## ⚙️ Instalação

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Aplicativo **Expo Go** no seu celular (Android ou iOS) **ou** um emulador configurado

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/MeuCrud.git
cd MeuCrud
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

> O backend utiliza o `json-server`. Verifique se o arquivo `database.json` está presente na pasta `backend/`.

### 3. Instale as dependências do Frontend

```bash
cd ../frontend/MeuCrud
npm install
```

---

## ▶️ Execução

> **Atenção:** Backend e frontend precisam rodar **simultaneamente** em terminais separados.

### 1. Inicie o Backend (JSON Server)

```bash
cd backend
npx json-server --watch database.json --port 3001
```

O servidor estará disponível em: `http://localhost:3001`

Você verá os seguintes endpoints disponíveis:
```
GET    /participants
POST   /participants
PATCH  /participants/:id
DELETE /participants/:id
```

### 2. Inicie o Frontend (Expo)

Em um **novo terminal**:

```bash
cd frontend/MeuCrud
npx expo start
```

O terminal exibirá um **QR Code**. Escaneie-o com o aplicativo Expo Go no seu celular para abrir o app.

> 💡 **Dica:** Certifique-se de que seu celular e computador estão na **mesma rede Wi-Fi**.

### 3. Configuração da URL da API

Se necessário, atualize o endereço do servidor no arquivo de configuração:

```
frontend/MeuCrud/src/servers/configApi.js
```

```javascript
// Substitua pelo IP local da sua máquina se estiver testando em dispositivo físico
export const API_URL = "http://SEU_IP_LOCAL:3001";
```

Para descobrir seu IP local, execute no terminal:
- **Windows:** `ipconfig`
- **macOS/Linux:** `ifconfig` ou `ip a`

---

## 💡 Explicação da Solução

### Arquitetura

O projeto segue uma arquitetura cliente-servidor simples:

```
[App React Native] ←→ HTTP (fetch) ←→ [JSON Server :3001] ←→ [database.json]
```

### Estrutura de Pastas

```
📂 MeuCrud/
├── 📁 backend/
│   └── database.json          # Banco de dados em JSON
│
└── 📁 frontend/MeuCrud/
    ├── App.js                 # Ponto de entrada + Navegação
    └── 📁 src/
        ├── 📁 components/     # Componentes reutilizáveis
        │   ├── CardParticipant.js
        │   ├── CardParedao.js
        │   ├── ParticipantAvatar.js
        │   ├── StatusBadge.js
        │   ├── SearchBar.js
        │   ├── EmptyState.js
        │   └── LoadingState.js
        ├── 📁 screens/        # Telas do aplicativo
        │   ├── HomeScreen.js
        │   ├── ParedaoScreen.js
        │   └── AddEditScreen.js
        ├── 📁 servers/        # Camada de acesso à API
        │   ├── configApi.js
        │   └── participantsCrud.js
        └── 📁 styles/         # Estilos por componente + tokens globais
            └── globalStyles.js
```

### Como o CRUD foi implementado

Todas as operações com a API estão centralizadas em `participantsCrud.js`, isolando a lógica de negócio da interface:

| Operação | Método HTTP | Endpoint | Descrição |
|---|---|---|---|
| Listar participantes | `GET` | `/participants?isActive=true` | Busca apenas participantes ativos |
| Listar paredão | `GET` | `/participants?isActive=true&status=No paredão` | Filtra por status |
| Criar participante | `POST` | `/participants` | Cria com status inicial "Na casa" |
| Editar participante | `PATCH` | `/participants/:id` | Atualiza apenas dados pessoais |
| Excluir (soft delete) | `PATCH` | `/participants/:id` | Marca `isActive: false` sem apagar |
| Colocar no paredão | `PATCH` | `/participants/:id` | Altera status e zera votos |
| Eliminar | `PATCH` | `/participants/:id` | Muda status para "Eliminado(a)" |
| Votar | `PATCH` | `/participants/:id` | Incrementa o contador de votos |

### Decisões técnicas relevantes

**Soft Delete:** Em vez de deletar o registro, o campo `isActive` é alterado para `false`. Isso preserva o histórico e evita inconsistências nos dados.

**Validações no formulário:** O `AddEditScreen` realiza validações completas antes de qualquer chamada à API, incluindo: nome mínimo de 2 caracteres, sigla de estado válida, idade entre 16 e 100 anos, e máscara de telefone no formato `(XX) XXXXX-XXXX`.

**Componente `Field` externo ao formulário:** Para evitar que o teclado feche a cada caractere digitado (comportamento causado por re-renders do React Native), o componente `Field` foi declarado fora do `AddEditScreen`, impedindo sua remontagem a cada atualização de estado.

**Ordenação e filtragem no frontend:** A lista da `HomeScreen` é ordenada por prioridade de status (Paredão → Na casa → Eliminado) e, em seguida, alfabeticamente. A pesquisa filtra por nome ou estado em tempo real sem requisições adicionais à API.

**Avatar gerado automaticamente:** Participantes sem foto recebem um avatar colorido gerado pela API `ui-avatars.com`, usando uma cor derivada do nome (algoritmo de hash), garantindo consistência visual.

---

## 🎥 Vídeo Explicativo

[Link do Vídeo](https://1drv.ms/v/c/5638522f923fe1ad/IQAhLPpxc1B2Tr9XV4qn-G6tAahs3nfnne-EUOxsYb0ek7k?e=37hegk)

---

Desenvolvido como projeto de CRUD — ETEC Bento Quirino
