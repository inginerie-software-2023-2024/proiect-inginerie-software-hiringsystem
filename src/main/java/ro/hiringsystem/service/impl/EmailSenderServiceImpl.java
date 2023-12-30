package ro.hiringsystem.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ro.hiringsystem.service.EmailSenderService;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailSenderServiceImpl implements EmailSenderService {

    private final JavaMailSender javaMailSender;
    private final ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String EMAIL;

    public void sendBasicEmail(String fromName, String toEmail, String subjectEmail, String bodyEmail){
        /* A SIMPLER FORMAT, might be useful
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("HiringSystem");
        msg.setTo(toEmail);
        msg.setSubject(subjectEmail);
        msg.setText(bodyEmail);
        */

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true,"utf-8");
            helper.setText(bodyEmail, true);
            helper.setTo(toEmail);
            helper.setSubject(subjectEmail);
            helper.setFrom(EMAIL, fromName);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendAccountConfirmEmail(String toEmail, String userName, String token){
        try {
            String subject = "Confirm your account";
            Resource htmlResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.html");
            String htmlContent = readResourceContent(htmlResource);

            // Load CSS file
            Resource cssResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.css");
            String cssContent = readResourceContent(cssResource);

            // Combine HTML and CSS
            String body = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

            sendBasicEmail("HiringSystem", toEmail, subject, body.replace("%user-name%", userName).replace("%token-placeholder%", token));
        }catch(Exception x){
            x.printStackTrace();
        }
    }

    @Override
    public void sendInterviewCreationEmail(String toEmail, String applicantName, String interviewId) {
        try {
            String subject = "Interview Scheduled";
            Resource htmlResource = resourceLoader.getResource("classpath:" + "email_templates/interview.html");
            String htmlContent = readResourceContent(htmlResource);

            // Load CSS file
            Resource cssResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.css");
            String cssContent = readResourceContent(cssResource);

            // Combine HTML and CSS
            String body = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

            sendBasicEmail("HiringSystem", toEmail, subject, body.replace("%applicant-name%", applicantName).replace("%room-id%", interviewId));
        }catch(Exception x){
            x.printStackTrace();
        }
    }

    @Override
    public void sendApplicationSubmittedEmail(String toEmail, String applicantName, String jobTitle) {
        try {
            String subject = "Application Submitted";
            Resource htmlResource = resourceLoader.getResource("classpath:" + "email_templates/submitted.html");
            String htmlContent = readResourceContent(htmlResource);

            // Load CSS file
            Resource cssResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.css");
            String cssContent = readResourceContent(cssResource);

            // Combine HTML and CSS
            String body = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

            sendBasicEmail("HiringSystem", toEmail, subject, body.replace("%applicant-name%", applicantName).replace("%job-title%", jobTitle));
        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    @Override
    public void sendApplicationAcceptedEmail(String toEmail, String applicantName, String jobTitle) {
        try {
            String subject = "Application Accepted";
            Resource htmlResource = resourceLoader.getResource("classpath:" + "email_templates/accepted.html");
            String htmlContent = readResourceContent(htmlResource);

            // Load CSS file
            Resource cssResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.css");
            String cssContent = readResourceContent(cssResource);

            // Combine HTML and CSS
            String body = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

            sendBasicEmail("HiringSystem", toEmail, subject, body.replace("%applicant-name%", applicantName).replace("%job-title%", jobTitle));
        } catch (Exception x) {
            x.printStackTrace();
        }
    }

    @Override
    public void sendApplicationRejectedEmail(String toEmail, String applicantName, String jobTitle) {
        try {
            String subject = "Application Rejected";
            Resource htmlResource = resourceLoader.getResource("classpath:" + "email_templates/rejected.html");
            String htmlContent = readResourceContent(htmlResource);

            // Load CSS file
            Resource cssResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.css");
            String cssContent = readResourceContent(cssResource);

            // Combine HTML and CSS
            String body = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

            sendBasicEmail("HiringSystem", toEmail, subject, body.replace("%applicant-name%", applicantName).replace("%job-title%", jobTitle));
        }catch(Exception x){
            x.printStackTrace();
        }
    }

    @Override
    public void sendApplicationErasedEmail(String toEmail, String applicantName, String jobTitle) {
        try {
            String subject = "Application Erased";
            Resource htmlResource = resourceLoader.getResource("classpath:" + "email_templates/erased.html");
            String htmlContent = readResourceContent(htmlResource);

            // Load CSS file
            Resource cssResource = resourceLoader.getResource("classpath:" + "email_templates/confirm.css");
            String cssContent = readResourceContent(cssResource);

            // Combine HTML and CSS
            String body = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

            sendBasicEmail("HiringSystem", toEmail, subject, body.replace("%applicant-name%", applicantName).replace("%job-title%", jobTitle));
        }catch(Exception x){
            x.printStackTrace();
        }
    }

    private String readResourceContent(Resource resource) throws IOException {
        try (InputStreamReader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            StringBuilder contentBuilder = new StringBuilder();
            char[] buffer = new char[4096];
            int read;
            while ((read = reader.read(buffer)) != -1) {
                contentBuilder.append(buffer, 0, read);
            }
            return contentBuilder.toString();
        }
    }
}
