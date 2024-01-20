# QA Testing

## Testing the backend

Inside pom.xml we have configured two profiles, **dev and prod**. Dev is used for testing purposes while prod is the deployment configuration. Besides the application.properties which is common to both, we have two separate files for each. The main thing that differs for each is the database. For dev/testing we are using a H2 database and for production we are using a PostgreSQL database. Spring Boot allows us to configure the database connection and driver to be used by Hibernate.

To help us test the application, we are using seeders to create users, jobs, interviews and relationships between them.

We also have a custom config setting `app.data.seeding.enabled` which is set to true in dev only, so we don't seed data in production.

### Automatic Testing

We also wanted to experiment a bit with automatic testing, even though we have not created automated tests for all the business logic inside the application, we created tests for two services (jobs and interview conference rooms related).

For automatic testing we used **JUnit**, a popular testing framework for Java and **Mockito**, a framework which allows us to mock dependencies so we can better test only the logic we are interested in. In our case, the repositories are mocked, so we are not dependent of their implementation, when testing the business logic.

## Testing frontend + backend

... insert rpa description here...