package com.example.sukemage.model.entity;

import java.time.LocalDateTime; 

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="clientdetail_dat")
public class ClientDetailDat {

    // ==================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    // ==================================================

    @Column(name = "client_code")
    private Integer clientCode;

    public Integer getClientCode() {
        return clientCode;
    }

    public void setClientCode(Integer clientCode) {
        this.clientCode = clientCode;
    }


    // ==================================================

    @Column(name = "category")
    private String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // ==================================================

    @Column(name = "title")
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    // ==================================================

    @Column(name = "memo")
    private String memo;

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }


    // ==================================================

    @Column(name = "work_starttime")
    private LocalDateTime workStarttime;

    public LocalDateTime getWorkStarttime() {
        return workStarttime;
    }

    public void setWorkStarttime(LocalDateTime workStarttime) {
        this.workStarttime = workStarttime;
    }


    // ==================================================

    @Column(name = "work_endtime")
    private LocalDateTime workEndtime;

    public LocalDateTime getWorkEndtime() {
        return workEndtime;
    }

    public void setWorkEndtime(LocalDateTime workEndtime) {
        this.workEndtime = workEndtime;
    }


    // ==================================================

    @Column(name = "report_creator")
    private Integer reportCreator;

    public Integer getReportCreator() {
        return reportCreator;
    }

    public void setReportCreator(Integer reportCreator) {
        this.reportCreator = reportCreator;
    }


    // ==================================================

    @Column(name = "report_relation")
    private String reportRelation;

    public String getReportRelation() {
        return reportRelation;
    }

    public void setReportRelation(String reportRelation) {
        this.reportRelation = reportRelation;
    }


    // ==================================================

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    // ==================================================

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    
 // ==================================================

    @Column(name = "status")
    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    
    
}
