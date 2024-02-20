package com.example.demo.services;
import java.util.List;
import com.example.demo.entities.Model;
public interface ModelService 
{
	List<Model> getAllModelsByManuIdAndSegId(long segId,long manuId);
	
	List<Model> getAllModels();
	
	Model getModelsById(long id);
}