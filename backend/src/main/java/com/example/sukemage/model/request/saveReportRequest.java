package com.example.sukemage.model.request;

import java.util.Map;

public class saveReportRequest {
	
	private Long id;
	private Long layoutId;
	private Integer detailId;
	private Map<Long, String> values;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Integer getDetailId() {
		return detailId;
	}
	public void setDetailId(Integer detailId) {
		this.detailId = detailId;
	}
	
	public Long getLayoutId() {
		return layoutId;
	}
	public void setLayoutId(Long layoutId) {
		this.layoutId = layoutId;
	}
	
	public Map<Long, String> getValues() {
		return values;
	}
	public void setValues(Map <Long, String> values) {
		this.values = values;
	}
	
	

}
