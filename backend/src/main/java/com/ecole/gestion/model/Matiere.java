package com.ecole.gestion.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "matieres")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Matiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private int coefficient;

    @ManyToMany(mappedBy = "matieres")
    private List<Enseignant> enseignants;

    @OneToMany(mappedBy = "matiere")
    private List<Note> notes;
}
