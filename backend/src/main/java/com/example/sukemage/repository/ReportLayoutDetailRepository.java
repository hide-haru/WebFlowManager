package com.example.sukemage.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sukemage.model.entity.ReportLayoutDetailMst;

public interface ReportLayoutDetailRepository extends JpaRepository<ReportLayoutDetailMst, Integer> {
	
	List<ReportLayoutDetailMst> findByReportCode(Long reportCode);

}
