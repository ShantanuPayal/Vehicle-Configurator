package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.VehicleService;



@RestController
@CrossOrigin
@RequestMapping("/api/vehicles")
public class VehicleController {
	
	@Autowired
	VehicleService vehicleService;
	
	
	@GetMapping(value = "/{comp_type}/{id}")
	public ResponseEntity<List<?>> getVehicleByID(@PathVariable char comp_type, @PathVariable long id) {

		try {
			 List<?> components = vehicleService.getCompByModelID(id, comp_type);
			return new ResponseEntity<>(components,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(value = "/config/{id}/{is_configurable}")
	public ResponseEntity<List<?>> getConfugurableComponentsByModId(@PathVariable long id, @PathVariable String is_configurable) {
	    try {
	        List<?> components = vehicleService.getConfugrableComponents(id, is_configurable);
	        return new ResponseEntity<>(components, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
	}

	
}