package com.example.demo.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Vehicle;
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

	@Query(nativeQuery = true, value = "select * from vehicles v,components c where v.comp_id=c.id and (mod_id=:modelId and comp_type=:comp_type)")
	List<Map<String,Object>> findCompByModelId(@Param("modelId") long id, @Param("comp_type") char comp_type);
	
	@Query(nativeQuery = true, value = "Select * from vehicles v,components c where v.comp_id=c.id and (is_configurable=:is_configurable and mod_id=:modelId)")
	List<Map<String,Object>>findConfugurableComponents(@Param("modelId") long id,@Param("is_configurable") String is_configurable );
}