package com.example.sukemage.model.request;

import java.time.LocalDateTime;

public class ClientDetailRequest {
	
	
	private Integer id;				//チケットNo
	private Integer clientCode;
	private String clientName;
	private String category;
	private String title;
	private String memo;
	private LocalDateTime workStartTime;
	private LocalDateTime workEndTime;
	private String name;
	private Long reportRelation;
	private String createdAt;
	private String updatedAt;
	private Integer status;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getClientCode() {
		return clientCode;
	}
	public void setClientCode(Integer clientCode) {
		this.clientCode = clientCode;
	}
	
	public String getClientName() {
	    return clientName;
	}
	public void setClientName(String clientName) {
	    this.clientName = clientName;
	}

	public String getCategory() {
	    return category;
	}
	public void setCategory(String category) {
	    this.category = category;
	}

	public String getTitle() {
	    return title;
	}
	public void setTitle(String title) {
	    this.title = title;
	}

	public String getMemo() {
	    return memo;
	}
	public void setMemo(String memo) {
	    this.memo = memo;
	}

	public LocalDateTime getWorkStartTime() {
	    return workStartTime;
	}
	public void setWorkStartTime(LocalDateTime workStartTime) {
	    this.workStartTime = workStartTime;
	}

	public LocalDateTime getWorkEndTime() {
	    return workEndTime;
	}
	public void setWorkEndTime(LocalDateTime workEndTime) {
	    this.workEndTime = workEndTime;
	}

	public String getName() {
	    return name;
	}
	public void setName(String name) {
	    this.name = name;
	}

	public Long getReportRelation() {
	    return reportRelation;
	}
	public void setReportRelation(Long reportRelation) {
	    this.reportRelation = reportRelation;
	}

	public String getCreatedAt() {
	    return createdAt;
	}
	public void setCreatedAt(String createdAt) {
	    this.createdAt = createdAt;
	}

	public String getUpdatedAt() {
	    return updatedAt;
	}
	public void setUpdatedAt(String updatedAt) {
	    this.updatedAt = updatedAt;
	}
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "ClientDetailRequest { " +
					"id:" + id + '\'' +
					"clientCode:" + clientCode + '\'' +
					"clientName:" + clientName + '\'' +
					"category:" + category + '\'' +
					"title:" + title + '\'' +
					"memo:" + memo + '\'' +
					"workStartTime:" + workStartTime + '\'' +
					"workEndTime:" + workEndTime + '\'' +
					"name:" + name + '\'' +
					"reportRelation:" + reportRelation + '\'' +
					"createdAt:" + createdAt + '\'' +
					"updatedAt:" + updatedAt + '\'' +
				"}";
	}

}
