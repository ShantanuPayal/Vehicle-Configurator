package com.example.demo.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.AlternateComponent;
import com.example.demo.repository.AlternateComponentRepository;



@Service
public class AlternateComponentServiceimpl implements  AlternateComponentService {
	
	@Autowired
	AlternateComponentRepository repository;

	
	public List<Map<String, Object>> findByModelIdAndAlternateCompId(int mod_id, int alt_comp_id) {
		List<Map<String, Object>> data = repository.findByModelIdAndCompId(mod_id, alt_comp_id);
		return data;
	}


	@Override
	public AlternateComponent findByModelIdAndCompId(int mod_id, int comp_id) {
		AlternateComponent component=repository.findAlternateCompByModelIdAndCompId(mod_id, comp_id);
		return component;
	}
	
}