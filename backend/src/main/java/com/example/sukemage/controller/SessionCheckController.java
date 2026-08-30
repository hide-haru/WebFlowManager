package com.example.sukemage.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class SessionCheckController {
	
	@GetMapping("/session/check")
	public ResponseEntity<Void> checkSession(HttpSession session) {
		System.out.println("セッションチェック");
		Object user = session.getAttribute("u_id");
		
		if (user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		return ResponseEntity.ok().build();
	}

}
