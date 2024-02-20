package com.example.demo.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

enum CompType {
	S, C, I, E 
}

enum IsConfigurable {
	Y, N 
}

@Entity
@Table(name = "vehicles")
public class Vehicle {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 10)
	private CompType compType;
	

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 10)
	private IsConfigurable isConfigurable;
	
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "mod_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Model model;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "comp_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Component component;
    
	public Long getId() {
		return id;
	}

	public Model getModel() {
		return model;
	}

	public Component getComponent() {
		return component;
	}



}