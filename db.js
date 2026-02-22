import Dexie from 'dexie';

export const db = new Dexie('LouvorOpenDB');

// Define o esquema do banco de dados
db.version(1).stores({
  songs: '++id, title, content, author', // id auto-incremento
  settings: 'key, value'
});

// Função para popular dados iniciais (exemplo)
export const populateInitialData = async () => {
  const count = await db.songs.count();
  if (count === 0) {
    console.log("Banco de dados vazio. Criando músicas de exemplo...");
    await db.songs.bulkAdd([
      { 
        title: "Graça (Amazing Grace)", 
        content: "Graça maravilhosa\nQue doce o som\nQue salvou um miserável como eu\n\nEu estava perdido\nMas agora fui encontrado\nEra cego, mas agora eu vejo", 
        author: "John Newton" 
      },
      { title: "Porque Ele Vive", content: "Deus enviou\nSeu filho amado\nPara morrer\nEm meu lugar\n\nNa cruz pagou\nPor meus pecados\nMas o sepulcro vazio está\nPorque Ele vive", author: "Harpa Cristã" }
    ]);
    console.log("Músicas de exemplo criadas com sucesso!");
  } else {
    console.log(`Banco de dados carregado. Encontradas ${count} músicas.`);
  }
};