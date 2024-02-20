	package com.example.demo.controllers;

import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Invoice;
import com.example.demo.services.InvoiceServiceImpl;


import jakarta.servlet.http.HttpServletResponse;



@RestController
@CrossOrigin
@RequestMapping("/api/invoice")
public class InvoiceController {

	@Autowired
	private InvoiceServiceImpl invoiceService;

	@PostMapping("/")
	public ResponseEntity<?> addToCart(@RequestBody Invoice c) {
		try {
			System.out.println(c);
			invoiceService.saveCart(c);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Invoice>> getAllInvoice() {
		try {
				List<Invoice> invoices=invoiceService.getAllInvoice();
			return new ResponseEntity<>(invoices,HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/export/pdf")
	 public void exportToPDF(HttpServletResponse response) throws  IOException {
		        response.setContentType("application/pdf");
		        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		        String currentDateTime = dateFormatter.format(new Date(0));
		        
		        String headerKey = "Content-Disposition";
		        String headerValue = "attachment; filename=Products_" + currentDateTime + ".pdf";
		        response.setHeader(headerKey, headerValue);
		        
		        List<Invoice> products = invoiceService.getAllInvoice();
		         
		        invoicePDFExporter exporter = new invoicePDFExporter(products);
		        try {
					exporter.export(response);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
		 }


}