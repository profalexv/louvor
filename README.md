# 🎵 PromptSong - Gerenciador de Louvor Integrado

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Electron](https://img.shields.io/badge/Electron-28.2-47848F?logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://react.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)](https://github.com/pmndrs/zustand)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-green?logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Uma aplicação desktop moderna e robusta para gerenciar músicas, imagens, cronogramas e projeções em tempo real. Construída com **Electron**, **React** e **TypeScript**.

---

## 🚀 Quick Start

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/promptsong.git
cd promptsong

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Inicie em modo desenvolvimento
npm run dev
```

**Pronto!** O app abrirá automaticamente 🎉

---

## 📋 Índice

- [Features](#features)
- [✨ Novidades](#-novidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Desenvolvimento](#desenvolvimento)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Segurança](#segurança)
- [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
- [Testing](#testing)
- [Arquitetura e Padrões](#-arquitetura-e-padrões)
- [Contribução](#contribuição)
- [Licença](#licença)

## ✨ Novidades

### 🎉 Melhorias Recentes (v2.0)

Esta versão traz uma **refatoração completa** da arquitetura:

#### 🏗️ Arquitetura Moderna
- ✅ **Zustand State Management**: Substituiu Context API por stores otimizadas
- ✅ **TypeScript Completo**: Migração progressiva de JavaScript para TypeScript
- ✅ **Database Service**: Novo sistema de banco com IndexedDB e Dexie 3.2
- ✅ **Error Handling**: Classes customizadas de erro com mensagens estruturadas
- ✅ **Logging System**: Sistema de logs centralizado com Pino

#### 🔐 Segurança Reforçada
- ✅ **Context Isolation**: Electron com preload script seguro
- ✅ **IPC Handlers**: Comunicação segura entre processos
- ✅ **Path Whitelisting**: Validação de caminhos do filesystem
- ✅ **Zod Validation**: Validação de schemas em runtime

#### 🧪 Testing & Quality
- ✅ **Vitest 4.0**: Framework de testes moderno
- ✅ **React Testing Library**: Testes de componentes
- ✅ **30+ Test Cases**: Cobertura de stores, services e componentes
- ✅ **CI/CD Pipeline**: GitHub Actions para qualidade contínua

#### 📚 Documentação
- 📖 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Guia de migração Context → Zustand
- 📖 [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - Resumo completo das mudanças
- 📖 [EXAMPLES.md](./EXAMPLES.md) - Exemplos práticos de uso das novas APIs
- 📖 [CONTRIBUTING.md](./CONTRIBUTING.md) - Como contribuir com o projeto
- 📖 [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Padrões e boas práticas

#### 🔥 Breaking Changes
⚠️ **Para usuários migrando da v1.x**:
- Context API foi substituída por Zustand stores
- Hooks como `useFeedback()` agora apontam para stores Zustand
- Database service substituiu `db.js` (compatibilidade mantida temporariamente)
- Veja [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) para detalhes

## ✨ Features

### Gerenciamento de Música
- 🎵 Catálogo completo de músicas com busca avançada
- 📚 Múltiplos álbuns/coleções
- ✏️ Edição e criação de novas músicas
- 📖 Integração com múltiplas versões de Bíblias

### Gerenciamento de Imagens
- 🖼️ Galeria de imagens com lazy loading
- 📁 Organização em álbuns
- 🎯 Projeção em tempo real
- ⚡ Performance otimizada

### Cronogramas e Projeção
- 📅 Criar cronogramas de culto
- ⏱️ Timers e contagens regressivas
- 🎬 Suporte a Google Slides e PowerPoint
- 📺 Projeção em monitor externo

### Utilidades
- 🎰 Sorteio de nomes/números
- 🔔 Notificações do sistema
- ⌨️ Atalhos de teclado globais
- 💾 Persistência de estado com IndexedDB

## 🔒 Segurança

O projeto implementa segurança de ponta com Electron:

- ✅ **Context Isolation** habilitado
- ✅ **Node Integration** desabilitado
- ✅ **Preload Script** com APIs seguras
- ✅ **Whitelist de diretórios** para acesso a arquivos
- ✅ **Validação de dados** com Zod

### Arquitetura de Segurança

```
┌─────────────────────────────────────────────────────────┐
│                    Renderer Process                     │
│  (React/TypeScript - isolado, sem acesso ao sistema)  │
└────────────────────┬──────────────────────────────────┘
                     │ (IPC - comunicação segura)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Preload Script                        │
│  (Bridge seguro com APIs limitadas)                   │
└────────────────────┬──────────────────────────────────┘
                     │ (ipcMain handlers)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Main Process                          │
│  (Node.js - acesso controlado ao sistema)             │
│  ├─ Validação de caminhos (whitelist)                 │
│  ├─ Handlers IPC com permissões                       │
│  └─ Acesso ao filesystem                              │
└─────────────────────────────────────────────────────────┘
```

## 📦 Requisitos

- **Node.js** >= 18.0
- **npm** >= 9.0
- **Electron** >= 28.0

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/promptsong.git
cd promptsong
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure variáveis de ambiente

```bash
cp .env.example .env
```

## 💻 Desenvolvimento

### Iniciar em modo desenvolvimento

```bash
npm run dev
```

Isso iniciará:
- **Vite Dev Server** (http://localhost:5173)
- **Electron** App com auto-reload

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint        # Verifica erros
npm run lint:fix    # Corrige automaticamente
```

### Formatação de Código

```bash
npm run format       # Formata arquivos
npm run format:check # Verifica formatação
```

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia desenvolvimento com auto-reload |
| `npm run build` | Build para produção |
| `npm run preview` | Preview da build de produção |
| `npm run lint` | Verifica código com ESLint |
| `npm run lint:fix` | Corrige erros com ESLint |
| `npm run format` | Formata código com Prettier |
| `npm run format:check` | Verifica formatação |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run test` | Executa testes com Vitest |
| `npm run test:ui` | Testes com interface visual |
| `npm run test:coverage` | Gera relatório de cobertura |
| `npm run validate` | Executa lint + type-check + tests |

## 📁 Estrutura do Projeto

```
promptsong/
├── electron-src/
│   ├── main.js                  # Processo principal Electron
│   └── preload.js               # Script de preload seguro (IPC Bridge)
│
├── src/
│   ├── components/              # Componentes React (.jsx e .tsx)
│   │   ├── Feedback.tsx         # Sistema de notificações (migrado)
│   │   ├── SongManager.jsx      # Gerenciador de músicas
│   │   ├── ImageManager.jsx     # Gerenciador de imagens
│   │   ├── Projector.jsx        # Tela de projeção
│   │   └── ...
│   │
│   ├── stores/                  # Estado global (Zustand)
│   │   ├── appStore.ts          # Store principal (songs, images, UI, feedback)
│   │   └── projectionStore.ts   # Store de projeção (slides, preview, config)
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useFeedback.ts       # Hook de feedback (migrado para Zustand)
│   │   ├── useProjectionZ.ts    # Hooks de projeção (migrados)
│   │   ├── useUIManager.ts      # Wrapper para appStore
│   │   └── ...
│   │
│   ├── services/                # Serviços (lógica de negócio)
│   │   ├── database.ts          # ⭐ Database service (Dexie + TypeScript)
│   │   ├── logger.ts            # Sistema de logging (Pino)
│   │   ├── fileSystem.ts        # Acesso seguro a filesystem
│   │   ├── errorHandler.ts      # Classes de erro customizadas
│   │   └── notifications.ts     # Notificações do sistema
│   │
│   ├── types/                   # Tipos TypeScript globais
│   │   └── index.ts             # Song, Image, Schedule, etc.
│   │
│   ├── utils/                   # Utilitários
│   │   ├── validators.ts        # Schemas Zod (Song, Image, Schedule)
│   │   ├── storage.ts           # LocalStorage com hooks
│   │   ├── keyboardShortcuts.ts # Gerenciador de atalhos
│   │   └── ...
│   │
│   ├── constants/               # Constantes globais
│   │   └── index.ts             # APP_NAME, ROUTES, etc.
│   │
│   ├── __tests__/               # ⭐ Testes (Vitest + RTL)
│   │   ├── stores/
│   │   │   ├── appStore.test.ts
│   │   │   └── projectionStore.test.ts
│   │   ├── services/
│   │   │   └── database.test.ts
│   │   └── components/
│   │       └── Feedback.test.tsx
│   │
│   ├── test/                    # Configuração de testes
│   │   └── setup.ts             # Setup do Vitest
│   │
│   ├── styles/                  # Estilos globais
│   │   └── index.css            # Tailwind CSS
│   │
│   ├── App.jsx                  # Componente raiz
│   ├── main.jsx                 # Entry point (React)
│   └── db.js                    # [DEPRECATED] - Use services/database.ts
│
├── library/                     # Dados do aplicativo
│   ├── bibles/                  # 13+ versões de Bíblias em JSON
│   ├── musics/                  # Coleções (HASD 1996, 2022, etc)
│   │   ├── HASD - 1996/
│   │   ├── HASD - 2022/
│   │   └── ...
│   ├── images/                  # Galeria de imagens
│   │   ├── backgrounds/
│   │   └── covers/
│   └── imports/                 # Importações externas
│
├── .github/
│   └── workflows/
│       └── ci.yml               # ⭐ Pipeline CI/CD
│
├── docs/                        # ⭐ Documentação
│   ├── MIGRATION_GUIDE.md       # Guia Context → Zustand
│   ├── MIGRATION_SUMMARY.md     # Resumo da v2.0
│   ├── EXAMPLES.md              # Exemplos práticos de código
│   ├── CONTRIBUTING.md          # Como contribuir
│   └── BEST_PRACTICES.md        # Padrões de código
│
├── .env                         # Variáveis de ambiente (local)
├── .env.production              # Variáveis de produção
├── .eslintrc.json               # ⭐ Configuração ESLint 10
├── .prettierrc.json             # ⭐ Configuração Prettier 3.8
├── tsconfig.json                # ⭐ Configuração TypeScript 5.9
├── vite.config.mjs              # Configuração Vite 5.2
├── vitest.config.ts             # ⭐ Configuração Vitest 4.0
├── package.json                 # Dependências e scripts
└── README.md                    # Este arquivo
```

**Legenda**: ⭐ = Novo na v2.0

## 🔐 Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Desenvolvimento
NODE_ENV=development
VITE_ENV=development
VITE_API_BASE_URL=http://localhost:5173
ELECTRON_DEV=true

# Produção (em .env.production)
NODE_ENV=production
VITE_ENV=production
```

### Variáveis Disponíveis

| Variável | Descrição | Default |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente (development/production) | development |
| `VITE_ENV` | Ambiente Vite | development |
| `ELECTRON_DEV` | Modo desenvolvimento Electron | true |

## 🧪 Testing

### Executar todos os testes

```bash
npm run test
```

### Executar testes em modo watch

```bash
npm run test -- --watch
```

### Gerar cobertura de testes

```bash
npm run test:coverage
```

### Usar interface visual do Vitest

```bash
npm run test:ui
```

## 🎨 Arquitetura e Padrões

### 🏪 State Management com Zustand

O projeto usa **Zustand** para gerenciamento de estado global. É mais simples e performático que Context API.

#### App Store

```typescript
import { useAppStore } from '@stores/appStore';

function MyComponent() {
  // ✅ Subscribe apenas ao que precisa (evita re-renders)
  const selectedSong = useAppStore((state) => state.selectedSong);
  const showFeedback = useAppStore((state) => state.showFeedback);

  const handleSave = async () => {
    try {
      await saveSong();
      showFeedback({
        message: 'Salvo com sucesso!',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      showFeedback({
        message: 'Erro ao salvar',
        type: 'error',
      });
    }
  };

  return <button onClick={handleSave}>Salvar</button>;
}
```

#### Projection Store

```typescript
import { useProjectionStore } from '@stores/projectionStore';

function Projector({ song }) {
  const sendSlide = useProjectionStore((state) => state.sendSlide);

  const project = () => {
    sendSlide({
      type: 'song',
      content: { title: song.title, lyrics: song.content },
    });
  };

  return <button onClick={project}>Projetar</button>;
}
```

📖 **Mais exemplos**: Veja [EXAMPLES.md](./EXAMPLES.md)

---

### 💾 Database Service

Novo sistema de banco com **Dexie 3.2** e **TypeScript**:

```typescript
import { db } from '@services/database';

// Buscar músicas (com normalização de texto)
const songs = await db.searchSongs('amazing grace', 20);

// Buscar por número
const hymn = await db.findByNumber(123, 'HASD');

// Salvar música
const id = await db.saveSong({
  title: 'Amazing Grace',
  content: 'Amazing grace, how sweet the sound...',
  author: 'John Newton',
  album: 'HASD 1996',
});

// Configurações
await db.setSetting('theme', 'dark');
const theme = await db.getSetting('theme', 'light');
```

**Features**:
- ✅ Normalização de texto (remove acentos, filtra palavras curtas)
- ✅ Migrations versionadas (v1 → v5)
- ✅ Type-safe com TypeScript
- ✅ Timestamps automáticos (createdAt, updatedAt)

---

### 🪝 Custom Hooks

#### Feedback Hook

```typescript
import { useFeedback } from '@hooks/useFeedback';

function SaveButton() {
  const { showFeedback } = useFeedback();

  const handleSave = async () => {
    try {
      await save();
      showFeedback({
        message: 'Salvo!',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      showFeedback({
        message: 'Erro ao salvar',
        type: 'error',
      });
    }
  };

  return <button onClick={handleSave}>Salvar</button>;
}
```

#### Projection Hooks

```typescript
import { useProjection } from '@hooks/useProjectionZ';

function Controls() {
  const { sendSlide, clearScreen, sendPreview } = useProjection();

  return (
    <>
      <button onClick={() => sendSlide({ type: 'song', content: {...} })}>
        Projetar
      </button>
      <button onClick={() => sendPreview({ type: 'song', content: {...} })}>
        Preview
      </button>
      <button onClick={clearScreen}>Limpar</button>
    </>
  );
}
```

---

### 📝 Logging System

Sistema de logging centralizado com `pino`:

```typescript
import { createLogger } from '@services/logger';

const logger = createLogger('MyComponent');

logger.info('User logged in', { userId: 123 });
logger.warn('Rate limit approaching', { requests: 95 });
logger.error('Failed to save', { error: err.message });

// Child logger com contexto adicional
const requestLogger = logger.child({ requestId: 'abc123' });
requestLogger.info('Processing request');
```

**Níveis**: `debug`, `info`, `warn`, `error`

---

### ⚠️ Error Handling

Tratamento de erros consistente com classes customizadas:

```typescript
import { 
  AppError, 
  ValidationError, 
  NotFoundError,
  ErrorHandler 
} from '@services/errorHandler';

// Lançar erros tipados
throw new ValidationError('Invalid email format', { email });
throw new NotFoundError('Song not found', { id: 123 });

// Capturar e tratar
try {
  await loadSong();
} catch (error) {
  const appError = ErrorHandler.handle(error);
  const userMessage = ErrorHandler.getUserMessage(appError);
  
  logger.error('Failed to load song', { error: appError });
  showFeedback({ message: userMessage, type: 'error' });
}
```

**Classes disponíveis**:
- `AppError` - Erro base da aplicação
- `ValidationError` - Dados inválidos
- `NotFoundError` - Recurso não encontrado
- `AccessDeniedError` - Sem permissão
- `NetworkError` - Falha de rede

---

### ✅ Validação com Zod

---

### ✅ Validação com Zod

Schemas com **Zod** para validar dados em runtime:

```typescript
import { 
  validateSong, 
  validateImage, 
  SongSchema,
  ImageSchema 
} from '@utils/validators';

// Validar música
try {
  const validSong = validateSong(jsonData);
  await db.saveSong(validSong);
} catch (error) {
  console.error('Invalid song data:', error);
  throw new ValidationError('Song validation failed', { error });
}

// Validar imagem
try {
  const validImage = validateImage(imageData);
  console.log('Image is valid:', validImage);
} catch (error) {
  throw new ValidationError('Image validation failed');
}

// Usar schemas diretamente
const result = SongSchema.safeParse(data);
if (!result.success) {
  console.error('Validation errors:', result.error.format());
}
```

**Schemas disponíveis**:
- `SongSchema` - Valida estrutura de músicas
- `ImageSchema` - Valida metadados de imagens
- `ScheduleSchema` - Valida cronogramas

---

📖 **Mais exemplos e padrões**: Veja [EXAMPLES.md](./EXAMPLES.md) e [BEST_PRACTICES.md](./BEST_PRACTICES.md)

## 📚 Guia de Contribuição

### Passos para Contribuir

1. **Fork** o repositório
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/promptsong.git`
3. **Crie uma branch** para sua feature: `git checkout -b feature/nova-feature`
4. **Implemente** a feature com testes
5. **Execute os testes**: `npm run test`
6. **Verifique linting**: `npm run lint`
7. **Commit**: `git commit -m 'feat: adiciona nova feature'`
8. **Push**: `git push origin feature/nova-feature`
9. **Abra um Pull Request** no GitHub

### Padrões de Código

- Use **Type-Safe** TypeScript, sem `any`
- Escreva **testes** para novas features
- Siga o estilo enforçado por **Prettier**
- Arquivos dos componentes em **PascalCase** (ex: `MyComponent.tsx`)
- Arquivos de utilidade em **camelCase** (ex: `myUtility.ts`)

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação/styling
- `refactor:` Refatoração sem mudança de funcionalidade
- `test:` Testes
- `perf:` Melhorias de performance

Exemplos:

```bash
git commit -m 'feat: adiciona validação de imagens'
git commit -m 'fix: corrige erro ao carregar músicas'
git commit -m 'docs: atualiza README'
```

## 🐛 Reportar Bugs

Para reportar um bug:

1. Verifique se o bug já foi reportado em [Issues](https://github.com/seu-usuario/promptsong/issues)
2. Se encontrar um duplicado, reaja com 👍
3. Caso contrário, abra uma nova issue com:
   - **Título descritivo**
   - **Sistema operacional e versão**
   - **Passos para reproduzir**
   - **Comportamento esperado vs. atual**
   - **Screenshots/videos** (se aplicável)

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🙏 Créditos e Agradecimentos

- [Electron](https://www.electronjs.org/) - Framework desktop
- [React](https://react.dev/) - Biblioteca UI
- [TypeScript](https://www.typescriptlang.org/) - Segurança de tipos
- [Zustand](https://github.com/pmndrs/zustand) - Estado simplificado
- [Tailwind CSS](https://tailwindcss.com/) - Estilos CSS
- [Vite](https://vitejs.dev/) - Build tool rápido

---

**Desenvolvido com ❤️ pela comunidade**