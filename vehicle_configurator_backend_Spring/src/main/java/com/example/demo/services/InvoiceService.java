package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.Invoice;

public interface InvoiceService {
	public Invoice saveCart(Invoice obj);
	public List<Invoice> getAllInvoice();
}
