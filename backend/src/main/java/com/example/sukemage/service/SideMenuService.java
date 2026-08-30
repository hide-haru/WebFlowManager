package com.example.sukemage.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.sukemage.model.entity.PagenameMst;
import com.example.sukemage.repository.PageNameRepository;

@Service
public class SideMenuService {
	
	private final PageNameRepository pageNameRepository;
	public SideMenuService(PageNameRepository pageNameRepository) {
		this.pageNameRepository = pageNameRepository;
	}
	
	public List<PagenameMst> getPageName() {
		//pagename_mstから全件取得
		return pageNameRepository.findAll();
		
	}

}
