package com.example.sukemage.controller;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sukemage.model.request.UserRequest;
import com.example.sukemage.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	
	private final UserService userService;
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	//====================ログイン処理===================
	@PostMapping("/login")
	public Map<String, Object> userLogin(
			@RequestBody UserRequest request,
			HttpSession session) {
		
		Map<String, Object> result = new HashMap<>();
		
		result = userService.userLogin(request, session);
		return result;
	}

	
	
	//===================新規ユーザ登録===================
	@PostMapping("/useradd")
	public Map<String, Object> userAdd(@RequestBody UserRequest request) {
		Map<String, Object> result = new HashMap<>();
		System.out.println("新規ユーザ登録の追加を行います。");
		
		try {
			result = userService.userAdd(request);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "登録処理中にエラーが発生しました。");
			return result;
		}
	}
	
}
