# 📋 Próximos Passos - Phase 3 Completo

## ✅ Trabalho Concluído

### Componentes Migrados para TypeScript
1. ✅ **SongManager.tsx** - Migrado de SongManager.jsx
   - Removidos providers Context API (FeedbackProvider, ProjectionProvider, UIManagerProvider)
   - Usando novos hooks (@hooks/useFeedback, @hooks/useProjectionZ, @hooks/useUIManager)
   - Type-safe com interface Song importada de @types
   - JSDoc completa
   - 9 testes criados (7/9 passando)

2. ✅ **ImageManager.tsx** - Migrado de ImageManager.jsx
   - Usando novo hook @hooks/useFeedback
   - Type assertions para hooks ainda em JavaScript
   - Lazy loading com IntersectionObserver
   - Drag and drop para reordenação
   - Gerenciamento de álbuns
   - 25 testes criados

### Testes Adicionados
- ✅ **SongManager.test.tsx** - 9 casos de teste
  - Renderização
  - populateInitialData
  - Navegação entre visões (MainView ↔ SongControl)
  - Preview window
  - Error handling
  - Layout structure

- ✅ **ImageManager.test.tsx** - 25 casos de teste
  - Renderização de controles
  - Sistema de álbuns (filtros, seleção)
  - Lazy loading
  - Drag and drop
  - Edit inline de álbuns
  - Projeção de imagens
  - Accessibility

### Cobertura de Testes
- **Testes totais**: 79 testes
- **Testes passando**: 57/79 (72%)
- **Test files**: 9 arquivos
- **Test files passando**: 5/9

---

## 🚧 Trabalho Pendente

### 1. Atualizar imports em componentes JSX restantes

Componentes que ainda usam Context API antiga:

#### FeedbackContext (15 componentes):
- [ ] src/components/ImageManager.jsx → **JÁ MIGRADO para .tsx**
- [ ] src/components/SongManager.jsx → **JÁ MIGRADO para .tsx**
- [ ] src/components/Notices.jsx
- [ ] src/components/NumberRaffle.jsx
- [ ] src/components/GoogleSlidesTab.jsx
- [ ] src/components/PdfViewerTab.jsx
- [ ] src/components/NameRaffle.jsx
- [ ] src/components/PowerPointTab.jsx
- [ ] src/components/CanvaTab.jsx
- [ ] src/hooks/NumberRaffle.jsx
- [ ] src/hooks/NameRaffle.jsx
- [ ] src/hooks/Notices.jsx

**Migração necessária**:
```diff
- import { useFeedback } from './FeedbackContext';
+ import { useFeedback } from '@hooks/useFeedback';
```

#### ProjectionContext (11 componentes):
- [ ] src/components/PathsSettings.jsx
- [ ] src/components/SongControl.jsx
- [ ] src/components/MainView.jsx
- [ ] src/components/BibleTab.jsx
- [ ] src/components/Header.jsx
- [ ] src/components/UtilitiesTab.jsx
- [ ] src/hooks/NameRaffle.jsx
- [ ] src/hooks/Notices.jsx

**Migração necessária**:
```diff
- import { useProjection } from './ProjectionContext';
+ import { useProjection } from '@hooks/useProjectionZ';
```

#### UIManagerContext (2 componentes):
- [ ] src/components/Header.jsx

**Migração necessária**:
```diff
- import { useUIManager } from './UIManagerContext';
+ import { useUIManager } from '@hooks/useUIManager';
```

---

### 2. Remover arquivos de Context API obsoletos

**APENAS APÓS** atualizar todos os imports acima:

```bash
# Remover Context files
rm src/components/FeedbackContext.jsx
rm src/components/ProjectionContext.jsx
rm src/components/UIManagerContext.jsx
```

---

### 3. Remover db.js obsoleto

Componentes que ainda usam `db.js`:

- [ ] src/components/PathsSettings.jsx
- [ ] src/components/ImportSettings.jsx
- [ ] src/components/ControlPanel.jsx
- [ ] src/components/SongList.jsx
- [ ] src/components/Settings.jsx
- [ ] src/components/MainView.jsx
- [ ] src/components/AlbumList.jsx
- [ ] src/components/AlbumsTab.jsx
- [ ] src/components/BibleSearch.jsx

**Migração necessária**:
```diff
- import { db, populateInitialData } from '../db';
+ import { db, populateInitialData } from '@services/database';
```

**Após migrar todos os imports**:
```bash
rm src/db.js
```

---

### 4. Melhorias nos Testes

#### Corrigir testes falhando:

**SongManager.test.tsx** (2 testes falhando):
- [ ] Fix: "should call populateInitialData on mount"
  - Problema: Mock não está sendo chamado
  - Solução: Verificar setup do mock

- [ ] Fix: "should handle populateInitialData error gracefully"
  - Problema: console.error não sendo capturado
  - Solução: Ajustar spy ou usar wrapper de error

