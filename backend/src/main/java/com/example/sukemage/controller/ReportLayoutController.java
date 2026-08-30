package com.example.sukemage.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sukemage.model.entity.ReportLayoutMst;
import com.example.sukemage.model.request.ReportLayoutRequest;
import com.example.sukemage.response.ReportLayoutResponse;
import com.example.sukemage.service.ReportLayoutService;

@RestController
@RequestMapping("/api")
public class ReportLayoutController {
	
	private final ReportLayoutService reportLayoutService;
	public ReportLayoutController(ReportLayoutService reportLayoutService) {
		this.reportLayoutService = reportLayoutService;
	}
	
	
	@GetMapping("/getreportlayout")
	public List<ReportLayoutMst> getReportLayout() {
		return reportLayoutService.getReportLayout();
	}
	
	
	@GetMapping("/getreportlayoutdetail")
	public ReportLayoutResponse getReportLayoutDetail(@RequestParam Long reportCode) {
		return reportLayoutService.getReportLayoutDetail(reportCode);
	}
	

	@PostMapping("/savelayout")
	public void postSaveLayout(@RequestBody ReportLayoutRequest request) {
		reportLayoutService.postSaveLayout(request);
	}
	
}
