package com.ecole.gestion.controller;

import com.ecole.gestion.repository.EleveRepository;
import com.ecole.gestion.repository.ClasseRepository;
import com.ecole.gestion.repository.EnseignantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatistiquesController {

    private final EleveRepository eleveRepository;
    private final ClasseRepository classeRepository;
    private final EnseignantRepository enseignantRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Basic Counts
        stats.put("totalEleves", eleveRepository.count());
        stats.put("totalClasses", classeRepository.count());
        stats.put("totalEnseignants", enseignantRepository.count());

        // Data for Charts
        // 1. Students per level
        Map<String, Long> repartitionNiveau = eleveRepository.findAll().stream()
                .filter(e -> e.getClasse() != null)
                .collect(Collectors.groupingBy(e -> e.getClasse().getNiveau(), Collectors.counting()));
        stats.put("repartitionNiveau", repartitionNiveau);

        // 2. Average success rate (mock data for now as we don't have enough real grades)
        Map<String, Double> performanceClasses = new HashMap<>();
        classeRepository.findAll().forEach(c -> {
            performanceClasses.put(c.getNom(), 10 + Math.random() * 5); // Mock between 10 and 15
        });
        stats.put("performanceClasses", performanceClasses);

        return stats;
    }
}
