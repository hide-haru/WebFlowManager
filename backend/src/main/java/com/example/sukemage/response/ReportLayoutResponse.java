package com.example.sukemage.response;

import java.util.ArrayList;
import java.util.List;



public class ReportLayoutResponse {

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
	private List<ReportLayoutElementResponse> elements = new ArrayList<>();
	
	public List<ReportLayoutElementResponse> getElements() {
		return elements;
	}
	
	public void setElements(List<ReportLayoutElementResponse> elements) {
		this.elements = elements;
	}


}
