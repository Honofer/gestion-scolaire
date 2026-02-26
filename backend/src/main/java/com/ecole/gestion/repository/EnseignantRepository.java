package com.ecole.gestion.repository;
import com.ecole.gestion.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {}
