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

import com.example.demo.entities.AlternateComponent;
import com.example.demo.services.AlternateComponentService;


@RestController
@CrossOrigin
@RequestMapping("/api/alternate-components")
public class AlternateComponentController {

	@Autowired
	AlternateComponentService service;

	@GetMapping(value = "/{modId}/{altcompId}")
	public ResponseEntity<List<?>> showStdComponents(@PathVariable(value = "modId") int mod_id,
			@PathVariable(value = "altcompId") int com_id) {
		List<?> alternateComponents = service.findByModelIdAndAlternateCompId(mod_id, com_id);
		return new ResponseEntity<>(alternateComponents,HttpStatus.OK);
	}
	@GetMapping(value = "/alt/{modId}/{compId}")
	public ResponseEntity<AlternateComponent> showAltenatedComponents(@PathVariable(value = "modId") int mod_id,
			@PathVariable(value = "compId") int com_id) {
		AlternateComponent alternateComponent = service.findByModelIdAndCompId(mod_id, com_id);
		return new ResponseEntity<>(alternateComponent,HttpStatus.OK);
	}

}
