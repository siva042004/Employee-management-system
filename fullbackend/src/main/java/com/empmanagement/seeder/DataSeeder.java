package com.empmanagement.seeder;

import com.empmanagement.entity.*;
import com.empmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final DepartmentRepository deptRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedDepartments();
        log.info("✅ Data seeding complete.");
    }

    private void seedUsers() {
        if (userRepo.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ROLE_ADMIN);
            userRepo.save(admin);
            log.info("Created admin user: admin / admin123");
        }
        if (userRepo.findByUsername("hr").isEmpty()) {
            User hr = new User();
            hr.setUsername("hr");
            hr.setPassword(passwordEncoder.encode("hr123"));
            hr.setRole(User.Role.ROLE_HR);
            userRepo.save(hr);
            log.info("Created HR user: hr / hr123");
        }
    }

    private void seedDepartments() {
        if (deptRepo.count() == 0) {
            String[][] depts = {
                {"Engineering", "Software development and infrastructure"},
                {"Human Resources", "People operations and culture"},
                {"Finance", "Accounting, budgeting, and financial reporting"},
                {"Marketing", "Brand, growth, and communications"},
            };
            for (String[] d : depts) {
                Department dept = new Department();
                dept.setName(d[0]);
                dept.setDescription(d[1]);
                deptRepo.save(dept);
            }
            log.info("Seeded 4 departments");
        }
    }
}
