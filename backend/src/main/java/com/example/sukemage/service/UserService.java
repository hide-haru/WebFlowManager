package com.example.sukemage.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.sukemage.model.entity.UserMst;
import com.example.sukemage.model.request.UserRequest;
import com.example.sukemage.repository.UserRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@Service
public class UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	public UserService (
			UserRepository userRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	
	//====================ログイン処理===================
	public Map<String, Object> userLogin(UserRequest request, HttpSession session) {
		System.out.println("ログイン認証を行います。");
		System.out.println(request.toString());
		
		Map<String, Object> result = new HashMap<>();
		
		Optional<UserMst> userOptional = userRepository.findByUserId(request.getUserId());
		
		
		if (userOptional.isPresent()) {
			
			UserMst user = userOptional.get();
			
			//パスワード一致確認処理
			boolean passwordConfirm = passwordEncoder.matches(request.getPassword(), user.getPassword());
			
			if (passwordConfirm) {
				result.put("success", true);
				result.put("message", "ユーザログイン処理成功");
				
				session.setAttribute("u_id", user.getId());
				
			} else {
				result.put("success", false);
				result.put("message", "ユーザまたはパスワードが違います。");
			}
		} else {
			result.put("success", false);
			result.put("message", "ユーザまたはパスワードが違います。");
		}
		
		return result;
	}
	
	
	
	//====================新規ユーザ登録===================
	@Transactional
	public Map<String, Object> userAdd(UserRequest request) {
		System.out.println("新規ユーザ登録の追加を行います。");
		System.out.println(request.toString());
		
		Map<String, Object> result = new HashMap<>();
		
		//userIdの重複チェック
		Optional<UserMst> userOptional = userRepository.findByUserId(request.getUserId());
		
		if (userOptional.isPresent()) {
			result.put("success", false);
			result.put("message", "そのユーザーIDは既に登録されています。");
			return result;
		}
		
		UserMst user = new UserMst();
		user.setUserId(request.getUserId());
		user.setName(request.getName());
		//ハッシュ化パスワードで保存
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setUpdatedAt(LocalDateTime.now());
		
		userRepository.save(user);
		result.put("success", true);
		result.put("message", "新規登録に成功しました。");
		return result;
		
	}

}
