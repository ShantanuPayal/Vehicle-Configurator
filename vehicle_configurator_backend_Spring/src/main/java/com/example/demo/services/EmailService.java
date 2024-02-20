package com.example.demo.services;

import com.example.demo.entities.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);
  
}
