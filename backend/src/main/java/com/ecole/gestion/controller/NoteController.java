package com.ecole.gestion.controller;

import com.ecole.gestion.model.Note;
import com.ecole.gestion.repository.NoteRepository;
import com.ecole.gestion.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteRepository repository;
    private final NoteService noteService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ENSEIGNANT')")
    public Note createNote(@RequestBody Note note) {
        return repository.save(note);
    }

    @GetMapping("/eleve/{eleveId}/moyenne")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT', 'ELEVE')")
    public double getMoyenneGenerale(@PathVariable Long eleveId) {
        // Fetch eleve and calculate (simplified for now)
        return 0.0; // Implementation would require fetching eleve from repo
    }
}
