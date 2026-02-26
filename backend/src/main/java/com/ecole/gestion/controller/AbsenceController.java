package com.ecole.gestion.controller;

import com.ecole.gestion.model.Absence;
import com.ecole.gestion.repository.AbsenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/absences")
@RequiredArgsConstructor
public class AbsenceController {

    private final AbsenceRepository repository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public List<Absence> getAllAbsences() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ENSEIGNANT')")
    public Absence createAbsence(@RequestBody Absence absence) {
        return repository.save(absence);
    }

    @GetMapping("/eleve/{eleveId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT', 'ELEVE')")
    public List<Absence> getAbsencesByEleve(@PathVariable Long eleveId) {
        // Implementation would filter by eleveId
        return repository.findAll().stream()
                .filter(a -> a.getEleve().getId().equals(eleveId))
                .toList();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAbsence(@PathVariable Long id) {
        return repository.findById(id)
                .map(absence -> {
                    repository.delete(absence);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
