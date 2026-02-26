package com.ecole.gestion;

import com.ecole.gestion.model.Administrateur;
import com.ecole.gestion.model.Role;
import com.ecole.gestion.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (repository.findByUsername("admin").isEmpty()) {
            Administrateur admin = new Administrateur();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            repository.save(admin);
            System.out.println("Compte administrateur par défaut créé : admin / admin123");
        }
    }
}
