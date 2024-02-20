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
import com.example.demo.entities.Model;
import com.example.demo.services.ModelService;
import com.example.handlers.ResponseHandler;

@RestController
@CrossOrigin
@RequestMapping("/api/models")
public class ModelController {

	@Autowired
	ModelService modelService;
	
	@GetMapping("/")
	public ResponseEntity<List<Model>> getAllModels() {
		try {
			List<Model> models= modelService.getAllModels();
			return new ResponseEntity<>(models,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	
	@GetMapping("/{manuId}/{segId}")
	public ResponseEntity<List<Model>> getAllModelsByManuIdAndSegId(@PathVariable Long segId, @PathVariable Long manuId) {
		try {
			List<Model>models= modelService.getAllModelsByManuIdAndSegId(segId,manuId);
			return new ResponseEntity<>(models,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		}

	@GetMapping("/{modId}")
	public ResponseEntity<Model>getModelsById(@PathVariable Long modId) {
		try {
			Model models= modelService.getModelsById(modId);
			return new ResponseEntity<>(models,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		}
	

}
