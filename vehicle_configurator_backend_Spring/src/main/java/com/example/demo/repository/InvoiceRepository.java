package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Invoice;

import jakarta.transaction.Transactional;


@Repository
@Transactional
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
	
}