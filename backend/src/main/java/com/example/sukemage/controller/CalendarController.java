package com.example.sukemage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sukemage.model.entity.ReservationDat;
import com.example.sukemage.model.request.ReservationRequest;
import com.example.sukemage.service.CallendarService;

@RestController
@RequestMapping("/api")
public class CalendarController {
	
	private final CallendarService callendarService;
	public CalendarController (CallendarService callendarService) {
		this.callendarService = callendarService;
	}
	
	//====================カレンダーイベントの取得===================
	@GetMapping("/getevent")
	public List<ReservationDat> getEvent() {
		return callendarService.getEvent();
	}
	
	
	//====================カレンダー予約：新規===================
	@PostMapping("postnewevent")
	public Map<String, Object> postNewEvent(@RequestBody ReservationRequest request) {
		
		Map<String, Object> result = new HashMap<>();
		
		try {
			callendarService.postNewEvent(request);
			result.put("success", true);
			result.put("message", "カレンダー新規登録完了");
			return result;
		} catch(Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "登録処理中にエラーが発生しました。");
			return result;
		}
		
	}
	
	
	//====================カレンダー予約：更新===================
	@PostMapping("postaddevent")
	public Map<String, Object> postAddEvent(@RequestBody ReservationRequest request) {
		
		Map<String, Object> result = new HashMap<>();
		
		try {
			callendarService.postAddEvent(request);
			result.put("success", true);
			result.put("message", "カレンダー更新処理完了");
			return result;
		} catch(Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "登録処理中にエラーが発生しました。");
			return result;
		}
	}
	
	
	@DeleteMapping("/deleteevent")
	public Map<String, Object> deleteEvent(@RequestBody ReservationRequest request) {
		Map<String, Object> result = new HashMap<>();
		
		try {
			callendarService.deleteEvent(request.getId());
			result.put("success", true);
			result.put("message", "削除処理が完了しました。");
			return result;
		} catch(Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "エラーが発生しました。");
			return result;
		}
		
	}
	

}
