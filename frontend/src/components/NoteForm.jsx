import { useState, useEffect } from 'react';

function NoteForm({ onNoteCreated, onNoteUpdated, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // Categorías predefinidas
  const categories = ['Personal', 'Trabajo', 'Ideas', 'Recordatorios', 'Otros'];

  // Cargar datos cuando se está editando
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
      setCategory(editingNote.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const noteData = { title, content, category };

    if (editingNote) {
      // Modo edición
      await onNoteUpdated(editingNote.id, noteData);
    } else {
      // Modo creación
      await onNoteCreated(noteData);
    }

    // Limpiar formulario
    setTitle('');
    setContent('');
    setCategory('');
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setCategory('');
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div style={styles.container}>
      <h2>{editingNote ? '✏️ Editar Nota' : '➕ Crear Nueva Nota'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Título *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
          rows="4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">Sin categoría</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            {editingNote ? '💾 Actualizar' : '➕ Crear Nota'}
          </button>
          {editingNote && (
            <button type="button" onClick={handleCancel} style={styles.cancelBtn}>
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#757575',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default NoteForm;
