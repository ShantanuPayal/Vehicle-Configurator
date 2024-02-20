package com.example.demo.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.context.annotation.Configuration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name="alternate_components")
@Configuration
public class AlternateComponent 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private double deltaPrice;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)	
	@JoinColumn(name = "mod_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Model modId;
 
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "comp_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Component compId;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "alt_comp_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Component altCompId;
	
	public Component getAltCompId() {
		return altCompId;
	}

	public Component getCompId() {
		return compId;
	}

	public Long getId() {
		return id;
	}

	public Model getModId() {
		return modId;
	}
	
	public double getDeltaPrice() {
		return deltaPrice;
	}



}