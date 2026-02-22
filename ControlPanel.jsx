import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, populateInitialData } from '../db';
import { useProjectionSender } from '../hooks/useProjection';
import SongManager from './SongManager';

const ControlPanel = () => {
  const { sendSlide, clearScreen } = useProjectionSender();
  const songs = useLiveQuery(() => db.songs.toArray());
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    populateInitialData();
  }, []);

  const openProjector = () => {
    window.open('/projector', 'ProjectorWindow', 'width=800,height=600,menubar=no,toolbar=no');
  };

  // Divide a música em slides baseados em parágrafos duplos
  const getSlides = (content) => {
    if (!content) return [];
    return content.split('\n\n');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Louvor Open Web</h1>
        <div className="flex gap-2">
          <button onClick={clearScreen} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-bold">
            BLACK (F5)
          </button>
          <button onClick={openProjector} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold">
            Abrir Projetor
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Coluna Esquerda: Lista de Músicas e Editor */}
        <aside className="w-1/3 p-4 overflow-y-auto border-r border-gray-300 bg-gray-50">
          <SongManager />
          
          <div className="mt-6">
            <h3 className="font-bold text-gray-700 mb-2">Biblioteca de Músicas</h3>
            <div className="flex flex-col gap-2">
              {!songs ? (
                <div className="text-gray-500 italic p-2">Carregando banco de dados...</div>
              ) : songs.length === 0 ? (
                <div className="text-gray-500 italic p-2">Nenhuma música encontrada. Adicione uma acima.</div>
              ) : songs.map(song => (
                  <div 
                    key={song.id}
                    onClick={() => setSelectedSong(song)}
                    className={`p-3 rounded cursor-pointer transition ${selectedSong?.id === song.id ? 'bg-blue-200 border-blue-400 border' : 'bg-white hover:bg-gray-200 shadow-sm'}`}
                  >
                    <div className="font-bold">{song.title}</div>
                    <div className="text-xs text-gray-500">{song.author}</div>
                  </div>
                ))}
            </div>
          </div>
        </aside>

        {/* Coluna Direita: Preview e Controle de Slides */}
        <main className="w-2/3 p-4 bg-gray-200 overflow-y-auto">
          {selectedSong ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedSong.title}</h2>
              <div className="grid grid-cols-2 gap-4">
                {getSlides(selectedSong.content).map((verse, idx) => (
                  <div 
                    key={idx}
                    onClick={() => sendSlide({ text: verse })}
                    className="bg-white p-6 rounded shadow-md cursor-pointer hover:ring-4 ring-blue-400 transition flex items-center justify-center min-h-[150px]"
                  >
                    <pre className="font-sans text-center text-lg whitespace-pre-wrap">{verse}</pre>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Selecione uma música para projetar
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ControlPanel;