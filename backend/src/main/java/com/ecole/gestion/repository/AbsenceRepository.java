package com.ecole.gestion.repository;
import com.ecole.gestion.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AbsenceRepository extends JpaRepository<Absence, Long> {}
