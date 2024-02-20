package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.*;
import com.example.demo.entities.*;


@Service
public class UserManagerImpl implements UserManager{
	@Autowired
	private UserRepository userRepository;
	

	public void createUser(User user) {
         userRepository.save(user);
    }
	
	public boolean validateUser(User user) {
		
        return userRepository.validateUser(user.getUsername(), user.getPassword());
    }

	@Override
	public int getUSerId(String username) {
		
		return userRepository.getUserId(username);
	}

	

}
