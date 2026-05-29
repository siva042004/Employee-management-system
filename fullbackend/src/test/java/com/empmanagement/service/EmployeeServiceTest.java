package com.empmanagement.service;

import com.empmanagement.entity.Employee;
import com.empmanagement.repository.DepartmentRepository;
import com.empmanagement.repository.EmployeeRepository;
import com.empmanagement.util.EncryptionUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock EmployeeRepository employeeRepo;
    @Mock DepartmentRepository departmentRepo;
    @Mock EncryptionUtil encryptionUtil;
    @InjectMocks EmployeeService employeeService;

    private Employee sample() {
        Employee e = new Employee();
        e.setId(1L); e.setFirstName("John"); e.setLastName("Doe");
        e.setEmail("john@example.com"); e.setSalary("50000");
        e.setNid("NID123"); e.setBankAccount("ACC456");
        return e;
    }

    @Test void getAll_noSearch_returnsPage() {
        when(employeeRepo.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of(sample())));
        assertEquals(1, employeeService.getAll(0, 10, null).getTotalElements());
    }

    @Test void getAll_withSearch_callsSearch() {
        when(employeeRepo.search(eq("john"), any(Pageable.class))).thenReturn(new PageImpl<>(List.of(sample())));
        assertEquals(1, employeeService.getAll(0, 10, "john").getTotalElements());
    }

    @Test void getById_found_decrypts() {
        when(employeeRepo.findById(1L)).thenReturn(Optional.of(sample()));
        when(encryptionUtil.decrypt(anyString())).thenReturn("decrypted");
        assertNotNull(employeeService.getById(1L));
        verify(encryptionUtil, atLeast(1)).decrypt(anyString());
    }

    @Test void getById_notFound_throws() {
        when(employeeRepo.findById(99L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> employeeService.getById(99L));
    }

    @Test void create_encryptsAndSaves() {
        when(encryptionUtil.encrypt(anyString())).thenReturn("enc");
        when(employeeRepo.save(any())).thenReturn(sample());
        assertNotNull(employeeService.create(sample()));
        verify(encryptionUtil, atLeast(1)).encrypt(anyString());
    }

    @Test void delete_existing_succeeds() {
        when(employeeRepo.existsById(1L)).thenReturn(true);
        assertDoesNotThrow(() -> employeeService.delete(1L));
        verify(employeeRepo).deleteById(1L);
    }

    @Test void delete_notFound_throws() {
        when(employeeRepo.existsById(99L)).thenReturn(false);
        assertThrows(RuntimeException.class, () -> employeeService.delete(99L));
    }
}
