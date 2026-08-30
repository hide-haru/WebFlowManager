package com.example.sukemage.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.sukemage.model.entity.ReservationDat;
import com.example.sukemage.model.request.ReservationRequest;
import com.example.sukemage.repository.ReservationRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@Service
public class CallendarService {
	
	private final ReservationRepository reservationRepository;
	private final HttpSession session;
	
	public CallendarService (ReservationRepository reservationRepository, HttpSession session) {
		this.reservationRepository = reservationRepository;
		this.session = session;
	}
	
	//====================カレンダーイベントの取得===================
	public List<ReservationDat> getEvent() {
		System.out.println("service処理");
		Integer uid = (Integer) session.getAttribute("u_id");
		List<ReservationDat> reservations = reservationRepository.findByUid(uid);
		//for (ReservationDat reservation: reservations) {
		//	System.out.println(reservation.getTitle());
		//}
		
		return reservations;
	}
	
	
	//====================カレンダー予約：新規===================
	public void postNewEvent(ReservationRequest request) {
		System.out.println(request.toString());
		
		ReservationDat reservations = new ReservationDat();
		
		Integer uid = (Integer) session.getAttribute("u_id");
		LocalDateTime startDateTime = LocalDateTime.parse(
				request.getStartDate() + " " + request.getStartTime(),
				DateTimeFormatter.ofPattern("yyyy/MM/dd H:mm")
				);
		LocalDateTime endDateTime = LocalDateTime.parse(
				request.getEndDate() + " " + request.getEndTime(),
				DateTimeFormatter.ofPattern("yyyy/MM/dd H:mm")
				);
		
		reservations.setUid(uid);
		reservations.setTitle(request.getTitle());
		reservations.setDescription(request.getDescription());
		reservations.setStartdatetime(startDateTime);
		reservations.setEnddatetime(endDateTime);
		
		reservationRepository.save(reservations);
	}
	
	
	//====================カレンダー予約：更新===================
	@Transactional
	public void postAddEvent(ReservationRequest request) {
		System.out.println(request.toString());
				
		Integer uid = (Integer) session.getAttribute("u_id");
		System.out.println(uid);
		System.out.println(request.getId());
		LocalDateTime startDateTime = LocalDateTime.parse(
				request.getStartDate() + " " + request.getStartTime(),
				DateTimeFormatter.ofPattern("yyyy/MM/dd H:mm")
				);
		LocalDateTime endDateTime = LocalDateTime.parse(
				request.getEndDate() + " " + request.getEndTime(),
				DateTimeFormatter.ofPattern("yyyy/MM/dd H:mm")
				);
		
		reservationRepository.updateReservationDat(
				request.getId(),
				request.getTitle(),
				request.getDescription(),
				startDateTime,
				endDateTime);
		
	}
	
	
	
	
	public void deleteEvent(Integer request) {
		reservationRepository.deleteById(request);
	}
 	
}
