# 📋 Changelog

## [v2.2.0] - 2026-02-27

### 🎉 Phase 5 - TypeScript Component Migration (Wave 1)

Migração dos 4 componentes principais do SongManager para TypeScript.

---

### ✨ Components Migrated to TypeScript

#### 🔷 Header.tsx
- Type-safe component with React.FC
- Typed event handlers
- Accessibility improvements (aria-labels)
- Hover effects and transitions

#### 🔷 Settings.tsx  
- `SettingsProps` interface
- Type union for tabs
- Optional props handling
- Tab navigation type-safe

#### 🔷 MainView.tsx
- `MainViewProps` interface
- Type union for tab navigation
- Readonly TABS constant
- Fixed Slide structure for projectionStore

#### 🔷 SongControl.tsx
- Complete `Song` interface
- Typed refs (`HTMLAudioElement`)
- Helper function with types
- Keyboard navigation support
- Disabled states based on audio availability

### 🏗️ Infrastructure

#### Type Declarations
- **src/types/css-modules.d.ts** - CSS Modules declarations
  - Support for .module.css, .module.scss, etc
  - Type-safe className access

### 📊 Metrics
- **Components Migrated:** 4
- **Lines Added:** +134 lines TypeScript
- **Type Coverage:** 100% in migrated components
- **Tests:** 66/79 passing (maintained)
- **Regressions:** 0

---

## [v2.1.0] - 2026-02-27

### 🎉 Phase 4 - Database Migration Complete

Migração completa do sistema de banco de dados legado para arquitetura moderna TypeScript.

---

### ✨ Database Migration

#### 🗄️ Database Service Enhanced
- **`saveSongToDisk(songData)`** - Salva músicas como JSON no disco
  - Configuração de path customizável
  - Suporte a múltiplos álbums (Imported, HASD, etc)
  - Criação automática de diretórios
  - Nomes de arquivo seguros

