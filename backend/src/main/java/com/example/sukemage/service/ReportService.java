package com.example.sukemage.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.sukemage.model.entity.ReportDat;
import com.example.sukemage.model.entity.ReportDetailDat;
import com.example.sukemage.model.request.saveReportRequest;
import com.example.sukemage.repository.ReportDetailRepository;
import com.example.sukemage.repository.ReportRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@Service
public class ReportService {
	
	private final ReportRepository reportRepository;
	private final ReportDetailRepository reportDetailRepository;
	private final HttpSession session;
	
	public ReportService(
			ReportRepository reportRepository,
			ReportDetailRepository reportDetailRepository,
			HttpSession session) {
		this.reportRepository = reportRepository;
		this.reportDetailRepository = reportDetailRepository;
		this.session = session;
	}
	
	
	@Transactional
	public void postSaveReport(saveReportRequest request) {
		System.out.println(request.getDetailId());
		
		Map<Long, String> values = request.getValues();
		values.forEach((key, value) -> {
	        System.out.println("key = " + key);
	        System.out.println("value = " + value);
	    });
		
		Integer uid = (Integer) session.getAttribute("u_id");
		
		//report_datへの保存
		ReportDat report = new ReportDat();
		report.setReportId(request.getId());
		report.setReportCode(request.getLayoutId());
		report.setReportCreator(uid);
		report.setClientdetailId(request.getDetailId());
		report.setUpdatedAt(LocalDateTime.now());
		reportRepository.save(report);
		
		//report_detail_datへの保存
		values.forEach((key, value) -> {
			ReportDetailDat reportdetail = new ReportDetailDat();
			reportdetail.setReportId(request.getId());
			reportdetail.setInputCode(key);
			reportdetail.setInputName(value);
			reportDetailRepository.save(reportdetail);
		});
		
	}

}
