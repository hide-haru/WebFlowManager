package com.example.sukemage.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.sukemage.model.entity.ReservationDat;

public interface ReservationRepository extends JpaRepository<ReservationDat, Integer> {

	//getEvent()
    @Query(value = """
            SELECT *
            FROM reservation_dat
            WHERE u_id = :uid
            """, nativeQuery = true)
    List<ReservationDat> findByUid(@Param("uid") Integer uid);
    
    
    //postAddEvent()
    @Modifying
    @Query("""
    		update ReservationDat r
    		set
    			r.title = :title,
    			r.description = :description,
    			r.startdatetime = :startdatetime,
    			r.enddatetime = :enddatetime
    		where r.id = :id
    		""")
    	int updateReservationDat (
    			@Param("id") Integer id,
    			@Param("title") String title,
    			@Param("description") String description,
    			@Param("startdatetime") LocalDateTime startdatetime,
    			@Param("enddatetime") LocalDateTime enddatetime
    	);

}
