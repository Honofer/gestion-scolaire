package com.ecole.gestion.repository;
import com.ecole.gestion.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
public interface NoteRepository extends JpaRepository<Note, Long> {}
