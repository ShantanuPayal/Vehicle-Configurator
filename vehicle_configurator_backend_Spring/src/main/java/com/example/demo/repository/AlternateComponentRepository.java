package com.example.demo.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.entities.AlternateComponent;

public interface AlternateComponentRepository extends JpaRepository<AlternateComponent, Long>  {
	/*
	@Query(nativeQuery = true, value = "select c.id, c.comp_name, a.delta_price from alternate_components a join components c on a.alt_comp_id = c.id where a.mod_id = :mod_id and a.comp_id = :comp_id and a.comp_id <> a.alt_comp_id")
	List<Map<String,Object>> findByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);
	 */
	
	@Query(nativeQuery = true, value = "Select * from alternate_components ac,Components c where (mod_id=:mod_id and  alt_comp_id=:comp_id) and ac.comp_id=c.id")
	List<Map<String,Object>> findByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);

	@Query(nativeQuery=true,value="select * from alternate_components where comp_id=:comp_id and mod_id=:mod_id")
	AlternateComponent findAlternateCompByModelIdAndCompId(@Param("mod_id") int mod_id, @Param("comp_id") int comp_id);
}