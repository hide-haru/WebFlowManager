package com.example.sukemage.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="report_dat")
public class ReportDat {
	
	@Id
	@Column(name="report_id")
	private Long reportId;
	
	public Long getReportId() {
		return reportId;
	}
	
	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}
	
	
	@Column(name="report_code")
	private Long reportCode;
	
	public Long getReportCode() {
		return reportCode;
	}
	
	public void setReportCode(Long reportCode) {
		this.reportCode = reportCode;
	}
	
	
	@Column(name="report_creator")
	private Integer reportCreator;
	
	public Integer getReportCreator() {
		return reportCreator;
	}
	
	public void setReportCreator(Integer reportCreator) {
		this.reportCreator = reportCreator;
	}
	
	@Column(name="clientdetail_id")
	private Integer clientdetailId;
	
	public Integer getClientdetailId() {
		return clientdetailId;
	}
	
	public void setClientdetailId(Integer clientdetailId) {
		this.clientdetailId = clientdetailId;
	}
	
	
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

}
