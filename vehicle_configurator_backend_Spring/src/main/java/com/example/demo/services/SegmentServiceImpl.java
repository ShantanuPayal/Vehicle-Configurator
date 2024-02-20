package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Segment;
import com.example.demo.repository.SegmentRepository;

import java.util.List;

@Service
public class SegmentServiceImpl implements SegmentService {
    

    @Autowired
    SegmentRepository segmentRepository;
    
    @Override
    public List<Segment> getAllSegments() {
        return segmentRepository.findAll();
    }

    /*
    //@Override
    public Segment getSegmentById(int id) {
      return segmentRepository.findById(id).orElse(null);
    }
    */

	
}