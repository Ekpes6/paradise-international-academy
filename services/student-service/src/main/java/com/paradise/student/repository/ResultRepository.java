package com.paradise.student.repository;

import com.paradise.student.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByStudentIdOrderByCreatedAtDesc(String studentId);
    List<Result> findByStudentIdAndAcademicYearAndTerm(String studentId, String academicYear, String term);
}
