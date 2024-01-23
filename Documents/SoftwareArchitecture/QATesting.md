# QA Testing

## Testing the backend

Inside pom.xml we have configured two profiles, **dev and prod**. Dev is used for testing purposes while prod is the deployment configuration. Besides the application.properties which is common to both, we have two separate files for each. The main thing that differs for each is the database. For dev/testing we are using a H2 database and for production we are using a PostgreSQL database. Spring Boot allows us to configure the database connection and driver to be used by Hibernate.

To help us test the application, we are using seeders to create users, jobs, interviews and relationships between them.

We also have a custom config setting `app.data.seeding.enabled` which is set to true in dev only, so we don't seed data in production.

### Automatic Testing

We also wanted to experiment a bit with automatic testing, even though we have not created automated tests for all the business logic inside the application, we created tests for two services (jobs and interview conference rooms related).

For automatic testing we used **JUnit**, a popular testing framework for Java and **Mockito**, a framework which allows us to mock dependencies so we can better test only the logic we are interested in. In our case, the repositories are mocked, so we are not dependent of their implementation, when testing the business logic.

## Testing frontend + backend

In our project, we also implemented **RPA Testing** to simulate user interactions within the application. The objective was to verify whether user actions were executed correctly and in line with our expectations. This method **replicated typical user behaviors**, enabling us to observe how the application responded to diverse inputs and actions. The goal was to ensure the application's proper functionality from a user's perspective and confirm that the anticipated outcomes aligned with our specifications.

We used RPA processes as a comprehensive **end-to-end testing method**, focusing on various functionalities:
1. **Login** - To test the login functionality, we included a process that reads some values (emails and passwords) from an Excel file and types them into the login form. In another Excel file, we logged the error messages encountered to assure that the constraints were properly implemented and the security needs were met.
2. **Register** - The approach is similar to the one presented above, with the only difference being the format of the extracted data for input (additional information such as names, surnames, etc. is included).
3. **Candidate Profile Page** - In this phase, we simulated user interactions to edit profile information. The candidate's profile comprises four specific sections: personal details, academic background, work experience, and projects. Each section operates within a modal when being edited. The tested actions involved modifying or deleting existing fields and adding new information. For frontend testing, we examined the proper functionality of buttons, ensured correct route definitions, and validated the expected opening and closing behavior of modals. Meanwhile, the backend testing centered on validating the accuracy of information updates within the database.
4. **Job Applications** - In this section, we examined how application statuses are modified based on specific actions. First, as a candidate we withdrew one application to confirm its deletion from the database. Then, in an interviewer role, we accepted, deleted, and erased three applications. Our frontend testing aimed to ensure the proper display of information in accordance with defined restrictions. For instance, the visibility of certain buttons after different actions was inspected. We also ensured that application statuses were updated in real-time. On the backend, our focus was on confirming the accurate updating of information within the database.
5. **Jobs** - In this section, our testing focused on the creation functionality for a job. On the frontend, we examined whether the form fields accepted our inputs. On the backend, we ensured that the job was created accurately.

### How to run RPA

To initiate the **Robotic Process Automation (RPA) Testing**, the first step involves installing an **Integrated Development Environment (IDE)** such as **UiPath Studio**. Each RPA process should be opened individually within this IDE. Before executing the actual testing script, **ensure that both the frontend and backend of the application are up and running**. Also, make sure that there are  **no concurrently open browsers**.

Once you have **downloaded or cloned** the project, navigate to the RPA directory, where you'll discover five distinct folders. Each of these folders contains a specific **RPA process**, designed to execute different tests and actions. Open the folder corresponding to the specific RPA process you wish to activate.

Within the chosen folder, locate the **Main.xml file**.This file serves as the central orchestrator, guiding the sequence of automated actions for the selected process. To run the selected RPA process, simply trigger the Main.xml file.

Once you run the process, it's imperative to  **avoid any further interaction with the computer**. Closing browser pages or typing any additional inputs may compromise the program's logic, leading to an unexpected stop in execution. However, if the need arises to stop the process, go to the IDE where the process is active and click the  **"Stop" button**. 

