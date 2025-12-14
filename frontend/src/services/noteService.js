import axios from 'axios';

const API_URL = 'http://localhost:8081/api/notes';

export const noteService = {
  // Obtener todas las notas activas
  getActiveNotes: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Obtener todas las notas archivadas
  getArchivedNotes: async () => {
    const response = await axios.get(`${API_URL}/archived`);
    return response.data;
  },

  // Crear una nueva nota
  createNote: async (noteData) => {
    const response = await axios.post(API_URL, noteData);
    return response.data;
  },

  // Actualizar una nota
  updateNote: async (id, noteData) => {
    const response = await axios.put(`${API_URL}/${id}`, noteData);
    return response.data;
  },

  // Eliminar una nota
  deleteNote: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },

  // Archivar una nota
  archiveNote: async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/archive`);
    return response.data;
  },

  // Desarchivar una nota
  unarchiveNote: async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/unarchive`);
    return response.data;
  }
};