import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';
import { noteService } from './services/noteService';
import './App.css';

function App() {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga notas al inicio
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const [active, archived] = await Promise.all([
        noteService.getActiveNotes(),
        noteService.getArchivedNotes()
      ]);
      setActiveNotes(active);
      setArchivedNotes(archived);
      setError(null);
    } catch (err) {
      setError('Error al cargar las notas: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      await noteService.createNote(noteData);
      await loadNotes();
    } catch (err) {
      alert('Error al crear la nota: ' + err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta nota?')) return;

    try {
      await noteService.deleteNote(id);
      await loadNotes();
    } catch (err) {
      alert('Error al eliminar la nota: ' + err.message);
    }
  };

  const handleArchiveNote = async (id) => {
    try {
      await noteService.archiveNote(id);
      await loadNotes();
    } catch (err) {
      alert('Error al archivar la nota: ' + err.message);
    }
  };

  const handleUnarchiveNote = async (id) => {
    try {
      await noteService.unarchiveNote(id);
      await loadNotes();
    } catch (err) {
      alert('Error al desarchivar la nota: ' + err.message);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>📝 Gestor de Notas</h1>
        <p>Ensolvers Challenge - Fase 1</p>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <NoteForm onNoteCreated={handleCreateNote} />

      <div style={styles.tabs}>
        <button
          onClick={() => setShowArchived(false)}
          style={{
            ...styles.tab,
            ...(showArchived ? {} : styles.tabActive)
          }}
        >
          Notas Activas ({activeNotes.length})
        </button>
        <button
          onClick={() => setShowArchived(true)}
          style={{
            ...styles.tab,
            ...(showArchived ? styles.tabActive : {})
          }}
        >
          Notas Archivadas ({archivedNotes.length})
        </button>
      </div>

      <div style={styles.notesList}>
        {!showArchived ? (
          activeNotes.length === 0 ? (
            <p style={styles.empty}>No hay notas activas. ¡Crea tu primera nota!</p>
          ) : (
            activeNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onArchive={handleArchiveNote}
              />
            ))
          )
        ) : (
          archivedNotes.length === 0 ? (
            <p style={styles.empty}>No hay notas archivadas.</p>
          ) : (
            archivedNotes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUnarchive={handleUnarchiveNote}
              />
            ))
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '20px',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  tabActive: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  notesList: {
    marginTop: '20px',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
};

export default App;