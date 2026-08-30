package com.example.sukemage.model.request;

//ログインリクエスト
//ユーザ追加リクエスト
public class UserRequest {
	
	//==================================================
	
	private String userId;
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	//==================================================
	
	private String name;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	//==================================================
	
	private String password;
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	//==================================================
	@Override
	public String toString() {
		return "UserAddRequest { " +
					"userId:" + userId + '\'' +
					"name:" + name + '\'' +
					"password:" + password + '\'' +
				"}";
	}

}
