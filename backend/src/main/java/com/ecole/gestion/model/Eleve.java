package com.ecole.gestion.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "eleves")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Eleve extends Utilisateur {
    private String matricule;
    private Date dateNaissance;

    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;

    @OneToMany(mappedBy = "eleve")
    private List<Absence> absences;

    @OneToMany(mappedBy = "eleve")
    private List<Note> notes;

    @OneToOne(mappedBy = "eleve")
    private Bulletin bulletin;
}
