package com.example.demo.services;

import java.util.List;
import java.util.Map;

import com.example.demo.entities.AlternateComponent;

public interface AlternateComponentService {
	public List<Map<String, Object>> findByModelIdAndAlternateCompId(int mod_id, int alt_comp_id);
	public AlternateComponent findByModelIdAndCompId(int mod_id, int comp_id);
}
