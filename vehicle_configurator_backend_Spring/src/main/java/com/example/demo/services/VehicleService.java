package com.example.demo.services;

import java.util.List;

public interface VehicleService {

	List<?> getCompByModelID(long id, char c);
	List<?> getConfugrableComponents(long id,String c);

}