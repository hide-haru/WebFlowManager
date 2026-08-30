package com.example.sukemage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.sukemage.model.entity.ClientDetailDat;
import com.example.sukemage.response.ClientDetailResponse;

public interface ClientDetailRepository extends JpaRepository<ClientDetailDat, Integer> {
	
	
	//クライアント一覧
	@Query(value="""
			select
				cd.id,
				c.client_name,
				cd.category,
				cd.title,
				cd.memo,
				cd.work_starttime,
				cd.work_endtime,
				u.name,
				r.report_id as report_relation,
				cd.created_at,
				cd.updated_at
			from clientdetail_dat cd
			left join client_dat c
			on cd.client_code = c.client_code
			left join user_mst u
			on cd.report_creator = u.id
			left join report_dat r
			on cd.id = r.clientdetail_id
			where cd.client_code = :clientCode
				and cd.status = 1
			""", nativeQuery=true)
	List<Object[]> findByClientDetail(
			@Param("clientCode") Integer clientCode);
	
	
	//クライアントチケット一覧（チケットID単位）
	@Query(value="""
			select
				cd.id,
				c.client_name,
				cd.category,
				cd.title,
				cd.memo,
				cd.work_starttime,
				cd.work_endtime,
				u.name,
				r.report_id as report_relation,
				cd.created_at,
				cd.updated_at,
				c.client_code
			from clientdetail_dat cd
			left join client_dat c
			on cd.client_code = c.client_code
			left join user_mst u
			on cd.report_creator = u.id
			left join report_dat r
			on cd.id = r.clientdetail_id
			where cd.id = :detailId
				and cd.status = 1
			""", nativeQuery=true)
	Object[] findByDetailid(
			@Param("detailId") Integer detailId);

}