- **`populateInitialData()`** - Implementação completa
  - Busca automática em library/musics/*
  - Suporte a múltiplos álbuns
  - Importação de library/imports
  - Proteção contra duplicação
  - Logging detalhado com Pino

#### 📦 Components Updated (6)
Migrados para usar `@services/database`:
- ✅ PathsSettings.jsx
- ✅ ImportSettings.jsx
- ✅ AlbumList.jsx
- ✅ ControlPanel.jsx
- ✅ EditSongSettings.jsx
- ✅ SongList.jsx

#### 🗑️ Code Cleanup
- **Removido:** `src/db.js` (268 linhas de código legado)
- **Zero breaking changes** - 100% backward compatible
- **Type safety:** Todas operações de DB agora tipadas

### 📊 Metrics
- **Tests:** 66/79 passing (83%)
- **Type Coverage:** Database 100%
- **Code Quality:** -268 legacy lines, +150 TypeScript lines

---

## [v2.0.0] - 2024-XX-XX

### 🎉 Major Update - Context API → Zustand Migration

Esta versão traz migrações significativas de arquitetura focadas em performance e type safety.

---

### ✨ Novos Recursos

#### 🏪 Zustand State Management
- **`projectionStore.ts`** - Store completa para gerenciamento de projeção
  - currentSlide, previewSlide management
  - Timer projection state
  - Projection config (fontSize, background, theme)
  - Window management (projector window BrowserWindow reference)
  - Broadcasting via IPC
  
- **Melhorias no `appStore.ts`**
  - Persist middleware para state persistence
  - Auto-clear de feedback com duração
  - Reset function para limpar estado
  - DevTools integration

#### 💾 Database Service TypeScript
- **`src/services/database.ts`** - Novo serviço Dexie TypeScript
  - **Text normalization**: Remove acentos, filtra palavras curtas
  - **5 migration versions** (v1 → v5) com histórico completo
  - **Type-safe queries** com interfaces TypeScript
  - **Métodos principais**:
    - `searchSongs(query, limit)` - Busca normalizada
    - `findByNumber(number, album)` - Busca por número de hino
    - `saveSong(song)` - Salvar com timestamps automáticos
    - `getAlbums()` - Listar álbuns disponíveis
    - `getSetting(key, defaultValue)` - Configurações do usuário
    - `setSetting(key, value)` - Persistir preferências

#### 🪝 Novos Hooks
- **`useFeedback.ts`** - Migrado de Context para Zustand
  - Mantém API compatível com versão antiga
  - Performance otimizada com selective subscriptions
  - Retorna: `{ feedback, showFeedback, clearFeedback }`

- **`useProjectionZ.ts`** - Hooks de projeção
  - `useProjection()` - Hook principal com todas features
  - `useProjectionSender()` - Apenas para enviar slides
  - `usePreviewSender()` - Apenas para preview
  
- **`useUIManager.ts`** - Gerenciamento de UI
  - Wrapper para appStore
  - `showSettings`, `setShowSettings`

#### 🎨 Componentes TypeScript
- **`Feedback.tsx`** - Convertido de JSX para TypeScript
  - Interface de props tipada
  - Accessibility improvements (aria-live="polite")
  - Suporte a 4 tipos: success, error, warning, info
  - Animações fade in/out

---

### 🔄 Mudanças

#### Migração Context → Zustand
- ❌ **FeedbackContext.jsx** → ✅ `appStore` + `useFeedback()`
- ❌ **ProjectionContext.jsx** → ✅ `projectionStore` + `useProjection()`
- ❌ **UIManagerContext.jsx** → ✅ `appStore` + `useUIManager()`

**Benefícios**:
- 🚀 **Performance**: Eliminação de re-renders desnecessários
- 🎯 **Selective subscriptions**: Subscribe apenas ao estado necessário
- 🧩 **Simplicidade**: Menos boilerplate, sem nested providers
- 🔧 **DevTools**: Zustand DevTools para debugging

#### Database Migration
- ⚠️ **`db.js`** mantido para compatibilidade (será removido em v3.0)
- ✅ **`database.ts`** agora é o serviço principal
- Migração automática de schema na primeira execução

---

### 🧪 Testes Adicionados

#### Store Tests
- **`appStore.test.ts`** (8 testes)
  - Estado inicial
  - Setters (setSelectedSong, setShowSettings, etc)
  - Feedback auto-clear após duração
  - Reset function

- **`projectionStore.test.ts`** (12 testes)
  - sendSlide, clearScreen
  - Timer projection state
  - Config updates e merge
  - Window management

#### Service Tests
- **`database.test.ts`** (10+ testes)
  - Text normalization (accent removal)
  - Short word filtering (palavras < 3 caracteres)
  - prepareSongForSave (timestamps)
  - Search functionality

#### Component Tests
- **`Feedback.test.tsx`** (6 testes)
  - Rendering com diferentes props
  - CSS classes corretas
  - Ícone correspondente ao tipo
  - Accessibility (aria-live)

**Total**: 30+ test cases cobrindo stores, services e componentes

---

### 📚 Documentação

- **`MIGRATION_GUIDE.md`** - Guia completo de migração
  - Context API → Zustand patterns
  - JavaScript → TypeScript conversions
  - Database service migration
  - Hook usage examples
  
- **`MIGRATION_SUMMARY.md`** - Resumo detalhado da v2.0
  - Todas as mudanças Phase 2
  - Breaking changes
  - Backwards compatibility
  - Next steps
  
- **`EXAMPLES.md`** - Exemplos práticos
  - Zustand store usage
  - Database service examples
  - Hook patterns
  - TypeScript component examples
  - Advanced patterns

- **README.md atualizado**
  - Quick Start section
  - Nova seção de arquitetura
  - Exemplos de APIs
  - Badges de status

---

### 🔧 Melhorias de Performance

- **Zustand selective subscriptions**: Re-renders apenas quando estado usado muda
- **Memoized selectors**: Computação de estado derivado otimizada
- **Database indices**: Queries mais rápidas (number, album, title)
- **Text normalization caching**: Normalização de texto otimizada

---

### ⚠️ Breaking Changes

#### Imports
```diff
- import { useFeedback } from './contexts/FeedbackContext';
+ import { useFeedback } from '@hooks/useFeedback';

- import { useProjection } from './contexts/ProjectionContext';
+ import { useProjection } from '@hooks/useProjectionZ';
```

#### Database
```diff
- import db from './db.js';
+ import { db } from '@services/database';

- await db.songs.where('title').equals(title).first();
+ await db.searchSongs(title, 1);
```

**Nota**: APIs antigas ainda funcionam via compatibility layers, mas estão **depreciadas**.

---

### 🗑️ Depreciações

⚠️ **Serão removidos em v3.0**:
- `FeedbackContext.jsx` - Use `useFeedback()` hook
- `ProjectionContext.jsx` - Use `useProjection()` hook  
- `UIManagerContext.jsx` - Use `useAppStore()` diretamente
- `db.js` - Use `services/database.ts`

---

### 🚀 Como Migrar

1. **Instale dependências**:
   ```bash
   npm install
   ```

2. **Execute testes**:
   ```bash
   npm run test
   ```

3. **Atualize imports** (opcional, mas recomendado):
   ```typescript
   // Antigo
   import { useFeedback } from './contexts/FeedbackContext';
   
   // Novo
   import { useFeedback } from '@hooks/useFeedback';
   ```

4. **Leia o guia de migração**:
   - [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
   - [EXAMPLES.md](./EXAMPLES.md)

---

### 📊 Estatísticas

- **Linhas de código**: ~2500+ linhas adicionadas
- **Testes**: 30+ casos de teste
- **Cobertura**: 70%+ em stores e services
- **Arquivos TypeScript**: +8 novos arquivos
- **Documentação**: +3000 linhas de docs

---

### 🔄 Compatibilidade

- ✅ **Backward compatible**: Todas as APIs antigas ainda funcionam
- ✅ **Database migration**: Automática na primeira execução
- ✅ **Gradual migration**: Migre componentes um por um

---

### 🎯 Próximos Passos (v2.1)

- [ ] Migrar componentes restantes para TypeScript
  - SongManager.jsx → SongManager.tsx
  - ImageManager.jsx → ImageManager.tsx
  - Modal.jsx → Modal.tsx
  
- [ ] Remover Context files antigos
- [ ] Remover db.js (usar apenas database.ts)
- [ ] Aumentar cobertura de testes para 80%+
- [ ] Migrar hooks restantes para TypeScript

---

## [v0.1.0] - 2026-02-27

### 🔒 Segurança
- **[BREAKING]** Redesignado Electron com Context Isolation habilitado
- Implementado Preload Script com APIs seguras
- Adicionado sistema de whitelisting de diretórios
- Desabilitado Node Integration completo
- IPC handlers para operações de filesystem com validação

### 📦 Arquitetura
- Migrado para TypeScript
- Reorganizada estrutura de pastas:
  - `src/services/` - Serviços centralizados
  - `src/stores/` - Estado global (Zustand)
  - `src/types/` - Tipos TypeScript
  - `src/utils/` - Utilitários
  - `src/constants/` - Constantes
  - `src/contexts/` - Context API (futuro)
  - `src/test/` - Configuração de testes

### 🛠️ Ferramentas
- **ESLint** + **Prettier** configurados para code quality
- **Vitest** + **React Testing Library** para testes
- **Zod** para validação de schemas
- **Zustand** para state management centralizado
- **Pino** para logging estruturado
- **dotenv** para variáveis de ambiente

### 🎯 Features
- **Sistema de Logging** centralizado com `createLogger()`
  - Diferentes níveis: debug, info, warn, error
  - Contexto estruturado
  - Child loggers

- **Error Handling** robusto
  - Classes de erro customizadas (`AppError`, `ValidationError`, etc)
  - `ErrorHandler` com mensagens amigáveis ao usuário
  - Logging automático de erros

- **Filesystem Service** seguro
  - `FileSystemService` com operações CRUD
  - Tratamento de erros integrado
  - Métodos helper para JSON

- **Notificações do Sistema**
  - `NotificationService` com tipos
  - Métodos success, error, info, warning
  - Fallback gracioso

- **Atalhos de Teclado**
  - `KeyboardShortcutService` para registro global
  - Suporte a combinações Ctrl+X, Shift+X, etc
  - Auto-cleanup

- **Persistência de Estado UI**
  - `StorageService` com prefix seguro
  - Hook `useLocalStorage` para componentes
  - Tratamento de erros integrado

- **Lazy Loading**
  - Wrapper `withLazyLoading` para React.lazy
  - Error Boundary integrado
  - Loading states customizáveis

### 📝 Documentação
- README completo com features, setup e contribuição
- MIGRATION_GUIDE.md para migração TypeScript
- Type definitions completas
- JSDoc em serviços-chave
- Exemplos de uso em testes

### 🔧 Scripts
- `npm run dev` - Desenvolvimento com auto-reload
- `npm run build` - Build para produção
- `npm run lint` - Verificar código
- `npm run lint:fix` - Corrigir automaticamente
- `npm run format` - Formatter com Prettier
- `npm run type-check` - Verificar tipos
- `npm run test` - Executa testes
- `npm run test:coverage` - Cobertura de testes
- `npm run validate` - Full validation pipeline

### 🚀 CI/CD
- Pipeline GitHub Actions com:
  - Linting em múltiplas versões de Node
  - Type checking
  - Testes automáticos
  - Build validation
  - Coverage upload (Codecov)
  - Security checks (npm audit)
  - Auto-release em main branch

### 📦 Dependências Adicionadas
```json
"dependencies": {
  "zustand": "^5.0.11",
  "zod": "^4.3.6",
  "pino": "^10.3.1",
  "pino-pretty": "^13.1.3",
  "electron-log": "^5.4.3"
}

"devDependencies": {
  "typescript": "^5.9.3",
  "tsx": "^4.21.0",
  "eslint": "^10.0.2",
  "prettier": "^3.8.1",
  "@typescript-eslint/eslint-plugin": "^8.56.1",
  "@typescript-eslint/parser": "^8.56.1",
  "vitest": "^4.0.18",
  "@testing-library/react": "^16.3.2",
  "@testing-library/jest-dom": "^6.9.1",
  "jsdom": "^28.1.0",
  "dotenv": "^17.3.1"
}
```

### 🗺️ Configuração de Path Aliases
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@hooks/*` → `src/hooks/*`
- `@services/*` → `src/services/*`
- `@stores/*` → `src/stores/*`
- `@types/*` → `src/types/*`
- `@utils/*` → `src/utils/*`
- `@constants/*` → `src/constants/*`

### 📋 Arquivos Criados
- `.env` e `.env.production` - Variáveis de ambiente
- `.eslintrc.json` - Configuração ESLint
- `.prettierrc.json` - Configuração Prettier
- `.prettierignore` - Arquivos a ignorar no formatting
- `tsconfig.json` - Configuração TypeScript
- `tsconfig.node.json` - TypeScript para build tools
- `vitest.config.ts` - Configuração de testes
- `electron-src/preload.js` - Preload script seguro
- `.github/workflows/ci.yml` - CI/CD Pipeline
- `MIGRATION_GUIDE.md` - Guia de migração TypeScript
- `CHANGELOG.md` - Este arquivo

### 🔧 Camadas de Serviço
1. **Logger Service** - Logging estruturado
2. **Error Handler** - Classes e utilities de erro
3. **FileSystem Service** - Acesso seguro ao sistema
4. **Validation** - Schemas Zod
5. **Notification Service** - Notificações nativas
6. **Keyboard Shortcuts** - Atalhos globais
7. **Storage Service** - Persistência local
8. **App Store** - Estado global com Zustand

### 🧪 Testes Iniciais
- `logger.test.ts` - Testes do sistema de logging
- `errorHandler.test.ts` - Testes de error handling
- `validators.test.ts` - Testes de validação

### 🚧 Próximos Passos Recomendados
1. Migrar componentes React para TypeScript
2. Implementar database migrations (Dexie)
3. Adicionar mais testes de cobertura
4. Implementar image lazy loading aprimorado
5. Adicionar suporte a dark mode
6. Refatorar Contexts para usar Zustand
7. Implementar undo/redo functionality
8. Adicionar analytics

---

**Nota:** Este é um update major que reorganiza significativamente a codebase.
Consulte MIGRATION_GUIDE.md para converter arquivos JavaScript existentes.
