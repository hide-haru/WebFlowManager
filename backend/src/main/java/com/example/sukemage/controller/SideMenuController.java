package com.example.sukemage.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sukemage.model.entity.PagenameMst;
import com.example.sukemage.service.SideMenuService;

@RestController
@RequestMapping("/api")
public class SideMenuController {
	
	private final SideMenuService sideMenuService;
	public SideMenuController(SideMenuService sideMenuService) {
		this.sideMenuService = sideMenuService;
	}

	@GetMapping("/getpagename")
	public List<PagenameMst> getPageName() {
		return sideMenuService.getPageName();
	}
	
}
