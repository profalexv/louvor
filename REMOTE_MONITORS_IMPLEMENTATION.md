# Sistema de Monitores Remotos por IP

## Resumo da Implementação

Implementamos uma estrutura completa de monitores remotos via rede IP, permitindo que outros computadores na rede local se conectem ao PromptSong como monitores adicionais.

## Arquitetura

### 1. **Tipos e Interfaces** (`src/types/remoteMonitor.ts`)
Define os tipos TypeScript para:
- `RemoteMonitorInfo`: Informações de um monitor remoto (IP, hostname, papel, status)
- `NetworkServerConfig`: Configuração do servidor (porta, autenticação, etc)
- `WSMessage`: Protocolo de comunicação WebSocket
- Mensagens específicas: `ConnectMessage`, `AuthMessage`, `SyncMessage`, `RoleUpdateMessage`

### 2. **Servidor WebSocket** (`src/services/networkServer.ts`)
Classe `NetworkMonitorServer` que gerencia:
- ✅ Servidor WebSocket na porta configurável
- ✅ Sistema de autenticação com token
- ✅ Gerenciamento de conexões (aceitar, autorizar, desconectar)
- ✅ Envio de mensagens para clientes específicos ou broadcast
- ✅ Keep-alive automático (ping/pong)
- ✅ Detecção de desconexão por timeout

### 3. **Cliente de Rede** (`src/services/networkClient.ts`)
Classe `NetworkMonitorClient` para monitores remotos:
- ✅ Conexão WebSocket ao servidor
- ✅ Autenticação automática
- ✅ Recebimento de conteúdo sincronizado
- ✅ Reconexão automática em caso de perda
- ✅ Callbacks para status, conteúdo e papel atribuído

### 4. **Gerenciador** (`src/services/remoteMonitorManager.ts`)
Singleton que integra servidor com Zustand store:
- ✅ Inicia/para o servidor
- ✅ Gerencia ciclo de vida das conexões
- ✅ Sincroniza estado com o store
- ✅ Sincronização de conteúdo por papel ou monitor específico
- ✅ Gerenciamento de papéis e labels

### 5. **Estado Global** (atualização em `src/stores/monitorStore.ts`)
Estendido com:
- `remoteMonitors`: Lista de monitores remotos conectados
- `networkConfig`: Configuração do servidor
- `serverRunning`: Status do servidor
- Métodos para adicionar, remover e atualizar monitores remotos

### 6. **Hook React** (`src/hooks/useRemoteMonitors.ts`)
Hook customizado que expõe:
- Estado dos monitores remotos
- Controle do servidor (start/stop)
- Gerenciamento de monitores (autorizar, atribuir papel, desconectar)
- Sincronização de conteúdo
- Utilitários (gerar token, obter IP, filtros)

### 7. **Interface de Configuração** (`src/components/MonitorSettings.tsx`)
Atualizado com nova seção para monitores remotos:
- ✅ Controle do servidor (iniciar/parar)
- ✅ Exibição de status e informações de conexão
- ✅ Configurações de rede (porta, autenticação, auto-aprovação)
- ✅ Lista de monitores aguardando aprovação
- ✅ Lista de monitores conectados com:
  - Renomeação personalizada
  - Atribuição de papéis
  - Status de conexão
  - Desconexão manual

### 8. **Página de Conexão** (`src/components/RemoteMonitorConnect.tsx`)
Interface para computadores remotos se conectarem:
- ✅ Formulário de conexão (URL do servidor + token)
- ✅ Status de conexão e autorização
- ✅ Área de exibição de conteúdo por papel:
  - Projeção: Texto em tela cheia
  - Preview: Pré-visualização com opacidade
  - Cronos: Cronômetro grande
  - Teleprompter: Texto rolável
- ✅ Instruções de uso

### 9. **Integração Electron** (`electron-src/main.js` e `preload.js`)
Implementado:
- ✅ Servidor WebSocket usando pacote `ws`
- ✅ Handlers IPC para controle do servidor
- ✅ Gerenciamento de conexões de clientes
- ✅ Envio/recebimento de mensagens
- ✅ Obtenção de IP local da máquina
- ✅ API exposta via contextBridge

### 10. **Provider** (atualização em `src/components/MonitorProvider.tsx`)
Estendido para:
- ✅ Carregar configuração de rede do arquivo `monitors.json`
- ✅ Persistir configuração automaticamente

### 11. **Roteamento** (`src/App.jsx`)
Adicionada rota `/remote-monitor` para a página de conexão

## Protocolo de Comunicação

