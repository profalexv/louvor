/**
 * Server Discovery Script
 * Procura por servidores PromptSong na rede local via UDP broadcast
 */

// Configuração
const DISCOVERY_PORT = 9876;
const BROADCAST_TIMEOUT = 5000; // 5 segundos
const VITE_PORT = 5173;

let discoverySocket = null;
let isScanning = false;
let foundServers = new Map();

/**
 * Inicia busca por servidores na rede local
 */
async function scanServers() {
  const scanBtn = document.getElementById('scan-btn');
  const stopBtn = document.getElementById('stop-scan-btn');
  const loading = document.getElementById('loading');
  const serverList = document.getElementById('server-list');

  if (isScanning) return;

  isScanning = true;
  foundServers.clear();
  serverList.innerHTML = '';
  loading.style.display = 'block';
  scanBtn.style.display = 'none';
  stopBtn.style.display = 'inline-block';

  try {
    // Tenta descobrir via WebRTC
    await discoverViaWebRTC();
  } catch (error) {
    console.error('Erro na descoberta via WebRTC:', error);
  }

  // Define timeout para parar a busca
  setTimeout(() => {
    if (isScanning) {
      stopScan();
    }
  }, BROADCAST_TIMEOUT);

  // Atualiza a lista
  updateServerList();
}

/**
 * Para a busca por servidores
 */
function stopScan() {
  isScanning = false;
  const scanBtn = document.getElementById('scan-btn');
  const stopBtn = document.getElementById('stop-scan-btn');
  const loading = document.getElementById('loading');

  loading.style.display = 'none';
  scanBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';

  if (discoverySocket) {
    discoverySocket.close();
    discoverySocket = null;
  }
}

/**
 * Descobre servidores via WebRTC (funciona em navegadores modernos)
 */
async function discoverViaWebRTC() {
  return new Promise((resolve) => {
    // Obtém IPs locais via RTCPeerConnection
    const rtc = new RTCPeerConnection({ iceServers: [] });
    
    rtc.onicecandidate = (evt) => {
      if (!evt.candidate) return;
      
      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
      const ipAddress = ipRegex.exec(evt.candidate.candidate)?.[1];
      
      if (ipAddress && !ipAddress.startsWith('127')) {
        // Tenta conectar ao servidor em cada IP da rede local
        const subnet = ipAddress.split('.').slice(0, 3).join('.');
        testServerInSubnet(subnet);
      }
    };

    rtc.createDataChannel('');
    rtc.createOffer().then(offer => rtc.setLocalDescription(offer));

    // Timeout para fecha a conexão RTC
    setTimeout(() => {
      rtc.close();
      resolve();
    }, 2000);
  });
}

/**
 * Testa se existe servidor em um IP específico
 */
async function testServerInSubnet(subnet) {
  // Testa alguns IPs comuns nessa subnet
  const ipsToTest = [1, 100, 150, 200, 254];
  
  for (const ip of ipsToTest) {
    const testIp = `${subnet}.${ip}`;
    testServerAtIP(testIp);
  }
}

/**
 * Testa conexão com um IP específico
 */
async function testServerAtIP(ip) {
  if (!isScanning) return;

  try {
    // Tenta acessar a rota /remote-monitor para detectar servidor
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(`http://${ip}:${VITE_PORT}/remote-monitor`, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok || response.status === 404) {
      // Servidor encontrado! Agora tira as informações
      getServerInfo(ip);
    }
  } catch (error) {
    // Servidor não encontrado neste IP
    console.debug(`Sem servidor em ${ip}`);
  }
}

/**
 * Obtém informações de um servidor encontrado
 */
async function getServerInfo(ip) {
  try {
    const response = await fetch(`http://${ip}:${VITE_PORT}/`, {
      signal: AbortSignal.timeout(2000),
      headers: {
        'Accept': 'text/html',
      },
    });

    if (response.ok) {
      const serverId = `${ip}:${VITE_PORT}`;
      
      if (!foundServers.has(serverId)) {
        foundServers.set(serverId, {
          id: serverId,
          ip,
          port: VITE_PORT,
          name: `PromptSong (${ip})`,
          online: true,
          lastSeen: Date.now(),
        });

        updateServerList();
      }
    }
  } catch (error) {
    console.debug(`Erro ao obter info de ${ip}:`, error.message);
  }
}

/**
 * Atualiza a lista de servidores exibida
 */
function updateServerList() {
  const serverList = document.getElementById('server-list');

  if (foundServers.size === 0 && !isScanning) {
    serverList.innerHTML = `
      <p style="text-align: center; color: #999; padding: 2rem;">
        💡 Nenhum servidor encontrado. Tente buscar novamente ou use a conexão manual.
      </p>
    `;
    return;
  }

  if (foundServers.size === 0) {
    return; // Ainda está procurando
  }

  serverList.innerHTML = '';

  foundServers.forEach((server) => {
    const serverItem = document.createElement('div');
    serverItem.className = 'server-item';
    serverItem.innerHTML = `
      <div class="server-name">${server.name}</div>
      <div class="server-ip">${server.ip}:${server.port}</div>
      <div class="server-status">
        <span class="status-online">🟢 Online</span>
      </div>
    `;
    serverItem.onclick = () => connectToServer(server);
    serverList.appendChild(serverItem);
  });
}

/**
 * Conecta a um servidor encontrado
 */
function connectToServer(server) {
  const wsUrl = `ws://${server.ip}:${server.port}`;
  const token = document.getElementById('auth-token').value || '';

  // Monta a URL de redirecionamento para o remote-monitor
  const redirectUrl = `http://${server.ip}:${server.port}/remote-monitor?server=${encodeURIComponent(wsUrl)}${
    token ? `&token=${encodeURIComponent(token)}` : ''
  }`;

  // Abre em uma aba nova
  window.open(redirectUrl, 'prompt-monitor');

  // Também atualiza os campos para referência
  document.getElementById('server-ip').value = server.ip;
  document.getElementById('server-port').value = server.port;

  stopScan();
}

/**
 * Conecta manualmente a um servidor
 */
function manualConnect() {
  const ip = document.getElementById('server-ip').value.trim();
  const port = document.getElementById('server-port').value || '5173';
  const token = document.getElementById('auth-token').value || '';

  if (!ip) {
    alert('⚠️ Digite o IP ou hostname do servidor');
    return;
  }

  // Valida se é um IP/hostname válido
  const ipRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$|^(\d{1,3}\.){3}\d{1,3}$/i;
  if (!ipRegex.test(ip)) {
    alert('⚠️ IP ou hostname inválido');
    return;
  }

  const wsUrl = `ws://${ip}:${port}`;
  const redirectUrl = `http://${ip}:${port}/remote-monitor?server=${encodeURIComponent(wsUrl)}${
    token ? `&token=${encodeURIComponent(token)}` : ''
  }`;

  // Abre em uma aba nova
  window.open(redirectUrl, 'prompt-monitor');
}

/**
 * Inicialização ao carregar a página
 */
document.addEventListener('DOMContentLoaded', () => {
  // Event listeners for Enter key
  document.getElementById('server-ip').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') manualConnect();
  });

  document.getElementById('auth-token').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') manualConnect();
  });

  // Para descoberta inicial (opcional)
  // Descomente a linha abaixo para iniciar a busca automaticamente
  // scanServers();
});

/**
 * Polyfill para AbortSignal.timeout (alguns navegadores antigos)
 */
if (!AbortSignal.timeout) {
  AbortSignal.timeout = function(ms) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  };
}
