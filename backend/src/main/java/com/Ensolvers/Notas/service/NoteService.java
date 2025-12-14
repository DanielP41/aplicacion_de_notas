package com.Ensolvers.Notas.service;

import com.Ensolvers.Notas.dto.NoteDTO;
import com.Ensolvers.Notas.model.Note;
import com.Ensolvers.Notas.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchivedFalse();
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchivedTrue();
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public Note createNote(NoteDTO noteDTO) {
        Note note = new Note();
        note.setTitle(noteDTO.getTitle());
        note.setContent(noteDTO.getContent());
        note.setArchived(false);
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, NoteDTO noteDTO) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con id: " + id));

        note.setTitle(noteDTO.getTitle());
        note.setContent(noteDTO.getContent());
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public Note archiveNote(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con id: " + id));

        note.setArchived(true);
        return noteRepository.save(note);
    }

    public Note unarchiveNote(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con id: " + id));

        note.setArchived(false);
        return noteRepository.save(note);
    }
}