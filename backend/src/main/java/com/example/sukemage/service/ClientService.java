package com.example.sukemage.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.sukemage.model.entity.ClientDat;
import com.example.sukemage.model.entity.ClientDetailDat;
import com.example.sukemage.model.request.ClientDetailRequest;
import com.example.sukemage.repository.ClientDetailRepository;
import com.example.sukemage.repository.ClientRepository;
import com.example.sukemage.response.ClientDetailResponse;

@Service
public class ClientService {
	
	private final ClientRepository clientRepository;
	private final ClientDetailRepository clientDetailRepository;
	public ClientService(
			ClientRepository clientRepository,
			 ClientDetailRepository clientDetailRepository) {
		this.clientRepository = clientRepository;
		this.clientDetailRepository = clientDetailRepository;
	}
	
	public List<ClientDat> getClientList(String companyName, String pic) {
		System.out.println("companyName：" + companyName);
		System.out.println("pic：" + pic);
		List<ClientDat> list;
		if (companyName == "" && pic == "") {
			list = clientRepository.findAll();
		} else {
			list = clientRepository.findByClient(companyName, pic);
		}
		
		return list;
	}
	
	
	public List<ClientDetailResponse> getClientDetaillist(Integer clientCode) {
		
		List<Object[]> result = clientDetailRepository.findByClientDetail(clientCode);
		List<ClientDetailResponse> responseList = new ArrayList<>();
		
		for (Object[] row: result) {
			ClientDetailResponse response = new ClientDetailResponse();
			

	        response.setId((Integer) row[0]);
	        response.setClientName((String) row[1]);
	        response.setCategory((String) row[2]);
	        response.setTitle((String) row[3]);
	        response.setMemo((String) row[4]);

	        if ((Instant) row[5] != null) {
	        	response.setWorkStartTime(
    	            ((Instant) row[5])
    	                .atZone(ZoneId.of("Asia/Tokyo"))
    	                .toLocalDateTime()
    	        );
	        } else {
	        	row[5] = null;
	        }
	        
	        
	        if ((Instant) row[6] != null) {
	        	response.setWorkEndTime(
    	            ((Instant) row[6])
    	                .atZone(ZoneId.of("Asia/Tokyo"))
    	                .toLocalDateTime()
    	        );
	        } else {
	        	row[6] = null;
	        }
	        

	        response.setName((String) row[7]);
	        response.setReportRelation((Long) row[8]);

	        response.setCreatedAt(
	            ((Instant) row[9])
	                .atZone(ZoneId.of("Asia/Tokyo"))
	                .toLocalDateTime()
	        );

	        if (row[10] != null) {
	            response.setUpdatedAt(
	                ((Instant) row[10])
	                    .atZone(ZoneId.of("Asia/Tokyo"))
	                    .toLocalDateTime()
	            );
	        }

	        responseList.add(response);
		}
		
		return responseList;
	}
	
	
	
	public ClientDetailResponse getClientDetail(Integer detailId) {
		Object[] result = clientDetailRepository.findByDetailid(detailId);
		Object[] row = (Object[]) result[0];
		
		ClientDetailResponse response = new ClientDetailResponse();


		response.setId((Integer) row[0]);

	    //==================================================
	    response.setClientName((String) row[1]);

	    //==================================================
	    response.setCategory((String) row[2]);

	    //==================================================
	    response.setTitle((String) row[3]);

	    //==================================================
	    response.setMemo((String) row[4]);

	    //==================================================
	    // work_starttime
	    Instant workStartTime = (Instant) row[5];

	    if (workStartTime != null) {
	        response.setWorkStartTime(
	            workStartTime
	                .atZone(ZoneId.of("Asia/Tokyo"))
	                .toLocalDateTime()
	        );
	    } else {
	    	response.setWorkStartTime(null);
	    }

	    //==================================================
	    // work_endtime
	    Instant workEndTime = (Instant) row[6];

	    if (workEndTime != null) {
	        response.setWorkEndTime(
	            workEndTime
	                .atZone(ZoneId.of("Asia/Tokyo"))
	                .toLocalDateTime()
	        );
	    } else {
	    	response.setWorkEndTime(null);
	    }

	    //==================================================
	    response.setName((String) row[7]);

	    //==================================================
	    response.setReportRelation((Long) row[8]);

	    //==================================================
	    // created_at
	    Instant createdAt = (Instant) row[9];

	    if (createdAt != null) {
	        response.setCreatedAt(
	            createdAt
	                .atZone(ZoneId.of("Asia/Tokyo"))
	                .toLocalDateTime()
	        );
	    }

	    //==================================================
	    // updated_at
	    Instant updatedAt = (Instant) row[10];

	    if (updatedAt != null) {
	        response.setUpdatedAt(
	            updatedAt
	                .atZone(ZoneId.of("Asia/Tokyo"))
	                .toLocalDateTime()
	        );
	    }
	    
	  //==================================================
	    response.setClientCode((Integer) row[11]);

	    System.out.println(response.getCategory());

	    return response;
	}
	
	
	
	public ClientDetailResponse newClientDetail(ClientDetailRequest request) {
		ClientDetailDat insertDetail = new ClientDetailDat();
		insertDetail.setClientCode(request.getClientCode());
		insertDetail.setStatus(0);
		ClientDetailDat savedDetail = clientDetailRepository.save(insertDetail);
		ClientDetailResponse response = new ClientDetailResponse();
		response.setId(savedDetail.getId());
		return response;
	}
	
	
	
	//各クライアントチケットの新規作成
	public void postClientDetailCreate(ClientDetailRequest request) {
		System.out.println("新規作成");
		System.out.println(request.toString());
		
		ClientDetailDat clientdetail = new ClientDetailDat();
		clientdetail.setClientCode(request.getClientCode());
		clientdetail.setCategory(request.getCategory());
		clientdetail.setTitle(request.getTitle());
		clientdetail.setMemo(request.getMemo());
		clientdetail.setWorkStarttime(request.getWorkStartTime());
		clientdetail.setWorkEndtime(request.getWorkEndTime());
		clientdetail.setCreatedAt(LocalDateTime.now());
		
		clientDetailRepository.save(clientdetail);
	}
	
	
	//各クライアントチケットの編集
	public void postClientDetailAdd(ClientDetailRequest request) {
		System.out.println(request.getCategory());
		ClientDetailDat updateclientdetail =
	            clientDetailRepository.findById(request.getId())
	                .orElseThrow(() -> new RuntimeException("データが存在しません"));
		
		updateclientdetail.setCategory(request.getCategory());
		updateclientdetail.setTitle(request.getTitle());
		updateclientdetail.setMemo(request.getMemo());
		updateclientdetail.setWorkStarttime(request.getWorkStartTime());
		updateclientdetail.setWorkEndtime(request.getWorkEndTime());
		if (request.getCreatedAt() == null) {
			updateclientdetail.setCreatedAt(LocalDateTime.now());
		}
		updateclientdetail.setUpdatedAt(LocalDateTime.now());
		updateclientdetail.setStatus(1);
		clientDetailRepository.save(updateclientdetail);
		
	}
	
	
	//各クライアントチケットの削除
	public void postClientDetailDelete(ClientDetailRequest request) {
		clientDetailRepository.deleteById(request.getId());
	}
	
	

}
