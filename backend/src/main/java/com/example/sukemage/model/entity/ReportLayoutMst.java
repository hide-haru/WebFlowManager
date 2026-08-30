package com.example.sukemage.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="reportlayout_mst")
public class ReportLayoutMst {
	
	//==================================================

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	
	//==================================================
	@Column(name="report_code")
	private Long reportCode;
	
	public Long getReportCode() {
		return reportCode;
	}
	
	public void setReportCode(Long reportCode) {
		this.reportCode = reportCode;
	}
	
	
	//==================================================
	@Column(name="report_name")
	private String reportName;
	
	public String getReportName() {
		return reportName;
	}
	
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	
	
	//==================================================
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	

}
