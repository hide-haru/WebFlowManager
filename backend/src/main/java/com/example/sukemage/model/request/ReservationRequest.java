package com.example.sukemage.model.request;


public class ReservationRequest {
	
	//==================================================
	private Integer id;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	//==================================================
	private Integer uid;
	
	public Integer getUid() {
		return uid;
	}
	
	public void setUid(Integer uid) {
		this.uid = uid;
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
	private String description;
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	//==================================================
	private String startDate;
	
	public String getStartDate() {
		return startDate;
	}
	
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	
	//==================================================
	private String startTime;
	
	public String getStartTime() {
		return startTime;
	}
	
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	
	
	//==================================================
	private String endDate;
	
	public String getEndDate() {
		return endDate;
	}
	
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
	
	//==================================================
	private String endTime;
	
	public String getEndTime() {
		return endTime;
	}
	
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	
	//==================================================
	@Override
	public String toString() {
		return "ReservationRequest{" +
				"uid=" + uid + '\'' +
				"title=" + title + '\'' +
				"description=" + description + '\'' +
				"startDate=" + startDate + '\'' +
				"startTime=" + startTime + '\'' +
				"endDate=" + endDate + '\'' +
				"endTime=" + endTime + '\'' +
				"};";
	}

}
