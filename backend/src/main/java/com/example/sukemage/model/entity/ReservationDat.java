package com.example.sukemage.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="reservation_dat")
public class ReservationDat {
	
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

		@Column(name="u_id")
		private Integer uid;
		
		public Integer getUid() {
			return uid;
		}
		
		public void setUid(Integer uid) {
			this.uid = uid;
		}
		
	//==================================================

		@Column(name="title")
		private String title;
		
		public String getTitle() {
			return title;
		}
		
		public void setTitle(String title) {
			this.title = title;
		}
		
	//==================================================

		@Column(name="description")
		private String description;
		
		public String getDescription() {
			return description;
		}
		
		public void setDescription(String description) {
			this.description = description;
		}
		
	//==================================================

		@Column(name="start_datetime")
		private LocalDateTime startdatetime;
		
		public LocalDateTime getStartdatetime() {
			return startdatetime;
		}
		
		public void setStartdatetime(LocalDateTime startdatetime) {
			this.startdatetime = startdatetime;
		}
		
	//==================================================

		@Column(name="end_datetime")
		private LocalDateTime enddatetime;
		
		public LocalDateTime getEnddatetime() {
			return enddatetime;
		}
		
		public void setEnddatetime(LocalDateTime enddatetime) {
			this.enddatetime = enddatetime;
		}

}
