/**
 * Connector Script
 * Gerencia a conexão com o servidor PromptSong via URL parameters
 */

let ws = null;
let connectionTimeout = null;

/**
 * Inicializa a conexão
 */
function initConnection() {
  // Obtém parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  const serverUrl = params.get('server');
  const authToken = params.get('token');

  const statusEl = document.getElementById('status');
  const detailEl = document.getElementById('status-detail');

  if (!serverUrl) {
    showError('Parâmetro de servidor não encontrado. Escaneie um QR Code válido ou verifique a URL.');
    return;
  }

  // Atualiza URL na tela (remove params sensíveis)
  const cleanUrl = serverUrl.split('?')[0];
  document.getElementById('server-ip').textContent = extractIP(serverUrl);

  detailEl.textContent = `Conectando a ${cleanUrl}...`;

  // Tenta conectar
  connect(serverUrl, authToken);

  // Timeout de 10 segundos
  connectionTimeout = setTimeout(() => {
    if (ws && ws.readyState !== WebSocket.OPEN) {
      showError('Tempo limite para conexão excedido. Verifique se o servidor está ativo.');
    }
  }, 10000);
}

/**
 * Conecta ao servidor WebSocket
 */
function connect(serverUrl, authToken) {
  try {
    ws = new WebSocket(serverUrl);

    ws.onopen = () => {
      clearTimeout(connectionTimeout);
      console.log('[Connector] Connected to server');

      // Envia informações do cliente
      const connectMsg = {
        type: 'connect',
        payload: {
          hostname: window.location.hostname,
          userAgent: navigator.userAgent,
        },
        timestamp: Date.now(),
      };

      ws.send(JSON.stringify(connectMsg));

      // Se tem token, envia autenticação
      if (authToken) {
        const authMsg = {
          type: 'auth',
          payload: { token: authToken },
          timestamp: Date.now(),
        };
        ws.send(JSON.stringify(authMsg));
      }

      updateStatus('conectando', 'Aguardando autorização do servidor...');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        handleMessage(message);
      } catch (error) {
        console.error('[Connector] Failed to parse message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('[Connector] WebSocket error:', error);
      showError('Erro de conexão. Verifique se o servidor está acessível.');
    };

    ws.onclose = () => {
      console.log('[Connector] Disconnected from server');
      showError('Conexão fechada pelo servidor. Tente novamente.');
    };
  } catch (error) {
    console.error('[Connector] Failed to connect:', error);
    showError(`Erro ao conectar: ${error.message}`);
  }
}

/**
 * Processa mensagens do servidor
 */
function handleMessage(message) {
  switch (message.type) {
    case 'authorized':
      handleAuthorized(message);
      break;
    case 'unauthorized':
      handleUnauthorized(message);
      break;
    case 'role-update':
      handleRoleUpdate(message);
      break;
    case 'sync':
      handleSync(message);
      break;
    case 'ping':
      sendPong();
      break;
    case 'disconnect':
      handleDisconnect(message);
      break;
    default:
      console.warn('[Connector] Unknown message type:', message.type);
  }
}

/**
 * Autorização bem-sucedida
 */
function handleAuthorized(message) {
  clearTimeout(connectionTimeout);
  updateStatus('conectado', 'Autorizado pelo servidor');
  document.getElementById('error-box').style.display = 'none';
  document.getElementById('success-info').style.display = 'block';
  console.log('[Connector] Authorized');
}

/**
 * Autorização rejeitada
 */
function handleUnauthorized(message) {
  clearTimeout(connectionTimeout);
  const reason = message.payload?.reason || 'desconhecido';
  
  if (reason === 'auth_required') {
    showError('Este servidor requer autenticação. Verifique o token fornecido.');
  } else if (reason === 'invalid_token') {
    showError('Token de autenticação inválido. Tente novamente.');
  } else {
    showError(`Autorização rejeitada: ${reason}`);
  }

  if (ws) ws.close();
}

/**
 * Atualização de papel atribuído
 */
function handleRoleUpdate(message) {
  const role = message.payload?.role;
  if (role) {
    const roleNames = {
      'projection': 'Projeção Principal',
      'preview': 'Pré-visualização',
      'cronos': 'Cronômetro',
      'teleprompter': 'Teleprompter',
    };
    document.getElementById('server-role').textContent = roleNames[role] || role;
  }
}

/**
 * Recebe conteúdo sincronizado
 */
function handleSync(message) {
  const content = message.payload?.content;
  const role = message.payload?.role;

  console.log('[Connector] Received sync:', { role, content });

  // Aqui você pode renderizar o conteúdo apropriado
  // Por enquanto, apenas loga
}

/**
 * Responde ao ping do servidor
 */
function sendPong() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'pong',
      timestamp: Date.now(),
    }));
  }
}

/**
 * Desconexão solicitada pelo servidor
 */
function handleDisconnect(message) {
  showError('Desconectado pelo servidor.');
  if (ws) ws.close();
}

/**
 * Atualiza status exibido
 */
function updateStatus(state, text) {
  const statusEl = document.getElementById('status');
  const textEl = statusEl.querySelector('.status-text');
  const detailEl = document.getElementById('status-detail');

  statusEl.className = `status ${state}`;
  textEl.textContent = text;

  if (state === 'conectado') {
    statusEl.innerHTML = `
      <div class="status-icon">✓</div>
      <div class="status-text">Conectado</div>
      <div class="status-detail">${text}</div>
    `;
  } else if (state === 'conectando') {
    statusEl.innerHTML = `
      <div class="spinner"></div>
      <div class="status-text">Conectando</div>
      <div class="status-detail">${text}</div>
    `;
  }
}

/**
 * Mostra erro
 */
function showError(message) {
  const errorBox = document.getElementById('error-box');
  const errorMsg = document.getElementById('error-message');
  const successInfo = document.getElementById('success-info');

  errorMsg.textContent = message;
  errorBox.style.display = 'block';
  successInfo.style.display = 'none';

  const statusEl = document.getElementById('status');
  statusEl.className = 'status error';
  statusEl.innerHTML = `
    <div class="status-icon">❌</div>
    <div class="status-text">Erro na Conexão</div>
    <div class="status-detail">${message}</div>
  `;
}

/**
 * Tenta reconectar
 */
function retryConnection() {
  if (ws) ws.close();
  document.getElementById('error-box').style.display = 'none';
  document.getElementById('success-info').style.display = 'none';
  initConnection();
}

/**
 * Volta para a página inicial
 */
function goHome() {
  if (ws) ws.close();
  window.location.href = '/';
}

/**
 * Extrai IP da URL WebSocket
 */
function extractIP(wsUrl) {
  try {
    const match = wsUrl.match(/\/\/([^:]+)/);
    return match ? match[1] : wsUrl;
  } catch {
    return wsUrl;
  }
}

/**
 * Evita saída acidental
 */
window.addEventListener('beforeunload', (e) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    e.preventDefault();
    e.returnValue = '';
  }
});

/**
 * Inicializa ao carregar
 */
document.addEventListener('DOMContentLoaded', initConnection);
