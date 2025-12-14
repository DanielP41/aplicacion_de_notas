function NoteItem({ note, onDelete, onArchive, onUnarchive, onEdit }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{note.title}</h3>
        {note.category && (
          <span style={styles.categoryBadge}>{note.category}</span>
        )}
      </div>
      <p style={styles.content}>{note.content || 'Sin contenido'}</p>
      <div style={styles.meta}>
        <small>Creada: {new Date(note.createdAt).toLocaleString()}</small>
      </div>
      <div style={styles.actions}>
        {!note.archived && onEdit && (
          <button onClick={() => onEdit(note)} style={styles.editBtn}>
            ✏️ Editar
          </button>
        )}
        {!note.archived ? (
          <button onClick={() => onArchive(note.id)} style={styles.archiveBtn}>
            📦 Archivar
          </button>
        ) : (
          <button onClick={() => onUnarchive(note.id)} style={styles.unarchiveBtn}>
            📤 Desarchivar
          </button>
        )}
        <button onClick={() => onDelete(note.id)} style={styles.deleteBtn}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '15px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  title: {
    margin: '0',
    color: '#333',
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  content: {
    margin: '0 0 10px 0',
    color: '#666',
    whiteSpace: 'pre-wrap',
  },
  meta: {
    color: '#999',
    fontSize: '12px',
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  editBtn: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  archiveBtn: {
    padding: '8px 16px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  unarchiveBtn: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteBtn: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default NoteItem;
