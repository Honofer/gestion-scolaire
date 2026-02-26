package com.ecole.gestion.repository;
import com.ecole.gestion.model.Eleve;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EleveRepository extends JpaRepository<Eleve, Long> {}
