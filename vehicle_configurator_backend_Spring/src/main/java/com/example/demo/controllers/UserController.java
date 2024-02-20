package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.services.UserManager;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

	@Autowired
    private UserManager userManager;

	@PostMapping(value="/signup")
    public void registerCompany(@RequestBody User Reg) {
        userManager.createUser(Reg);
    }
	

	@PostMapping(value="/login")
    public boolean validateUser(@RequestBody User Reg) {
		return userManager.validateUser(Reg);
    }	 
	
	@GetMapping("/{username}")
	public int getUserID(@PathVariable("username")String username) 
	{
		return userManager.getUSerId(username);
	}

}
