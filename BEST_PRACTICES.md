# 🎯 Guia de Boas-Práticas

Padrões e convenções para manter o projeto consistente e escalável.

## 📁 Estrutura e Nomeação

### Nomeação de Arquivos

- **Componentes React**: `PascalCase` (ex: `MyComponent.tsx`)
- **Hooks**: `camelCase` com prefixo `use` (ex: `useMyHook.ts`)
- **Services**: `camelCase` (ex: `myService.ts`)
- **Utils**: `camelCase` (ex: `myUtility.ts`)
- **Types**: `camelCase` (ex: `myTypes.ts`)
- **Constants**: `UPPER_SNAKE_CASE` (ex: `MY_CONSTANT`)

### Importações

Use path aliases para melhor legibilidade:

```typescript
// ✅ Preferido
import { createLogger } from '@services/logger';
import { validateSong } from '@utils/validators';
import { useAppStore } from '@stores/appStore';

// ❌ Evitar
import { createLogger } from '../../../services/logger';
import { validateSong } from '../../utils/validators';
```

## 🏗️ Arquitetura em Camadas

### 1. Components (Apresentação)
- Componentes React "burros" que recebem dados via props
- Lógica de UI apenas
- Pouco estado local
- Integram com hooks

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);
```

### 2. Hooks (Lógica)
- Encapsulam lógica de componentes
- Integram com services e stores
- Reutilizáveis entre componentes
- Nomeados com prefixo `use`

```tsx
const useSongSearch = (query: string) => {
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const data = await SongService.search(query);
        setResults(data);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return { results, loading };
};
```

### 3. Services (Negócio)
- Lógica de negócio isolada
- Sem dependências de React
- Podem ser testados independentemente
- Tratamento de erros integrado

```typescript
export class SongService {
  static async search(query: string): Promise<Song[]> {
    const logger = createLogger('SongService');
    try {
      // Lógica de busca
      return results;
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}
```

### 4. Stores (Estado Global)
- Uso de Zustand para estado compartilhado
- Simples e performático
- Sem boilerplate
- Fácil debugging

```typescript
export const useAppStore = create<AppStore>((set) => ({
  selectedSong: null,
  setSelectedSong: (song) => set({ selectedSong: song }),
}));
```

## 🔍 Validação e Tipagem

### Sempre valide entrada externa

```typescript
// ✅ Com validação
const processJSON = async (content: string) => {
  const songs = validateSongs(JSON.parse(content));
  return songs;
};

// ❌ Sem validação
const processJSON = async (content: string) => {
  return JSON.parse(content) as Song[];
};
```

### Avoid `any`

```typescript
// ✅ Tipado
const data: Record<string, string> = {};

// ❌ Evitar
const data: any = {};
```

## 📝 Logging

### Use o logger para debugging

```typescript
import { createLogger } from '@services/logger';

const logger = createLogger('MyComponent');

// ✅ Bom
logger.debug('Fetching songs', { query, limit: 10 });
logger.error('Failed to load', error, { userId: 123 });

// ❌ Evitar
console.log('Loading...');
console.error(error);
```

## ❌ Error Handling

### Sempre trate erros apropriadamente

```typescript
// ✅ Bom
try {
  const data = await loadData();
} catch (error) {
  const appError = ErrorHandler.handle(error);
  logger.error('Failed to load', appError);
  showFeedback({
    message: ErrorHandler.getUserMessage(appError),
    type: 'error',
  });
}

// ❌ Evitar
try {
  const data = await loadData();
} catch (error) {
  console.error(error);
}
```

## 🎣 Hooks Customizados

### Nomeação apropriada

```typescript
// ✅ Bom - descreve o que faz
const useImageGallery = () => {
  // ...
};

// ❌ Evitar - muito genérico
const useData = () => {
  // ...
};
```

### Cleanup adequado

```typescript
// ✅ Bom - cleanup resources
useEffect(() => {
  const unsubscribe = KeyboardShortcutService.register(
    { key: 'p', ctrlKey: true },
    handleOpenProjector
  );

  return () => unsubscribe();
}, []);

// ❌ Evitar - memory leak
useEffect(() => {
  KeyboardShortcutService.register(
    { key: 'p', ctrlKey: true },
    handleOpenProjector
  );
}, []);
```

## 🧪 Testes

### Padrão Arrange-Act-Assert

```typescript
describe('SongService', () => {
  it('should search songs by query', () => {
    // Arrange
    const query = 'amazing';
    const expectedSongs = [...];

    // Act
    const result = SongService.search(query);

    // Assert
    expect(result).toEqual(expectedSongs);
  });
});
```

### Teste cases felizes e tristes

```typescript
describe('validateSong', () => {
  it('should validate correct song', () => {
    const validSong = { title: 'X', content: 'Y' };
    expect(validateSong(validSong)).toBeDefined();
  });

  it('should reject invalid song', () => {
    const invalidSong = { title: '' };
    expect(() => validateSong(invalidSong)).toThrow();
  });
});
```

## ♿ Acessibilidade

### ARIA labels

```tsx
// ✅ Acessível
<button aria-label="Abrir menu">
  <MenuIcon />
</button>

// ❌ Não acessível
<button>
  <MenuIcon />
</button>
```

## 💅 Estilos

### Use Tailwind CSS classes

```tsx
// ✅ Preferido
<div className="flex items-center justify-between p-4 bg-primary text-white rounded-lg">
  {/* ... */}
</div>

// ❌ Evitar
<div style={{ display: 'flex', justifyContent: 'space-between', ... }}>
  {/* ... */}
</div>
```

### Componentes reutilizáveis

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '' 
}) => (
  <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
    <h2 className="font-bold mb-2">{title}</h2>
    {children}
  </div>
);
```

## 🚀 Performance

### Memoizaçã adequada

```tsx
// ✅ Evita re-renders desnecessários
const MemoizedItem = React.memo(({ item, onSelect }) => (
  <div onClick={() => onSelect(item)}>
    {item.name}
  </div>
), (prev, next) => prev.item.id === next.item.id);

// Use useMemo para valores computados
const expensiveValue = useMemo(
  () => complexCalculation(data),
  [data]
);
```

### Lazy loading

```tsx
const LazySettings = React.lazy(() => import('./Settings'));

<Suspense fallback={<LoadingSpinner />}>
  <LazySettings />
</Suspense>
```

## 📱 Responsividade

### Mobile-first com Tailwind

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards responsivos */}
</div>
```

## 🔐 Segurança

### Validar entrada do usuário

```typescript
// ✅ Valida entrada
const handleFileUpload = async (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError('File too large');
  }
  return processFile(file);
};
```

### Usar APIs seguras do Electron

```typescript
// ✅ Seguro - usa IPC
const content = await window.electronAPI.fs.readFile(path);

// ❌ Inseguro - acesso direto (não está disponível)
// const content = require('fs').readFileSync(path);
```

## 🐛 Debugging

### Use o logger com context

```typescript
const logger = createLogger('ImageLoader');

logger.debug('Loading images', { 
  count: images.length,
  albumId: album.id 
});

// No DevTools, você verá estruturado no console
```

### Adicione type guards

```typescript
function isSong(obj: unknown): obj is Song {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'title' in obj &&
    'content' in obj &&
    typeof (obj as any).title === 'string'
  );
}

if (isSong(data)) {
  // TypeScript sabe que é Song aqui
}
```

## 📚 Documentação

### JSDoc para funções públicas

```typescript
/**
 * Busca músicas por query
 * @param query - Termo de busca
 * @param limit - Limite de resultados (default: 10)
 * @returns Array de músicas encontradas
 * @throws {AppError} Se a busca falhar
 */
export async function searchSongs(
  query: string,
  limit?: number
): Promise<Song[]> {
  // ...
}
```

---

**🎯 Resumo:** Mantenha código limpo, tipado, bem-testado e seguro! 🚀
