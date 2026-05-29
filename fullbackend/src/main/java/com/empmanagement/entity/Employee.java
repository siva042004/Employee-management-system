package com.empmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees", indexes = {
        @Index(name = "idx_email", columnList = "email"),
        @Index(name = "idx_dept", columnList = "department_id"),
        @Index(name = "idx_status", columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String firstName;

    @Column(nullable = false, length = 80)
    private String lastName;

    @Column(unique = true, nullable = false, length = 150)
    private String email;

    @Column(length = 30)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.ACTIVE;

    @Column(name = "salary_enc")
    private String salary;

    @Column(name = "nid_enc")
    private String nid;

    @Column(name = "bank_account_enc")
    private String bankAccount;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    @JsonIgnore
    private Department department;

    @Transient
    private Long departmentId;

    @JsonProperty("departmentName")
    public String getDepartmentName() {
        return department != null ? department.getName() : null;
    }

    @JsonProperty("departmentId")
    public Long getDepartmentId() {
        return department != null ? department.getId() : departmentId;
    }

    public enum Status {
        ACTIVE,
        INACTIVE,
        ON_LEAVE
    }
}