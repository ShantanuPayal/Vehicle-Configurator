package com.example.demo.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "segments")
public class Segment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "seg_name", nullable = false, length = 255)
    private String segName;

    
    public Segment() {
    }
    
    public Segment(String segName) {
        this.segName = segName;
    }

    public int  getId() {
        return id;
    }

    public String getName() {
        return segName;
    }
    
    @Override
    public String toString() 
    {
        return "Segment [id=" + id + ", name=" + segName + "]";
    }
}