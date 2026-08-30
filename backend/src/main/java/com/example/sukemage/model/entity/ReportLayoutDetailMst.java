package com.example.sukemage.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="reportlayoutdetail_mst")
public class ReportLayoutDetailMst {
	
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
	@Column(name="report_code")
	private Long reportCode;
	
	public Long getReportCode() {
		return reportCode;
	}
	
	public void setReportCode(Long reportCode) {
		this.reportCode = reportCode;
	}
	
	
	//==================================================
	@Column(name="detail_id")
	private Long detailId;
	
	public Long getDetailId() {
		return detailId;
	}
	
	public void setDetailId(Long detailId) {
		this.detailId = detailId;
	}
	
	
	//==================================================
	@Column(name="input_type")
	private String inputType;
	
	public String getInputType() {
		return inputType;
	}
	
	public void setInputType(String inputType) {
		this.inputType = inputType;
	}
	
	
	//==================================================
	@Column(name="type")
	private String type;
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	
	//==================================================
	@Column(name="label")
	private String label;
	
	public String getLabel() {
		return label;
	}
	
	public void setLabel(String label) {
		this.label = label;
	}
	
	
	//==================================================
	@Column(name="text")
	private String text;
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	
	//==================================================
	@Column(name="x")
	private Integer x;
	
	public Integer getX() {
		return x;
	}
	
	public void setX(Integer x) {
		this.x = x;
	}
	
	
	//==================================================
	@Column(name="y")
	private Integer y;
	
	public Integer getY() {
		return y;
	}
	
	public void setY(Integer y) {
		this.y = y;
	}
	
	
	//==================================================
	@Column(name="height")
	private Integer height;
	
	public Integer getHeight() {
		return height;
	}
	
	public void setHeight(Integer height) {
		this.height = height;
	}
	
	
	//==================================================
	@Column(name="width")
	private Integer width;
	
	public Integer getWidth() {
		return width;
	}
	
	public void setWidth(Integer width) {
		this.width = width;
	}
	
	

}
