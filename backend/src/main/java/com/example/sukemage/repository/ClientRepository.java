package com.example.sukemage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.sukemage.model.entity.ClientDat;

public interface ClientRepository extends JpaRepository<ClientDat, Integer> {

	//getClientList()
	@Query(value="""
			select *
			from client_dat
			where client_name like concat('%', :companyName, '%')
				and pic like concat('%', :pic, '%')
			""", nativeQuery = true)
	List<ClientDat> findByClient(
			@Param("companyName") String companyName,
			@Param("pic") String pic);
	
}
