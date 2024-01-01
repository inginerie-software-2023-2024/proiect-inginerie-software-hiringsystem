package ro.hiringsystem.service;

public interface EmailSenderService {

    void sendAccountConfirmEmail(String toEmail, String userName, String token);

    void sendInterviewCreationEmail(String toEmail, String applicantName, String interviewId);

    void sendApplicationSubmittedEmail(String toEmail, String applicantName, String jobTitle);

    void sendApplicationAcceptedEmail(String toEmail, String applicantName, String jobTitle);

    void sendApplicationRejectedEmail(String toEmail, String applicantName, String jobTitle);

    void sendApplicationErasedEmail(String toEmail, String applicantName, String jobTitle);

    void sendBasicEmail(String fromName, String toEmail, String subjectEmail, String bodyEmail);

    void sendResetPasswordEmail(String toEmail, String userName, String token);
}
