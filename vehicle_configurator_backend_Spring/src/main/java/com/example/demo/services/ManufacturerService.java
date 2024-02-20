package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Manufacturer;



public interface ManufacturerService {

	List<Manufacturer> getAllManufacturersById(Long id);
}