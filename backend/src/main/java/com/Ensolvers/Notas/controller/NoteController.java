package com.Ensolvers.Notas.controller;

import com.Ensolvers.Notas.dto.NoteDTO;
import com.Ensolvers.Notas.model.Note;
import com.Ensolvers.Notas.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getActiveNotes() {
        return ResponseEntity.ok(noteService.getActiveNotes());
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        return ResponseEntity.ok(noteService.getArchivedNotes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@Valid @RequestBody NoteDTO noteDTO) {
        Note createdNote = noteService.createNote(noteDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @Valid @RequestBody NoteDTO noteDTO) {
        try {
            Note updatedNote = noteService.updateNote(id, noteDTO);
            return ResponseEntity.ok(updatedNote);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Note> archiveNote(@PathVariable Long id) {
        try {
            Note archivedNote = noteService.archiveNote(id);
            return ResponseEntity.ok(archivedNote);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/unarchive")
    public ResponseEntity<Note> unarchiveNote(@PathVariable Long id) {
        try {
            Note unarchivedNote = noteService.unarchiveNote(id);
            return ResponseEntity.ok(unarchivedNote);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}