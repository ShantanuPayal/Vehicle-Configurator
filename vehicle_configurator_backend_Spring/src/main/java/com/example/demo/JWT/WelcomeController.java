package com.example.demo.JWT;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {
	
	@GetMapping("/public/welcome")
	public String disp1()
	{
		return "Welcome boss";
	}

}
