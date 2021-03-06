package com.example.javaschoolproject.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailSend;

    public void sendMail(String email, String subject, String body) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(emailSend);
        mail.setTo(email);
        mail.setSubject(subject);
        mail.setText(body);

        javaMailSender.send(mail);

        System.out.println("Email sent successfully");
    }
}
