package com.example.demo.services;

import com.example.demo.entities.User;

public interface UserManager  {
	
	 public void createUser(User user) ;
	 public boolean validateUser(User user);
	 public int getUSerId(String username);

}