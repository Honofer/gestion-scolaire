package com.ecole.gestion.controller;

import com.ecole.gestion.model.Enseignant;
import com.ecole.gestion.model.Role;
import com.ecole.gestion.repository.EnseignantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/enseignants")
@RequiredArgsConstructor
public class EnseignantController {

    private final EnseignantRepository repository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Enseignant> getAllEnseignants() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Enseignant createEnseignant(@RequestBody Enseignant enseignant) {
        enseignant.setPassword(passwordEncoder.encode(enseignant.getPassword()));
        enseignant.setRole(Role.ENSEIGNANT);
        return repository.save(enseignant);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public ResponseEntity<Enseignant> getEnseignantById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Enseignant> updateEnseignant(@PathVariable Long id, @RequestBody Enseignant details) {
        return repository.findById(id)
                .map(enseignant -> {
                    enseignant.setUsername(details.getUsername());
                    enseignant.setSpecialite(details.getSpecialite());
                    enseignant.setClasse(details.getClasse());
                    enseignant.setMatieres(details.getMatieres());
                    if (details.getPassword() != null && !details.getPassword().isEmpty()) {
                        enseignant.setPassword(passwordEncoder.encode(details.getPassword()));
                    }
                    return ResponseEntity.ok(repository.save(enseignant));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Long id) {
        return repository.findById(id)
                .map(enseignant -> {
                    repository.delete(enseignant);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
