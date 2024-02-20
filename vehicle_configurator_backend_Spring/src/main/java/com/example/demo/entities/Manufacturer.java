package com.example.demo.entities;

import jakarta.persistence.*;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "manufacturers")
public class Manufacturer {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String manuName;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "segId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Segment segment;   
    
    public Long getId() {
        return id;
    }

    public String getName() {
        return manuName;
    }

    public Segment getSegment() {
        return segment;
    }

}
