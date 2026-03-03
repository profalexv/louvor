# 📚 Examples - Using the New Architecture

Este arquivo contém exemplos práticos de como usar as novas APIs migradas para Zustand e TypeScript.

## 🎯 Table of Contents

- [Zustand Stores](#zustand-stores)
- [Database Service](#database-service)
- [Feedback System](#feedback-system)
- [Projection System](#projection-system)
- [TypeScript Components](#typescript-components)

---

## 🏪 Zustand Stores

### App Store

#### Basic Usage

```typescript
import { useAppStore } from '@stores/appStore';

function MyComponent() {
  // ✅ Subscribe to specific state (optimized)
  const selectedSong = useAppStore((state) => state.selectedSong);
  const setSelectedSong = useAppStore((state) => state.setSelectedSong);

  // ❌ Avoid subscribing to entire store (causes re-renders)
  // const store = useAppStore(); // Don't do this!

  const handleSelect = (song) => {
    setSelectedSong(song);
  };

  return <div>{selectedSong?.title}</div>;
}
```

#### Using Multiple Values

```typescript
import { useAppStore } from '@stores/appStore';

function SettingsButton() {
  // Subscribe to multiple values with shallow equality
  const { showSettings, setShowSettings } = useAppStore(
    (state) => ({
      showSettings: state.showSettings,
      setShowSettings: state.setShowSettings,
    }),
    shallow // Import from 'zustand/shallow'
  );

  return (
    <button onClick={() => setShowSettings(!showSettings)}>
      {showSettings ? 'Close' : 'Open'} Settings
    </button>
  );
}
```

#### Outside React Components

```typescript
import { useAppStore } from '@stores/appStore';

// Access state outside components
const currentSong = useAppStore.getState().selectedSong;

// Mutate state outside components
useAppStore.getState().setShowSettings(true);

// Subscribe to changes
const unsubscribe = useAppStore.subscribe((state) => {
  console.log('State changed:', state);
});

// Don't forget to unsubscribe
unsubscribe();
```

### Projection Store

#### Sending Slides

```typescript
import { useProjectionStore } from '@stores/projectionStore';

function SongProjector({ song }) {
  const sendSlide = useProjectionStore((state) => state.sendSlide);
  const clearScreen = useProjectionStore((state) => state.clearScreen);

  const projectSong = () => {
    sendSlide({
      type: 'song',
      content: {
        title: song.title,
        lyrics: song.content,
      },
    });
  };

  return (
    <>
      <button onClick={projectSong}>Project</button>
      <button onClick={clearScreen}>Clear</button>
    </>
  );
}
```

#### Projection Config

```typescript
import { useProjectionStore } from '@stores/projectionStore';

function ProjectionSettings() {
  const config = useProjectionStore((state) => state.projectionConfig);
  const updateConfig = useProjectionStore((state) => state.updateProjectionConfig);

  const increaseFontSize = () => {
    updateConfig({
      fontSize: (config.fontSize || 48) + 4,
    });
  };

  return (
    <div>
      <p>Current font size: {config.fontSize}px</p>
      <button onClick={increaseFontSize}>Increase</button>
    </div>
  );
}
```

---

## 💾 Database Service

### Basic Operations

```typescript
import { db } from '@services/database';
import { ErrorHandler } from '@services/errorHandler';

async function searchSongs(query: string) {
  try {
    const results = await db.searchSongs(query, 20);
    console.log(`Found ${results.length} songs`);
    return results;
  } catch (error) {
    throw ErrorHandler.handle(error);
  }
}

async function saveSong(songData) {
  try {
    const id = await db.saveSong({
      title: songData.title,
      content: songData.content,
      author: songData.author,
      album: songData.album || 'Default',
    });
    
    console.log('Song saved with ID:', id);
    return id;
  } catch (error) {
    throw ErrorHandler.handle(error);
  }
}
```

### Search by Number

```typescript
import { db } from '@services/database';

async function findHymnByNumber(number: number, hymnal: string) {
  try {
    const songs = await db.findByNumber(number, hymnal);
    
    if (songs.length === 0) {
      console.warn(`No hymn #${number} found in ${hymnal}`);
      return null;
    }
    
    return songs[0];
  } catch (error) {
    console.error('Failed to find hymn:', error);
    return null;
  }
}

// Usage
const hymn = await findHymnByNumber(123, 'HASD');
```

### Album Management

```typescript
import { db } from '@services/database';

async function loadAlbumSongs(albumName: string) {
  try {
    const songs = await db.getSongsByAlbum(albumName);
    return songs.sort((a, b) => (a.number || 0) - (b.number || 0));
  } catch (error) {
    console.error('Failed to load album:', error);
    return [];
  }
}

async function getAvailableAlbums() {
  try {
    const albums = await db.getAlbums();
    return ['All Albums', ...albums];
  } catch (error) {
    console.error('Failed to get albums:', error);
    return ['All Albums'];
  }
}
```

### Settings Management

```typescript
import { db } from '@services/database';

// Save user preference
await db.setSetting('theme', 'dark');
await db.setSetting('fontSize', 18);
await db.setSetting('lastUsedAlbum', 'HASD 2022');

// Load user preference with default
const theme = await db.getSetting('theme', 'light');
const fontSize = await db.getSetting<number>('fontSize', 16);
const lastAlbum = await db.getSetting<string>('lastUsedAlbum', 'Default');

console.log(`Theme: ${theme}, Font: ${fontSize}px, Last: ${lastAlbum}`);
```

---

## 💬 Feedback System

### Basic Feedback

```typescript
import { useFeedback } from '@hooks/useFeedback';

function SaveButton() {
  const { showFeedback } = useFeedback();

  const handleSave = async () => {
    try {
      await saveSomething();
      
      showFeedback({
        message: 'Saved successfully!',
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      showFeedback({
        message: 'Failed to save',
        type: 'error',
        duration: 5000,
      });
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### Manual Control

```typescript
import { useFeedback } from '@hooks/useFeedback';

function FormComponent() {
  const { showFeedback, clearFeedback } = useFeedback();

  const showPersistentMessage = () => {
    showFeedback({
      message: 'Processing... This will stay until you close it.',
      type: 'info',
      duration: 0, // Won't auto-close
    });
  };

  const closeMessage = () => {
    clearFeedback();
  };

  return (
    <>
      <button onClick={showPersistentMessage}>Show Persistent</button>
      <button onClick={closeMessage}>Close</button>
    </>
  );
}
```

### Direct Store Access

```typescript
import { useAppStore } from '@stores/appStore';

// Outside React component
function showGlobalError(message: string) {
  useAppStore.getState().showFeedback({
    message,
    type: 'error',
    duration: 5000,
  });
}

// Usage in any service
import { showGlobalError } from './utils';

async function loadData() {
  try {
    // ...
  } catch (error) {
    showGlobalError('Failed to load data');
  }
}
```

---

## 📺 Projection System

### Basic Projection

```typescript
import { useProjectionZ } from '@hooks/useProjectionZ';

function Projector({ content }) {
  const { sendSlide, clearScreen } = useProjection();

  const project = () => {
    sendSlide({
      type: 'song',
      content: {
        title: content.title,
        verses: content.verses,
      },
    });
  };

  return (
    <div>
      <button onClick={project}>Project</button>
      <button onClick={clearScreen}>Clear</button>
    </div>
  );
}
```

### Preview and Project

```typescript
import { useProjection } from '@hooks/useProjectionZ';

function SongControls({ song }) {
  const { sendSlide, sendPreview } = useProjection();

  const showPreview = () => {
    sendPreview({
      type: 'song',
      content: { title: song.title, lyrics: song.content },
    });
  };

  const projectToScreen = () => {
    sendSlide({
      type: 'song',
      content: { title: song.title, lyrics: song.content },
    });
  };

  return (
    <>
      <button onClick={showPreview}>Preview</button>
      <button onClick={projectToScreen}>Project</button>
    </>
  );
}
```

### Timer Projection

```typescript
import { useProjection } from '@hooks/useProjectionZ';

function TimerControl() {
  const {
    sendSlide,
    isProjectingTimer,
    setIsProjectingTimer,
  } = useProjection();

  const startTimer = (minutes: number) => {
    setIsProjectingTimer(true);
    
    sendSlide({
      type: 'timer',
      content: {
        duration: minutes * 60,
        autoStart: true,
      },
    });
  };

  return (
    <div>
      <button onClick={() => startTimer(5)}>
        Start 5 min timer
      </button>
      {isProjectingTimer && <p>Timer is active</p>}
    </div>
  );
}
```

---

## 🎨 TypeScript Components

### Typed Component with Props

```typescript
import React from 'react';

interface SongCardProps {
  song: {
    id: number;
    title: string;
    author?: string;
    number?: number;
  };
  onSelect: (id: number) => void;
  selected?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onSelect, 
  selected = false 
}) => {
  return (
    <div
      className={`song-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(song.id)}
    >
      <h3>{song.title}</h3>
      {song.author && <p>By: {song.author}</p>}
      {song.number && <span>#{song.number}</span>}
    </div>
  );
};

export default SongCard;
```

### Component with Generics

```typescript
import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;
  emptyMessage?: string;
}

function List<T extends { id: string | number }>({
  items,
  renderItem,
  onItemClick,
  emptyMessage = 'No items',
}: ListProps<T>) {
  if (items.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onItemClick?.(item)}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default List;

// Usage
<List
  items={songs}
  renderItem={(song) => <span>{song.title}</span>}
  onItemClick={(song) => console.log(song)}
  emptyMessage="No songs found"
/>
```

### Hook with TypeScript

```typescript
import { useState, useEffect } from 'react';
import { db } from '@services/database';
import { Song } from '@types';

export function useSongSearch(query: string) {
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const songs = await db.searchSongs(query);
        setResults(songs);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return { results, loading, error };
}

// Usage in component
function SearchComponent() {
  const [query, setQuery] = useState('');
  const { results, loading, error } = useSongSearch(query);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Searching...</p>}
      {error && <p>Error: {error.message}</p>}
      {results.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </>
  );
}
```

---

## 🎭 Advanced Patterns

### Combining Multiple Stores

```typescript
import { useAppStore } from '@stores/appStore';
import { useProjectionStore } from '@stores/projectionStore';

function ProjectCurrentSong() {
  const selectedSong = useAppStore((state) => state.selectedSong);
  const sendSlide = useProjectionStore((state) => state.sendSlide);
  const showFeedback = useAppStore((state) => state.showFeedback);

  const projectCurrent = () => {
    if (!selectedSong) {
      showFeedback({
        message: 'No song selected',
        type: 'warning',
      });
      return;
    }

    sendSlide({
      type: 'song',
      content: selectedSong,
    });

    showFeedback({
      message: `Projecting: ${selectedSong.title}`,
      type: 'success',
    });
  };

  return (
    <button onClick={projectCurrent} disabled={!selectedSong}>
      Project Selected Song
    </button>
  );
}
```

### Using with Error Handler

```typescript
import { useAppStore } from '@stores/appStore';
import { db } from '@services/database';
import { ErrorHandler } from '@services/errorHandler';

function DeleteSongButton({ songId }: { songId: number }) {
  const showFeedback = useAppStore((state) => state.showFeedback);

  const handleDelete = async () => {
    try {
      await db.deleteSong(songId);
      
      showFeedback({
        message: 'Song deleted successfully',
        type: 'success',
      });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      const userMessage = ErrorHandler.getUserMessage(appError);
      
      showFeedback({
        message: userMessage,
        type: 'error',
      });
    }
  };

  return (
    <button onClick={handleDelete} className="danger">
      Delete Song
    </button>
  );
}
```

---

**Happy Coding!** 🎉

Para mais exemplos, veja os testes em `src/**/__tests__/`
