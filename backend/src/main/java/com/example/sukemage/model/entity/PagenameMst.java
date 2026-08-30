package com.example.sukemage.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="pagename_mst")
public class PagenameMst {
	
	//==================================================

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	
	//==================================================
	
	@Column(name="page_id")
	private Integer pageId;
	
	public Integer getPageId() {
		return pageId;
	}
	
	public void setPageId(Integer pageId) {
		this.pageId = pageId;
	}
	
	
	//==================================================
	@Column(name="page_name")
	private String pageName;
	
	public String getPageName() {
		return pageName;
	}
	
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}
	
	
	//==================================================
	@Column(name="page_path")
	private String pagePath;
	
	public String getPagePath() {
		return pagePath;
	}
	
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}
		

}