**ImageManager.test.tsx**:
- [ ] Fix: Testes usando ImageManager.jsx em vez de ImageManager.tsx
  - Problema: Import resolvendo para arquivo antigo
  - Solução: Deletar ImageManager.jsx após migração completa

**projectionStore.test.ts**:
- [ ] Fix: "should merge config updates"
  - Problema: fadeDuration não sendo mergeado corretamente
  - Solução: Verificar lógica de merge no store

---

### 5. Migrar hooks JavaScript para TypeScript

Hooks que precisam de migração:

- [ ] src/hooks/useImagePersistence.js → .ts
- [ ] src/hooks/useImageActions.js → .ts
- [ ] src/hooks/useImageDisplayAndProjection.js → .ts
- [ ] src/hooks/useImageReorder.js → .ts
- [ ] src/hooks/fileSystem.js → .ts
- [ ] src/hooks/NumberRaffle.jsx → .tsx
- [ ] src/hooks/NameRaffle.jsx → .tsx
- [ ] src/hooks/Notices.jsx → .tsx
- [ ] src/hooks/SimpleTimer.jsx → .tsx

---

### 6. Aumentar Cobertura de Testes

**Meta**: 80%+ de cobertura

#### Testes prioritários:
- [ ] Testar hooks migrados
- [ ] Testar componentes de utilidades (NameRaffle, NumberRaffle, etc)
- [ ] Integration tests end-to-end
- [ ] Error boundary tests

#### Executar coverage:
```bash
npm run test:coverage
```

---

## 📊 Progresso Atual

### Arquitetura
- ✅ Zustand stores implementadas (appStore, projectionStore)
- ✅ Database service TypeScript
- ✅ Hooks de migração (useFeedback, useProjection, useUIManager)
- ✅ 2 componentes migrados para TypeScript

### Testes
- 📊 **72% de testes passando** (57/79)
- 📊 **9 test files** criados
- 🎯 **Meta**: 80%+ coverage

### Context API → Zustand
- ✅ Stores criados e funcionais
- ⏳ **~15 componentes** ainda precisam atualizar imports
- ⏳ Context files ainda presentes (não podem ser removidos ainda)

### Database
- ✅ `database.ts` service implementado
- ⏳ **~9 componentes** ainda usam `db.js`
- ⏳ `db.js` ainda presente (não pode ser removido ainda)

---

## 🚀 Como Continuar

### Opção 1: Migração Rápida (Recomendado)
Atualizar todos os imports de uma vez com find & replace:

```bash
# FeedbackContext
find src/components -name "*.jsx" -exec sed -i "s|from './FeedbackContext'|from '@hooks/useFeedback'|g" {} +
find src/hooks -name "*.jsx" -exec sed -i "s|from '../components/FeedbackContext'|from '@hooks/useFeedback'|g" {} +

# ProjectionContext  
find src/components -name "*.jsx" -exec sed -i "s|from './ProjectionContext'|from '@hooks/useProjectionZ'|g" {} +

# UIManagerContext
find src/components -name "*.jsx" -exec sed -i "s|from './UIManagerContext'|from '@hooks/useUIManager'|g" {} +

# db.js → database.ts
find src -name "*.jsx" -exec sed -i "s|from '../db'|from '@services/database'|g" {} +
find src -name "*.jsx" -exec sed -i "s|from './db'|from '@services/database'|g" {} +
```

**Depois**:
1. Testar a aplicação: `npm run dev`
2. Verificar erros: `npm run type-check`
3. Rodar testes: `npm run test`
4. Se tudo OK, remover arquivos obsoletos

### Opção 2: Migração Gradual
Migrar componente por componente, testando cada um:

1. Escolher um componente (ex: `Notices.jsx`)
2. Atualizar imports
3. Testar componente individualmente
4. Commit
5. Repetir

---

## 📝 Comandos Úteis

```bash
# Ver todos os usos de Context antigos
grep -r "FeedbackContext" src/
grep -r "ProjectionContext" src/
grep -r "UIManagerContext" src/

# Ver todos os usos de db.js
grep -r "from '../db'" src/
grep -r "from './db'" src/

# Rodar testes específicos
npm run test -- SongManager.test.tsx --run
npm run test -- ImageManager.test.tsx --run

# Coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint

# Dev
npm run dev
```

---

## 🎯 Critérios de Conclusão Phase 3

- [x] SongManager.tsx criado
- [x] ImageManager.tsx criado
- [x] Testes para SongManager
- [x] Testes para ImageManager
- [ ] Todos os imports Context API atualizados
- [ ] Context files removidos
- [ ] Todos os imports db.js atualizados
- [ ] db.js removido
- [ ] 80%+ testes passando
- [ ] 80%+ coverage
- [ ] Sem erros de TypeScript
- [ ] Aplicação funcionando em dev

---

**Status**: 🟡 Phase 3 - 60% completo
**Próximo**: Atualizar imports em componentes restantes
