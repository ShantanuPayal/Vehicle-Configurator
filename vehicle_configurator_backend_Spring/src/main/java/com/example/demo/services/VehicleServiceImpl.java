package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	VehicleRepository vehicleRepository;

//	Fetch only Standard components
	@Override
	public List<?> getCompByModelID(long id, char c) {
		return vehicleRepository.findCompByModelId(id, c);
	}

	
	@Override
	public List<?> getConfugrableComponents(long id,String c) {
		return vehicleRepository.findConfugurableComponents(id,c);
	}
	
}