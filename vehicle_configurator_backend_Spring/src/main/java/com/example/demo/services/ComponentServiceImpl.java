package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Component;
import com.example.demo.repository.ComponentRepository;

import java.util.List;

@Service
public class ComponentServiceImpl {
	@Autowired
    private ComponentRepository componentRepository;
 
   /* public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }*/

	public List<Component> getAllComponents() {
		// TODO Auto-generated method stub
		  return componentRepository.findAll();
	}
	public Component getComponentById(long id) {
		return componentRepository.findById(id).get();
	}

    // Other methods as needed
}
