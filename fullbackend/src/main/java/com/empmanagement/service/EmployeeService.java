package com.empmanagement.service;

import com.empmanagement.entity.*;
import com.empmanagement.repository.*;
import com.empmanagement.util.EncryptionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepo;
    private final DepartmentRepository departmentRepo;
    private final EncryptionUtil encryptionUtil;

    public Page<Employee> getAll(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("lastName").ascending());
        if (search != null && !search.isBlank())
            return employeeRepo.search(search.trim(), pageable);
        return employeeRepo.findAll(pageable);
    }

    public Employee getById(Long id) {
        Employee e = employeeRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
        decryptSensitive(e);
        return e;
    }

    @Transactional
    public Employee create(Employee emp) {
        encryptSensitive(emp);
        setDepartment(emp);
        return employeeRepo.save(emp);
    }

    @Transactional
    public Employee update(Long id, Employee updated) {
        Employee existing = employeeRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setStatus(updated.getStatus());
        if (updated.getSalary() != null) existing.setSalary(encryptionUtil.encrypt(updated.getSalary()));
        if (updated.getNid() != null) existing.setNid(encryptionUtil.encrypt(updated.getNid()));
        if (updated.getBankAccount() != null) existing.setBankAccount(encryptionUtil.encrypt(updated.getBankAccount()));
        if (updated.getDepartmentId() != null) {
            Department dept = departmentRepo.findById(updated.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
            existing.setDepartment(dept);
        }
        return employeeRepo.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!employeeRepo.existsById(id)) throw new RuntimeException("Employee not found: " + id);
        employeeRepo.deleteById(id);
    }

    private void encryptSensitive(Employee e) {
        if (e.getSalary() != null) e.setSalary(encryptionUtil.encrypt(e.getSalary()));
        if (e.getNid() != null) e.setNid(encryptionUtil.encrypt(e.getNid()));
        if (e.getBankAccount() != null) e.setBankAccount(encryptionUtil.encrypt(e.getBankAccount()));
    }

    private void decryptSensitive(Employee e) {
        try {
            if (e.getSalary() != null) e.setSalary(encryptionUtil.decrypt(e.getSalary()));
            if (e.getNid() != null) e.setNid(encryptionUtil.decrypt(e.getNid()));
            if (e.getBankAccount() != null) e.setBankAccount(encryptionUtil.decrypt(e.getBankAccount()));
        } catch (Exception ignored) {}
    }

    private void setDepartment(Employee e) {
        if (e.getDepartmentId() != null) {
            Department dept = departmentRepo.findById(e.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));
            e.setDepartment(dept);
        }
    }
}
