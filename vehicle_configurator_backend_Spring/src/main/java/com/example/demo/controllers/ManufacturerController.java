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

import com.example.demo.entities.Manufacturer;

import com.example.demo.services.ManufacturerService;
import com.example.handlers.ResponseHandler;


@RestController
@CrossOrigin
@RequestMapping("/api/manufacturers")
public class ManufacturerController {

	@Autowired
	ManufacturerService manufacturerService;

	@GetMapping("/{segId}")
	public ResponseEntity<List<Manufacturer>> getManufacturers(@PathVariable(value = "segId") Long segId) {
			try{List<Manufacturer> manufacurers = manufacturerService.getAllManufacturersById(segId);
			return new ResponseEntity<>(manufacurers,HttpStatus.OK);}
			catch(Exception e) 
			{
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
	}
}
