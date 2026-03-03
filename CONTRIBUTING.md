# 🤝 Contribuindo para PromptSong

Obrigado por querer contribuir! Aqui estão as diretrizes para ajudá-lo a começar.

## 🎯 Visão Geral do Projeto

PromptSong é uma aplicação desktop para gerenciar música, imagens e cronogramas de forma integrada, com projeção em tempo real. Feito com Electron + React + TypeScript.

## 🚀 Começar

### 1. Clone o Repositório

```bash
git clone <seu-repositório>
cd promptsong
npm install
```

### 2. Configure seu ambiente

```bash
cp .env.example .env
npm run dev
```

### 3. Crie uma branch

```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bugfix
```

## 📝 Padrões de Commit

Siga [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação, sem mudança lógica
- **refactor**: Refatoração sem mudança funcional
- **perf**: Melhorias de performance
- **test**: Testes
- **chore**: Scripts de build, deps, etc
- **ci**: Mudanças em CI/CD

### Exemplos

```bash
git commit -m 'feat: adiciona busca avançada de músicas'
git commit -m 'fix: corrige crash ao carregar imagens grandes'
git commit -m 'docs: atualiza README com exemplos'
git commit -m 'refactor: simplifica lógica de validação'
git commit -m 'perf: otimiza rendering de lista grande'
git commit -m 'test: adiciona testes para SongService'
```

**Com escopo:**

```bash
git commit -m 'feat(image-manager): adiciona drag-and-drop'
git commit -m 'fix(projector): corrige posicionamento em dual monitor'
```

## ✅ Checklist antes de PR

- [ ] Branch criada a partir de `develop` ou issue específica
- [ ] Código segue style guide (Prettier)
- [ ] `npm run lint` passa sem warnings
- [ ] `npm run type-check` passa
- [ ] `npm run test` passa com cobertura adequada
- [ ] Nova funcionalidade tem testes
- [ ] Documentação atualizada (README, JSDoc, etc)
- [ ] Commits em Conventional Commits format
- [ ] Nenhuma mudança desnecessária no código

## 🧪 Executando Testes

```bash
# Todos os testes
npm run test

# Watch mode
npm run test -- --watch

# Cobertura
npm run test:coverage

# UI do Vitest
npm run test:ui
```

**Porcentagem mínima de cobertura:**
- Statements: 60%
- Branches: 50%
- Functions: 60%
- Lines: 60%

## 🏗️ Arquitetura

O projeto está organizado em camadas:

1. **Components** (`src/components/`) - UI
2. **Hooks** (`src/hooks/`) - Lógica compartilhada
3. **Services** (`src/services/`) - Lógica de negócio
4. **Stores** (`src/stores/`) - Estado global
5. **Types** (`src/types/`) - Definições TypeScript
6. **Utils** (`src/utils/`) - Funções auxiliares

Veja [BEST_PRACTICES.md](BEST_PRACTICES.md) para mais detalhes.

## 📋 Tipos de Contribuição

### Reportando Bugs 🐛

Crie uma issue com:

- **Título descritivo**: `[BUG] Falha ao carregar imagens em Windows`
- **Passos para reproduzir**: 
  ```
  1. Abrir ImageManager
  2. Carregar imagem grande (>100MB)
  3. Crash ocorre
  ```
- **Esperado vs. Atual**: O que deveria acontecer vs. o que aconteceu
- **Screenshots/Videos**: Se aplicável
- **Ambiente**: OS, versão Node, versão Electron

### Sugerindo Features 💡

Crie uma issue com:

- **Título descritivo**: `[FEATURE] Suporte a GIF animado`
- **Descrição**: Por que essa feature é útil?
- **Exemplos de uso**: Como o usuário usaria?
- **Alternativas**: Outras soluções possíveis?
- **Contexto adicional**: Screenshots, links, etc

### Melhorando Documentação 📚

- Revise erros de digitação
- Esclareça instruções confusas
- Adicione exemplos
- Traduza para outros idiomas

### Corrigindo Bugs 🔧

1. Escolha um bug da lista Issues
2. Comente dizendo que vai trabalhar
3. Crie a branch com `fix/nome-bugfix`
4. Implemente a correção com testes
5. Abra PR referenciando a issue

### Implementando Features ✨

1. Discuta a feature na issue primeiro
2. Espere aprovação do maintainer
3. Crie a branch com `feature/nome-feature`
4. Implemente com testes e documentação
5. Abra PR referenciando a issue

## 🔄 Processo de Pull Request

### 1. Antes de abrir o PR

```bash
# Atualize sua branch
git fetch origin
git rebase origin/develop

# Execute validação
npm run validate

# Teste manualmente
npm run dev
```

### 2. Abra o PR

Use o template:

```markdown
## Descrição
Breve descrição do que esta PR faz

## Tipo de mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como testar
Passos para testar a mudança

## Checklist
- [ ] Testes passando
- [ ] Sem warnings de lint
- [ ] Documentação atualizada
- [ ] Commits em bom formato
```

### 3. Responda ao feedback

- Siga as sugestões ou explique seu ponto
- Faça commit com `git commit --amend --no-edit`
- Force push: `git push --force-with-lease`

### 4. Merge

Uma vez aprovada, o maintainer fará o merge.

## 🔐 Segurança

- **Nunca commithe senhas ou tokens**
- Use `.env` para secrets
- Não compartilhe dados pessoais
- Valide entrada de usuário
- Use path whitelisting para filesystem

## 🚏 Conduta

Este projeto adota um Código de Conduta baseado em:

- Respeite todos os participantes
- Feedback construtivo
- Sem comentários discriminatórios
- Reporte comportamento inadequado aos maintainers

## ❓ Dúvidas?

- Use GitHub Discussions para dúvidas
- Cheque se a pergunta já foi respondida
- Seja específico e detalhe seu problema
- Inclua versões relevantes

## 📖 Recursos

- [Exemplos de código](./examples/)
- [Guia de boas-práticas](./BEST_PRACTICES.md)
- [Guia de migração TS](./MIGRATION_GUIDE.md)
- [Documentação da API](./API.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev)

## 🎓 Nível de Experiência

- **Iniciante**: Documentação, typos, testes básicos
- **Intermediário**: Features pequenas, refactoring
- **Avançado**: Arquitetura, performance, segurança

Procure issues com labels:
- `good first issue` - Para iniciantes
- `help wanted` - Precisa de ajuda
- `p1` - Priority 1 - Urgente

## 💰 Recompensas

Se possível, mantainers reconhecem contribuidores em:
- Contributors file
- Release notes
- Twitter/Social media

## 🙏 Agradecimentos

Obrigado por ajudar a melhorar PromptSong! Cada contribuição importa. 🎉

---

**Happy coding!** 🚀

Se tiver dúvidas, abra uma Discussion ou entre em contato com o time.
