import React from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
    {
        question: "Can I view available jobs without having an account?",
        answer:
            "Yes, available jobs can be accessed by clicking on 'Jobs' in the top navbar of the website.",
    },
    {
        question:
            "Can I apply for a job even if I don't have a created account or if I'm not logged in?",
        answer: "No, applying is only possible for logged-in users.",
    },
    {
        question: "What details can I see within a job posting?",
        answer:
            "By accessing any available job posted on the site, you can view information such as the sought position, whether it's part-time or full-time, a brief description of the role, required skills, company's offer, start date, expected salary, and weekly hours needed.",
    },
    {
        question: "Can I change my authentication password?",
        answer:
            "Yes, if you've forgotten it, you can reset it using the 'Forgot Password' option in the Login panel. If you want to reset it and already know your current password, you can do so from 'My Profile' using the 'Change Password' option.",
    },
    {
        question: "What email can I use to register in the application?",
        answer:
            "You can use any online email service, such as gmail.com, hotmail.com, including the company's internal email service to which you belong.",
    },
    {
        question:
            "Does the application include a video-calling service for interviews?",
        answer:
            "Yes, the application has an in-house service for audio/video interviews with selected applicants.",
    },
    {
        question:
            "How are applicants notified if they have successfully passed the screening process?",
        answer:
            "Applicants who have successfully passed the screening process are notified via email.",
    },
    {
        question:
            "What is the process that an applicant's application follows in the selection process?",
        answer: "The schema can be viewed on the first page.",
    },
    {
        question:
            "How do I schedule an interview if I received an email that I passed the screening process?",
        answer:
            "Once an interview is scheduled, from the 'My Interviews' page, you will have the option to select an available slot.",
    },
    {
        question: "How can I change an already scheduled slot for an interview?",
        answer: "For this action, you need to contact us at contact@mycompany.com.",
    },
];

const QA = ({
                question,
                answer,
                value,
            }: {
    question: string;
    answer: string;
    value: string;
}) => {
    return (
        <AccordionItem value={value}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
    );
};

const FAQPage = () => {
    return (
        <div className="m-auto w-full p-5 lg:w-[70%]">
            <h1 className="mb-10 text-3xl font-bold">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className="w-full">
                {questions.map((q, i) => (
                    <QA key={i} {...q} value={`item-${i}`} />
                ))}
            </Accordion>
        </div>
    );
};

export default FAQPage;