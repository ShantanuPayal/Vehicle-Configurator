package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Manufacturer;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
    
	//@Query(nativeQuery=true,value="Select m from Manufacturer m where m.Segment.id=:Seg_Id")
	List<Manufacturer> findBySegmentId(Long segId);
	//@Param("SegId")
}