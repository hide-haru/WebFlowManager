package com.example.sukemage.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="client_dat")
public class ClientDat {
	
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
	
	@Column(name="client_code")
	private Integer clientCode;
	
	public Integer getClientCode() {
		return clientCode;
	}
	
	public void setClientCode(Integer clientCode) {
		this.clientCode = clientCode;
	}
	
	//==================================================
	
	@Column(name="client_name")
	private String clientName;
	
	public String getClientName() {
		return clientName;
	}
	
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
	//==================================================
	
	@Column(name="pic")
	private String pic;
	
	public String getPic() {
		return pic;
	}
	
	public void setPic(String pic) {
		this.pic = pic;
	}
	
	//==================================================
	
	@Column(name="tel")
	private String tel;
	
	public String getTel() {
		return tel;
	}
	
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	//==================================================
	
	@Column(name="address")
	private String address;
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	//==================================================
	
	@Column(name="contract_day")
	private LocalDateTime contractDay;
	
	public LocalDateTime getContractDay() {
		return contractDay;
	}
	
	public void setContractDay(LocalDateTime contractDay) {
		this.contractDay = contractDay;
	}
	
	//==================================================
	
	@Column(name="updated_at")
	private LocalDateTime updatedAt;
	
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	
	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}


}
