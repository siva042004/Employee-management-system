package com.empmanagement.service;

import com.empmanagement.entity.Department;
import com.empmanagement.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepo;

    public List<Department> getAll() { return departmentRepo.findAll(); }

    public Department getById(Long id) {
        return departmentRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Department not found: " + id));
    }

    public Department create(Department dept) { return departmentRepo.save(dept); }

    public Department update(Long id, Department updated) {
        Department existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        return departmentRepo.save(existing);
    }

    public void delete(Long id) {
        if (!departmentRepo.existsById(id)) throw new RuntimeException("Department not found: " + id);
        departmentRepo.deleteById(id);
    }
}
