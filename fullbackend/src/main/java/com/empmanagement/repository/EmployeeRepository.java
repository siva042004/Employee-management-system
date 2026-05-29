package com.empmanagement.repository;

import com.empmanagement.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(e.lastName)  LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(e.email)     LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(e.department.name) LIKE LOWER(CONCAT('%', :q, '%'))")
    Page<Employee> search(@Param("q") String query, Pageable pageable);
}
