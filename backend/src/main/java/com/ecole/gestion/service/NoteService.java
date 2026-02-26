package com.ecole.gestion.service;

import com.ecole.gestion.model.Eleve;
import com.ecole.gestion.model.Matiere;
import com.ecole.gestion.model.Note;
import com.ecole.gestion.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public double calculerMoyenneParMatiere(Eleve eleve, Matiere matiere) {
        List<Note> notes = noteRepository.findAll().stream()
                .filter(n -> n.getEleve().getId().equals(eleve.getId()) && n.getMatiere().getId().equals(matiere.getId()))
                .toList();
        
        if (notes.isEmpty()) return 0.0;
        
        return notes.stream().mapToDouble(Note::getValeur).average().orElse(0.0);
    }

    public double calculerMoyenneGenerale(Eleve eleve) {
        List<Note> allNotes = eleve.getNotes();
        if (allNotes == null || allNotes.isEmpty()) return 0.0;

        // Group by subject and calculate weighted average
        Map<Matiere, List<Note>> notesParMatiere = allNotes.stream()
                .collect(Collectors.groupingBy(Note::getMatiere));

        double totalWeightedPoints = 0.0;
        int totalCoefficients = 0;

        for (Map.Entry<Matiere, List<Note>> entry : notesParMatiere.entrySet()) {
            Matiere matiere = entry.getKey();
            double moyenneMatiere = entry.getValue().stream()
                    .mapToDouble(Note::getValeur)
                    .average()
                    .orElse(0.0);
            
            totalWeightedPoints += moyenneMatiere * matiere.getCoefficient();
            totalCoefficients += matiere.getCoefficient();
        }

        return totalCoefficients == 0 ? 0.0 : totalWeightedPoints / totalCoefficients;
    }
}
