package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResultEmail(
            String toEmail,
            String studentName,
            int marks,
            String result) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject("Learn IQ Test Result");

        message.setText(
                "Hello " + studentName +
                "\n\nMarks : " + marks +
                "\nResult : " + result +
                "\n\nThank You");

        mailSender.send(message);
    }
}
