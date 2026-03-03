# 📄 Páginas Públicas PromptSong

Todos os arquivos nesta pasta (`/pages/louvor`) são páginas estáticas hospedadas no GitHub Pages e servem como:

1. **Landing Page** (`index.html`) - Apresentação do PromptSong com links de download e conexão
2. **Página de Conexão** (`connector.html`) - Interface para conectar monitores remotos

## 📁 Estrutura de Arquivos

```
pages/louvor/
├── index.html                # Landing page principal
├── connector.html            # Página de conexão para monitores remotos
├── styles/
│   └── main.css             # CSS compartilhado (landing page)
├── js/
│   ├── server-discovery.js  # Descoberta de servidores na rede local
│   └── connector.js         # Gerenciamento de conexão com servidor
├── README.md                # Documentação original do projeto
└── PAGES.md                 # Este arquivo
```

## 🎯 Uso

### Landing Page (`index.html`)

A página principal contém:

#### 🎵 Seção Hero
- Título e descrição do aplicativo
- Botões para "Baixar aplicativo" e "Conectar a uma sessão"

#### ✨ Recursos
Cards exibindo 8 recursos principais do PromptSong

#### 📥 Download
Três cards com opções de download:
- **Aplicativo Desktop** - Versão completa para Windows, macOS e Linux
- **Biblioteca de Mídia** - Músicas, imagens e bíblias
- **Código-Fonte** - Link para o repositório GitHub

#### 🌐 Conexão
Seção com dois caminhos:

**1. Descobrir Servidor Automaticamente**
- Botão "🔍 Procurar Servidores"
- Usa WebRTC para descobrir IPs locais
- Tenta conectar a servidores PromptSong na rede
- Lista de servidores encontrados
- Clique para conectar automaticamente

**2. Conexão Manual**
- Campo de IP/hostname
- Campo de porta (padrão: 5173)
- Campo de token de autenticação (opcional)
- Botão para conectar

### Página de Conexão (`connector.html`)

Abre automaticamente quando:
- Usuário escaneia um QR Code do servidor
- Usuário clica em um servidor encontrado
- Usuário abre URL com parâmetros: `connector.html?server=ws://IP:PORTA&token=TOKEN`

**Estados de Conexão:**

1. **Conectando** 
   - Spinner animado e mensagem "Aguardando autorização"

2. **Conectado ✓**
   - Mostra IP do servidor
   - Exibe papel atribuído (Projeção, Preview, etc)
   - Instruções de uso

3. **Erro ❌**
   - Mensagem de erro clara
   - Botões para "Tentar Novamente" e "Voltar"

## 🔋 Como Funciona a Descoberta

### Processo de Descoberta (`server-discovery.js`)

1. **WebRTC IP Discovery**
   - Usa RTCPeerConnection para obter IPs locais
   - Identifica a sub-rede (ex: 192.168.1.0)

2. **Port Scanning**
   - Testa múltiplos IPs da sub-rede (1, 100, 150, 200, 254)
   - Porta padrão: 5173
   - Timeout: 1s por IP

3. **Server Verification**
   - Tenta acessar rota `/remote-monitor`
   - Se responder com 200/404, servidor encontrado
   - Coleta informações e exibe na lista

4. **Auto-Connect**
   - Clique em servidor abre `connector.html` com parâmetros
   - Redireciona para a página de conexão apropriada

## 🔐 Segurança

### QR Code
- URL contém parâmetros: `server=ws://...&token=...`
- Token pode ser vazio se autenticação desabilidada

### Autenticação
- Token obrigatório: configurável no servidor
- Válido apenas enquanto servidor está rodando
- Regenerável via botão "🎲 Gerar" em Configurações

### CSP Headers
O `index.html` da aplicação principal foi atualizado para permitir:
- `connect-src`: HTTP, HTTPS, WS, WSS
- Necessário para descoberta e websocket

## 🔗 Integração com Aplicativo

### Fluxo de QR Code

1. Servidor inicia em `npm run dev`
2. Usuário acessa Configurações → Monitores
3. QR Code gerado automaticamente com URL completa
4. Smartphone escaneia QR → abre `connector.html` com parâmetros
5. `connector.js` conecta ao servidor WebSocket
6. Servidor autoriza ou pede aprovação manual
7. Monitor remoto ativo e sincronizado

### Fluxo Manual

1. Usuário clica em "Conectar a uma Sessão" na landing
2. Seleciona: "Descobrir Servidor" ou "Conexão Manual"
3. Se descoberta: seleciona servidor da lista
4. Se manual: digita IP, porta e token (opcional)
5. Redireciona para `connector.html`
6. Mesmo fluxo acima

## 📱 Responsividade

Todas as páginas são otimizadas para:
- **Desktop** - Layout completo com grid
- **Tablet** - Adaptação flexível
- **Mobile** - Stack vertical, botões em tela cheia
- **Pequenas telas** - Tipografia e espaçamento reduzidos

## 🎯 URLs Importantes

| Página | URL | Função |
|--------|-----|--------|
| Landing | `/` ou `/pages/louvor/` | Apresentação e download |
| Conexão | `/pages/louvor/connector.html?server=ws://...&token=...` | Conectar monitor remoto |
| Descoberta | `/pages/louvor/js/server-discovery.js` | Script de descoberta |
| Conector | `/pages/louvor/js/connector.js` | Script de conexão |

## 🚀 Deploy no GitHub Pages

1. Push para `main` branch
2. GitHub Actions compila automaticamente (se configurado)
3. Páginas servidas de `https://seu-usuario.github.io/promptsong/`
4. Acessível por QR Code do servidor local

## 🐛 Troubleshooting

### "Nenhum servidor encontrado"
- Verifique se servidor está rodando (`npm run dev`)
- Confirme que está na **mesma rede local** (WiFi/Ethernet)
- Tente conexão manual com IP local

### "Erro de conexão"
- Servidor rodando? Verifique `npm run dev`
- Token correto? Copie da página de Monitores
- Firewall bloqueando porta 8765 (WebSocket)?

### "Método de descoberta não funciona em iPhone"
- Use QR Code (mais confiável)
- Ou insira IP manualmente
- Navegadores iOS têm limitações de WebRTC

## 📝 Notas

- Páginas são **JavaScript puro** (sem dependências)
- Compatível com navegadores modernos (iOS Safari, Chrome mobile, Firefox)
- Découverta via WebRTC funciona em redes LAN (não funciona em públicas)
- Para app conectar de fora da rede, use URL direta com domínio fixo

## 🔧 Customização

Edite em `styles/main.css`:
- Cores: Altere `#667eea` e `#764ba2` (gradiente)
- Tipografia: `font-family` em `body {}`
- Layout: Grid columns em `.features-grid`, `.download-grid`

Edite em `js/server-discovery.js`:
- Porta: Mude `VITE_PORT = 5173`
- Timeout: Ajuste `BROADCAST_TIMEOUT`
- IPs testados: Modifique `ipsToTest` array

---

**Versão**: 2.0.0  
**Última atualização**: 3 de março de 2026
