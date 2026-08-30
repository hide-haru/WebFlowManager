package com.example.sukemage.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="report_detail_dat")
public class ReportDetailDat {
	
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
	
	
	@Column(name="report_id")
	private Long reportId;
	
	public Long getReportId() {
		return reportId;
	}
	
	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}
	
	
	@Column(name="input_code")
	private Long inputCode;
	
	public Long getInputCode() {
		return inputCode;
	}
	
	public void setInputCode(Long inputCode) {
		this.inputCode = inputCode;
	}
	
	
	@Column(name="input_name")
	private String inputName;
	
	public String getInputName() {
		return inputName;
	}
	
	public void setInputName(String inputName) {
		this.inputName = inputName;
	}

}
