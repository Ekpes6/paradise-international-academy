package com.paradise.auth.config;

import com.paradise.auth.entity.Role;
import com.paradise.auth.entity.User;
import com.paradise.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email:admin@paradiseinternationalacademy.com.ng}")
    private String adminEmail;

    @Value("${admin.password:ChangeMe@123}")
    private String adminPassword;

    @Value("${admin.firstName:School}")
    private String adminFirstName;

    @Value("${admin.lastName:Administrator}")
    private String adminLastName;

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.existsByEmail(adminEmail)) {
            log.info("Admin account already exists: {}", adminEmail);
            return;
        }

        User admin = User.builder()
                .firstName(adminFirstName)
                .lastName(adminLastName)
                .email(adminEmail)
                .password(passwordEncoder.encode(adminPassword))
                .role(Role.ADMIN)
                .enabled(true)
                .accountNonLocked(true)
                .build();

        userRepository.save(admin);
        log.info("Admin account created: {}", adminEmail);
    }
}
