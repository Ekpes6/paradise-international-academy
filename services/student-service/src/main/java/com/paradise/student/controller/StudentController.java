package com.paradise.student.controller;

import com.paradise.student.entity.Result;
import com.paradise.student.entity.Student;
import com.paradise.student.repository.ResultRepository;
import com.paradise.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentRepository studentRepository;
    private final ResultRepository resultRepository;

    @GetMapping("/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','PARENT','STUDENT')")
    public ResponseEntity<Student> getStudent(@PathVariable String studentId) {
        return studentRepository.findByStudentId(studentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{studentId}/results")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','PARENT','STUDENT')")
    public ResponseEntity<List<Result>> getResults(@PathVariable String studentId) {
        return ResponseEntity.ok(resultRepository.findByStudentIdOrderByCreatedAtDesc(studentId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentRepository.save(student));
    }

    @PostMapping("/{studentId}/results")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<Result> addResult(@PathVariable String studentId, @RequestBody Result result) {
        result.setStudentId(studentId);
        return ResponseEntity.ok(resultRepository.save(result));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "student-service"));
    }
}
