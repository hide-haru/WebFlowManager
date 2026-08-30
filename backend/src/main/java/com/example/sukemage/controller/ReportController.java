package com.example.sukemage.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sukemage.model.request.saveReportRequest;
import com.example.sukemage.service.ReportService;

@RestController
@RequestMapping("/api")
public class ReportController {
	
	private final ReportService reportService;
	public ReportController(ReportService reportService) {
		this.reportService = reportService;
	}
	
	@PostMapping("/saveReport")
	public Map<String, Object> postSaveReport(@RequestBody saveReportRequest request) {
		Map<String, Object> result = new HashMap<>();
		
		try {
			reportService.postSaveReport(request);
			result.put("success", true);
			result.put("message", "レポート保存処理が完了しました。");
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "レポート保存処理に失敗しました。");
			return result;
		}
		
	}

}
