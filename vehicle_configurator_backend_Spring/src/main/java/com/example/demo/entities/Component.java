package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="components")
public class Component {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
		return id;
	}

	public String getCompName() {
		return compName;
	}

	private String compName;

	public void setId(Long id) {
		this.id = id;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

    // Getters and setters
	
}