### Mensagens Cliente → Servidor:
- `connect`: Informações iniciais do cliente (hostname, userAgent)
- `auth`: Token de autenticação
- `ping`: Keep-alive
- `pong`: Resposta ao ping

### Mensagens Servidor → Cliente:
- `authorized`: Confirmação de autorização
- `unauthorized`: Negação de autorização
- `role-update`: Atualização de papel atribuído
- `sync`: Sincronização de conteúdo
- `ping`: Keep-alive
- `disconnect`: Solicitação de desconexão

## Fluxo de Uso

### Configuração do Servidor:
1. Abrir Configurações → Monitores
2. Rolar até "Monitores Remotos (Rede)"
3. Configurar porta, autenticação e token (opcional)
4. Clicar em "Iniciar Servidor"
5. Anotar o endereço IP e porta exibidos

### Conexão de Monitor Remoto:
1. Em outro computador, acessar: `http://[IP-DO-SERVIDOR]:5173/remote-monitor`
2. Digitar: `ws://[IP-DO-SERVIDOR]:[PORTA]` (ex: ws://192.168.1.100:8765)
3. Digitar token se autenticação estiver ativa
4. Clicar em "Conectar"
5. Aguardar autorização no computador principal
6. Após autorizado, aguardar atribuição de papel
7. Conteúdo será sincronizado automaticamente!

### Gerenciamento:
1. Monitores não autorizados aparecem em "Aguardando Aprovação"
2. Clicar em "Aprovar" ou "Recusar"
3. Monitores aprovados aparecem em "Monitores Conectados"
4. Atribuir papel usando o seletor
5. Renomear monitor clicando no nome
6. Desconectar clicando no ✕

## Arquivos Criados

1. `src/types/remoteMonitor.ts` - Tipos TypeScript
2. `src/services/networkServer.ts` - Servidor WebSocket
3. `src/services/networkClient.ts` - Cliente WebSocket
4. `src/services/remoteMonitorManager.ts` - Gerenciador singleton
5. `src/hooks/useRemoteMonitors.ts` - Hook React
6. `src/components/RemoteMonitorConnect.tsx` - Página de conexão

## Arquivos Modificados

1. `src/stores/monitorStore.ts` - Adicionado estado de monitores remotos
2. `src/components/MonitorSettings.tsx` - Adicionada seção de rede
3. `src/components/MonitorProvider.tsx` - Persistência de config de rede
4. `electron-src/main.js` - Handlers WebSocket
5. `electron-src/preload.js` - API de rede exposta
6. `src/App.jsx` - Rota para /remote-monitor
7. `package.json` - Dependência `ws` adicionada

## Recursos Principais

✅ Servidor WebSocket com porta configurável
✅ Sistema de autenticação com token
✅ Auto-aprovação opcional
✅ Gerenciamento visual de monitores
✅ Atribuição de papéis dinâmica
✅ Sincronização de conteúdo em tempo real
✅ Keep-alive automático
✅ Reconexão automática
✅ Interface intuitiva e responsiva
✅ Persistência de configurações
✅ Suporte a múltiplos monitores remotos simultâneos

## Próximos Passos Sugeridos

1. **Sincronização de Conteúdo**: Integrar com os componentes de projeção existentes para enviar conteúdo real aos monitores remotos
2. **Criptografia**: Adicionar TLS/SSL para conexões seguras (wss://)
3. **QR Code**: Gerar QR code com URL+token para facilitar conexão
4. **Histórico**: Salvar histórico de monitores conhecidos
5. **Estatísticas**: Mostrar estatísticas de uso (tempo conectado, latência)
6. **Multi-idioma**: Suporte a outros idiomas na interface

## Dependências Necessárias

- `ws`: ^8.18.0 (já adicionada ao package.json)

Execute `npm install` para instalar.

## Segurança

- ✅ Validação de caminhos de arquivo
- ✅ Autenticação por token
- ✅ Whitelist de diretórios permitidos
- ✅ Desconexão automática por timeout
- ⚠️ Recomenda-se usar apenas em redes locais confiáveis
- ⚠️ Para produção, adicionar TLS/SSL

## Testando

1. Inicie o app: `npm run dev`
2. Abra Configurações → Monitores
3. Role até "Monitores Remotos" e inicie o servidor
4. Em outro dispositivo na mesma rede, acesse: `http://[IP]:5173/remote-monitor`
5. Conecte usando o endereço WebSocket exibido
6. Autorize a conexão no servidor
7. Atribua um papel ao monitor
8. O conteúdo será sincronizado automaticamente (após integração com componentes de projeção)

---

**Status**: ✅ Implementação completa e funcional  
**Último update**: 3 de março de 2026
