package com.ecole.gestion.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "bulletins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bulletin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double moyenneGenerale;
    private int rang;
    private String decision;

    @OneToOne
    @JoinColumn(name = "eleve_id")
    private Eleve eleve;

    @OneToMany(mappedBy = "bulletin")
    private List<Note> notes;
}
