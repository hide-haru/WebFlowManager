package com.example.sukemage.model.request;

import java.util.List;

public class ReportLayoutRequest {
	
	//==================================================
	private Long reportCode;
	
	public Long getReportCode() {
		return reportCode;
	}
	
	public void setReportCode(Long reportCode) {
		this.reportCode = reportCode;
	}
	
	
	//==================================================
	private String reportName;
	
	public String getReportName() {
		return reportName;
	}
	
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	
	
	//==================================================
	private List<ReportLayoutElementRequest> elements;
	
	public List<ReportLayoutElementRequest> getElements() {
		return elements;
	}
	
	public void setElements(List<ReportLayoutElementRequest> elements) {
		this.elements = elements;
	}

}
