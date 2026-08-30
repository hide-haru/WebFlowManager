package com.example.sukemage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sukemage.model.entity.ReportDat;

public interface ReportRepository extends JpaRepository<ReportDat, Long> {

}
