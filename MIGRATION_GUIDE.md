# 🔄 Guia de Migração para TypeScript

Este guia ajuda você a converter componentes React JavaScript para TypeScript gradualmente.

## 📋 Passos de Migração

### 1. Renomear arquivo de .jsx para .tsx

```bash
# De
mv src/components/MyComponent.jsx src/components/MyComponent.tsx

# Para TypeScript
```

### 2. Adicionar tipagem de Props

**Antes (JavaScript):**

```jsx
function MyComponent({ title, items, onSelect }) {
  return <div>{title}</div>;
}

export default MyComponent;
```

**Depois (TypeScript):**

```tsx
interface MyComponentProps {
  title: string;
  items: Array<{ id: string; name: string }>;
  onSelect: (id: string) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  items, 
  onSelect 
}) => {
  return <div>{title}</div>;
};

export default MyComponent;
```

### 3. Tipagem de Hooks

**Antes:**

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const ref = useRef(null);
```

**Depois (TypeScript):**

```tsx
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
const ref = useRef<HTMLInputElement>(null);
```

### 4. Tipagem de Event Handlers

**Antes:**

```jsx
const handleClick = (e) => {
  console.log(e.target.value);
};

const handleChange = (e) => {
  setName(e.target.value);
};
```

**Depois (TypeScript):**

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget.value);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setName(e.target.value);
};
```

### 5. Tipagem de Custom Hooks

**Antes:**

```jsx
export function useMyHook(initialValue) {
  const [state, setState] = useState(initialValue);
  return [state, setState];
}
```

**Depois (TypeScript):**

```tsx
export function useMyHook<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  return [state, setState];
}
```

### 6. Tipagem de Componentes com Generics

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onSelect: (item: T) => void;
}

const List = <T extends { id: string }>(props: ListProps<T>) => {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>
          {props.renderItem(item)}
        </li>
      ))}
    </ul>
  );
};
```

## 🚀 Estratégia de Migração Recomendada

### Fase 1: Services & Utils (Mais Fácil)
1. `src/services/logger.ts` ✅ (já feito)
2. `src/services/errorHandler.ts` ✅ (já feito)
3. `src/utils/validators.ts` ✅ (já feito)
4. `src/constants/index.ts` ✅ (já feito)

### Fase 2: Hooks & Custom Hooks
1. `src/hooks/useFeedback.ts`
2. `src/hooks/useCronos.js` → `useCronos.ts`
3. `src/hooks/useImagePersistence.js` → `useImagePersistence.ts`
4. Outros hooks em `src/hooks/`

### Fase 3: Componentes Menores (Mais Isolados)
1. `src/components/Modal.jsx` → `src/components/Modal.tsx`
2. `src/components/Feedback.jsx` → `src/components/Feedback.tsx`
3. `src/components/Header.jsx` → `src/components/Header.tsx`

### Fase 4: Componentes Maiores (Maior Complexidade)
1. `src/components/ImageManager.jsx` → `src/components/ImageManager.tsx`
2. `src/components/SongManager.jsx` → `src/components/SongManager.tsx`
3. `src/components/Projector.jsx` → `src/components/Projector.tsx`

### Fase 5: Database & Core (Mais Crítico)
1. `src/db.js` → `src/db.ts`
2. Migração completa do Dexie

## 📝 Checklist de Migração

Para cada componente/arquivo, verifique:

- [ ] Arquivo renomeado de .js/.jsx para .ts/.tsx
- [ ] Imports atualizados para os novos paths/aliases
- [ ] Todos os props tipados com interfaces
- [ ] Todos os hooks tipados
- [ ] Event handlers tipados
- [ ] Refs tipados
- [ ] Retorno de funções tipado
- [ ] Sem uso de `any` (exceto quando absolutamente necessário)
- [ ] Testes atualizado/criados
- [ ] Linting passa (`npm run lint`)
- [ ] Type checking passa (`npm run type-check`)

## 🔧 Troubleshooting

### Erro: "Cannot find module"

Verifique se os path aliases estão configurados em:
- `tsconfig.json`
- `vite.config.mjs`
- `vitest.config.ts`

### Erro: "Type 'X' is not assignable to type 'Y'"

Use type assertions com cautela:

```tsx
const value = someValue as SomeType;
```

### Erro: "React.FC is deprecated"

Use esta sintaxe em vez disso:

```tsx
const MyComponent = ({ prop }: Props): JSX.Element => {
  return <div>{prop}</div>;
};
```

## 📚 Recursos Úteis

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite TypeScript Docs](https://vitejs.dev/guide/ssr.html#import-dynamic-types)

---

**Dica:** Execute `npm run type-check` frequentemente durante a migração para pegar erros cedo!
