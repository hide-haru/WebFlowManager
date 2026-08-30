package com.example.sukemage.repository;

import com.example.sukemage.model.entity.UserMst;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserMst, Integer> {
	
	Optional<UserMst> findByUserId(String userId);

}
