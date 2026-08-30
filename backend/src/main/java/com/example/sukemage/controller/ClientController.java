package com.example.sukemage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sukemage.model.entity.ClientDat;
import com.example.sukemage.model.request.ClientDetailRequest;
import com.example.sukemage.response.ClientDetailResponse;
import com.example.sukemage.service.ClientService;

@RestController
@RequestMapping("/api")
public class ClientController {
	
	private final ClientService clientService;
	public ClientController(ClientService clientService) {
		this.clientService = clientService;
	}
	
	@GetMapping("/getclientlist")
	public List<ClientDat> getClientList(
			@RequestParam String companyName,
			@RequestParam String pic) {
		return clientService.getClientList(companyName, pic);
	}
	
	@GetMapping("/getclientdetaillist")
	public List<ClientDetailResponse> getClientDetaillist(
			@RequestParam Integer clientCode) {
		return clientService.getClientDetaillist(clientCode);
	}
	
	@GetMapping("/getclientdetail")
	public ClientDetailResponse getClientDetail(
			@RequestParam Integer detailId) {
		return clientService.getClientDetail(detailId);
	}
	
	
	@PostMapping("/newclientdetail")
	public ClientDetailResponse newClientDetail(@RequestBody ClientDetailRequest request) {
		return clientService.newClientDetail(request);
	}
	
	
	
	//各クライアントチケットの新規作成
	@PostMapping("/postclientdetailcreate")
	public Map<String, Object> postClientDetailCreate(@RequestBody ClientDetailRequest request) {
		
		Map<String, Object> result = new HashMap<>();
		
		try {
			clientService.postClientDetailCreate(request);
			result.put("success", true);
			result.put("message", "新規登録に成功しました。");
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "登録時にエラーが発生しました。");
			return result;
		}
	}
	
	
	//各クライアントチケットの編集
	@PutMapping("postclientdetailadd")
	public Map<String, Object> postClientDetailAdd(@RequestBody ClientDetailRequest request) {
		
		Map<String, Object> result = new HashMap<>();
		try {
			clientService.postClientDetailAdd(request);
			result.put("success", true);
			result.put("message", "完了しました。");
			return result;
		} catch(Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "処理に失敗しました。");
			return result;
		}
		
	}
		
		
	//各クライアントチケットの削除
	@DeleteMapping("postclientdetaildelete")
	public Map<String, Object> postClientDetailDelete(@RequestBody ClientDetailRequest request) {
		
		Map<String, Object> result = new HashMap<>();
		System.out.println(request.getId());
		try {
			clientService.postClientDetailDelete(request);
			result.put("success", true);
			result.put("message", "削除完了しました。");
			return result;
		} catch(Exception e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("message", "削除時にエラーが発生しました。");
			return result;
		}
		
	}

}
