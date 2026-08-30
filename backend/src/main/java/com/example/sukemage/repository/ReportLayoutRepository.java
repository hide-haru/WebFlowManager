package com.example.sukemage.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sukemage.model.entity.ReportLayoutMst;

public interface ReportLayoutRepository extends JpaRepository<ReportLayoutMst, Integer> {

	Optional<ReportLayoutMst> findByReportCode(Long reportCode);
}
