package com.example.demo.controllers;
import java.awt.Color;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Invoice;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import jakarta.servlet.http.HttpServletResponse;


 
@RestController
public class invoicePDFExporter {
    private List<Invoice> invoices;
     
    public invoicePDFExporter(List<Invoice> invoices) {
        this.invoices = invoices;
    }
 
    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setPadding(5);
        
        cell.setBackgroundColor(Color.BLUE);
    
         
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);
         
        cell.setPhrase(new Phrase("id", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("user_id", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("model_id", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("alt_comp_id", font));
        table.addCell(cell);
                          
        cell.setPhrase(new Phrase("ordered_qty", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("model_price", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("total_price", font));
        table.addCell(cell);
         
    
    }
     
    private void writeTableData(PdfPTable table) {
        for (Invoice invoice : invoices) {
            table.addCell(String.valueOf(invoice.getId()));
            table.addCell(String.valueOf(invoice. getUserId()));
            table.addCell(String.valueOf(invoice.  getModelId()));
            table.addCell(String.valueOf(invoice.getAltCompId()));
            table.addCell(String.valueOf(invoice.getOrderedQty()));
            table.addCell(String.valueOf(invoice.getModelPrice()));
            table.addCell(String.valueOf(invoice.getTotalPrice()));
            
            
            
        }
    }
     
    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
         
        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);
         
        Paragraph p = new Paragraph("List of invoices", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);
         
        document.add(p);
         
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {1.5f, 1.5f, 1.0f, 1.0f});
        table.setSpacingBefore(10);
         
        writeTableHeader(table);
        writeTableData(table);
         
        document.add(table);
         
        document.close();
         
    }
}