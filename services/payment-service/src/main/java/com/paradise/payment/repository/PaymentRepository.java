package com.paradise.payment.repository;

import com.paradise.payment.entity.Payment;
import com.paradise.payment.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByReference(String reference);
    List<Payment> findByStudentIdOrderByCreatedAtDesc(String studentId);
    List<Payment> findByStatusOrderByCreatedAtDesc(PaymentStatus status);
}
