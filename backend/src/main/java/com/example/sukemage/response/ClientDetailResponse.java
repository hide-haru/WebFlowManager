package com.example.sukemage.response;

import java.time.LocalDateTime;

public class ClientDetailResponse {
	
	
	//==================================================
	private Integer id;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	//==================================================
	private String clientName;
	
	public String getClientName() {
		return clientName;
	}
	
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
	//==================================================
	private String category;
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	//==================================================
	private String title;
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	//==================================================
	private String memo;
	
	public String getMemo() {
		return memo;
	}
	
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	//==================================================
	private LocalDateTime workStartTime;
	
	public LocalDateTime getWorkStartTime() {
		return workStartTime;
	}
	
	public void setWorkStartTime(LocalDateTime workStartTime) {
		this.workStartTime = workStartTime;
	}
	
	//==================================================
	private LocalDateTime workEndTime;
	
	public LocalDateTime getWorkEndTime() {
		return workEndTime;
	}
	
	public void setWorkEndTime(LocalDateTime workEndTime) {
		this.workEndTime = workEndTime;
	}
	
	//==================================================
	private String name;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	//==================================================
	private Long reportRelation;
	
	public Long getReportRelation() {
		return reportRelation;
	}
	
	public void setReportRelation(Long reportRelation) {
		this.reportRelation = reportRelation;
	}
	
	//==================================================
	private LocalDateTime createdAt;
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	//==================================================
	private LocalDateTime updatedAt;
	
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	//==================================================
		private Integer clientCode;
		
		public Integer getClientCode() {
			return clientCode;
		}
		
		public void setClientCode(Integer clientCode) {
			this.clientCode = clientCode;
		}
	
	
	
	public ClientDetailResponse(
            Integer id,
            String clientName,
            String category,
            String title,
            String memo,
            LocalDateTime workStarttime,
            LocalDateTime workEndtime,
            String name,
            Long reportRelation,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            Integer clientCode) {

        this.id = id;
        this.clientName = clientName;
        this.category = category;
        this.title = title;
        this.memo = memo;
        this.workStartTime = workStarttime;
        this.workEndTime = workEndtime;
        this.name = name;
        this.reportRelation = reportRelation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clientCode = clientCode;
    }
	
	public ClientDetailResponse() {}

}
