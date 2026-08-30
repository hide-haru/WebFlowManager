package com.example.sukemage.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.sukemage.model.entity.ReportLayoutDetailMst;
import com.example.sukemage.model.entity.ReportLayoutMst;
import com.example.sukemage.model.request.ReportLayoutElementRequest;
import com.example.sukemage.model.request.ReportLayoutRequest;
import com.example.sukemage.repository.ReportLayoutDetailRepository;
import com.example.sukemage.repository.ReportLayoutRepository;
import com.example.sukemage.response.ReportLayoutElementResponse;
import com.example.sukemage.response.ReportLayoutResponse;

@Service
public class ReportLayoutService {
	
	private ReportLayoutRepository reportLayoutRepository;
	private ReportLayoutDetailRepository reportLayoutDetailRepository;
	
	public ReportLayoutService(
			ReportLayoutRepository reportLayoutRepository,
			ReportLayoutDetailRepository reportLayoutDetailRepository) {
		this.reportLayoutRepository = reportLayoutRepository;
		this.reportLayoutDetailRepository = reportLayoutDetailRepository;
	}
	
	
	
	public List<ReportLayoutMst> getReportLayout() {
		
		List<ReportLayoutMst> result = reportLayoutRepository.findAll();
		//for (ReportLayoutMst result: results) {
		//	System.out.println(result.getReportName());
		//}
		return result;
	}
	
	
	public ReportLayoutResponse getReportLayoutDetail(Long reportCode) {
		Optional<ReportLayoutMst> reportOptional = reportLayoutRepository.findByReportCode(reportCode);
		ReportLayoutMst report = reportOptional.get();
		System.out.println("reportCode:" + report.getReportCode() + " / reportName" + report.getReportName());
		ReportLayoutResponse response = new ReportLayoutResponse();
		response.setReportCode(report.getReportCode());
		response.setReportName(report.getReportName());
		
		
		List<ReportLayoutDetailMst> reportDetails = reportLayoutDetailRepository.findByReportCode(reportCode);
		
		for (ReportLayoutDetailMst reportDetail : reportDetails) {
			ReportLayoutElementResponse detailresponse = new ReportLayoutElementResponse();
			
			detailresponse.setDetailId(reportDetail.getDetailId());
			detailresponse.setInputType(reportDetail.getInputType());
			detailresponse.setType(reportDetail.getType());
			detailresponse.setLabel(reportDetail.getLabel());
			detailresponse.setText(reportDetail.getText());
			detailresponse.setX(reportDetail.getX());
			detailresponse.setY(reportDetail.getY());
			detailresponse.setHeight(reportDetail.getHeight());
			detailresponse.setWidth(reportDetail.getWidth());
			
			response.getElements().add(detailresponse);
		}
		
		return response;
		
	}
	
	
	
	public void postSaveLayout(ReportLayoutRequest request) {
		
		//レポートマスタへの保存処理
		ReportLayoutMst reportLayout = new ReportLayoutMst();
		reportLayout.setReportCode(request.getReportCode());
		reportLayout.setReportName(request.getReportName());
		reportLayout.setUpdatedAt(LocalDateTime.now());
		
		reportLayoutRepository.save(reportLayout);
		
		//レポート明細マスタへの保存処理
		List<ReportLayoutElementRequest> elements = request.getElements();
		
		for (ReportLayoutElementRequest element: elements) {
			ReportLayoutDetailMst reportlayoutdetail = new ReportLayoutDetailMst();
			
			reportlayoutdetail.setReportCode(request.getReportCode());
			reportlayoutdetail.setDetailId(element.getDetailId());
			reportlayoutdetail.setInputType(element.getInputType());
			reportlayoutdetail.setType(element.getType());
			reportlayoutdetail.setLabel(element.getLabel());
			reportlayoutdetail.setText(element.getText());
			reportlayoutdetail.setX(element.getX());
			reportlayoutdetail.setY(element.getY());
			reportlayoutdetail.setHeight(element.getHeight());
			reportlayoutdetail.setWidth(element.getWidth());
			
			reportLayoutDetailRepository.save(reportlayoutdetail);
		}
	}

}
