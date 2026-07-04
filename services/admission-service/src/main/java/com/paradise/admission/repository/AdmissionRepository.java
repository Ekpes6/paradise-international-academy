package com.paradise.admission.repository;

import com.paradise.admission.entity.AdmissionApplication;
import com.paradise.admission.entity.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdmissionRepository extends JpaRepository<AdmissionApplication, Long> {
    Optional<AdmissionApplication> findByApplicationNumber(String applicationNumber);
    Page<AdmissionApplication> findByStatusOrderBySubmittedAtDesc(ApplicationStatus status, Pageable pageable);
    Page<AdmissionApplication> findAllByOrderBySubmittedAtDesc(Pageable pageable);
    long countByStatus(ApplicationStatus status);
}
