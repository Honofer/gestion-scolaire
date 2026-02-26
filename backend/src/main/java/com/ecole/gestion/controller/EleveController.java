package com.ecole.gestion.controller;

import com.ecole.gestion.model.Eleve;
import com.ecole.gestion.model.Role;
import com.ecole.gestion.repository.EleveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/eleves")
@RequiredArgsConstructor
public class EleveController {

    private final EleveRepository repository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT')")
    public List<Eleve> getAllEleves() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Eleve createEleve(@RequestBody Eleve eleve) {
        eleve.setPassword(passwordEncoder.encode(eleve.getPassword()));
        eleve.setRole(Role.ELEVE);
        return repository.save(eleve);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ENSEIGNANT', 'ELEVE')")
    public ResponseEntity<Eleve> getEleveById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Eleve> updateEleve(@PathVariable Long id, @RequestBody Eleve eleveDetails) {
        return repository.findById(id)
                .map(eleve -> {
                    eleve.setUsername(eleveDetails.getUsername());
                    eleve.setMatricule(eleveDetails.getMatricule());
                    eleve.setDateNaissance(eleveDetails.getDateNaissance());
                    eleve.setClasse(eleveDetails.getClasse());
                    if (eleveDetails.getPassword() != null && !eleveDetails.getPassword().isEmpty()) {
                        eleve.setPassword(passwordEncoder.encode(eleveDetails.getPassword()));
                    }
                    return ResponseEntity.ok(repository.save(eleve));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEleve(@PathVariable Long id) {
        return repository.findById(id)
                .map(eleve -> {
                    repository.delete(eleve);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
