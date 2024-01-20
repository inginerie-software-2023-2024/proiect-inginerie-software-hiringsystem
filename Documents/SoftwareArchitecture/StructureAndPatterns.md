# Structure and Patterns

# Project Code Layout

We have tried to respect the SOLID principles as much as possible (more in the backend than the frontend). To help us in this regard, we chose to use a **repository-service-controller-model layout** to properly separate and manage the responsability of specific regions of code and ensure a somehow natural flow between the layers.

```
<<Backend structure>>

+ main
|--- .java
|    |--- .ro.hiringsystem
|         |--- config
|         |--- controller
|         |--- exceptions
|         |--- mapper
|         |--- model
|         |--- repository
|         |--- security
|         |--- seeders
|         |--- service
|--- HiringSystemApplication.java
|--- .resources
     |--- email_templates
     |--- application.properties
     |--- application-dev.properties
     |--- application-prod.properties
+ test
|--- .java
|    |--- .ro.hiringsystem
|         |--- service
|              |--- InterviewConferenceRoomServiceImplTest.java
|              |--- JobServiceImplTest.java

```

## A bit of explaining

Although we have defined packages for specific class roles, we sometimes mix them for the sake of convenience (having them grouped based on a bigger picture). For example the security package contains a JwtService and a SecurityConfig, which should normally be placed in the according packages (service & config).

The role of each package (in short):
- **config** - contains classes used in configuring specific aspects of the backend, mostly related to Spring Boot. Usually marked classes via the @Configuration annotation.
- **controller** - contains classes responsible for handling incoming HTTP requests and generating appropriate responses.
- **exceptions** - contains classes defining custom exceptions and error handling logic.
- **mapper** - contains classes responsible for mapping entities or DTOs (Data Transfer Objects) to each other.
- **model** - contains classes representing the entities and DTOs of the application.
- **repository** - contains classes responsible for interacting with the database or data storage.
- **security** - contains classes related to authentication, authorization, and security configurations.
- **seeders** - contains classes or scripts used for seeding/populating initial data into the database.
- **service** - contains classes that implement the business logic of the application.

### Frontend structure

The frontend uses the NextJS conventions for declaring routes inside the **App Router Folder** to which we add some extra folders with specific functions.

```
<<Frontend structure>>

+ app
|    |--- ...
+ components
|    |--- ...
+ constants
|    |--- ...
+ context
|    |--- ...
+ hooks
|    |--- ...
+ lib
|    |--- ...
+ middlewares
|    |--- ...
+ types
|    |--- ...
+ public
|    |--- ...
```

### A bit of explaining

Will explain a bit what the folders above are used for:

- **`app`**
  
  The `app` folder houses the primary pages of the application. Each TypeScript file within this directory corresponds to a distinct page or route in the application, contributing to the overall structure and navigation flow.

- **`components`**
  
  The `components` directory is designated for storing reusable React components. These components serve as modular building blocks, fostering code reusability and maintainability across different sections of the application.

- **`constants`**
  
  The `constants` folder is dedicated to housing immutable values and configurations essential to the application. This includes constants such as API endpoints, configuration settings, or any other unchanging values utilized throughout the codebase.

- **`context`**
  
  Within the `context` directory, you'll find files responsible for managing global state using React Context. These files define various contexts utilized by components to access and interact with shared state information.

- **`hooks`**
  
  The `hooks` folder is intended for storing custom React hooks. These hooks encapsulate reusable logic, promoting a modular and organized approach to handling functionality shared among different components.

- **`lib`**
  
  The `lib` folder serves as a repository for utility functions, helper classes, or any other modules providing essential functionality to the application. It encapsulates code snippets that don't neatly fit into the component or context structure.

- **`middlewares`**
  
  The `middlewares` directory contains functions that act as middleware in the Next.js application. These middleware functions execute specific operations before handling incoming requests, offering a way to customize and enhance request handling.

- **`types`**
  
  The `types` folder is used for defining TypeScript types. It ensures a clear and consistent structure for data within the application, enhancing code readability and reducing the likelihood of type-related errors.

- **`public`**
  
  The `public` folder serves as a repository for static assets intended to be publicly accessible. This includes images, fonts, or any other files that should be served as-is by the web server, contributing to the application's visual and interactive elements.


# Design Patterns

Some examples of design patterns that emerge in the application:

- **Chain of Responsibility:** Spring Security manages HttpRequests through this pattern, injecting authentication and filtering users throughout the chain. We also use this one for the **midldleware** implementation.

- **Object Pool:** HikariCP utilizes this design to create a Database Connections Pool, optimizing the management of database connections.

- **Singleton:** Spring Boot ensures, through Dependency Injection and Spring Beans, that a single instance of a component is created and used within its scope.

- **Observer:** Interview Conference Room employs a peer-to-peer connection, with the server acting as a mediator. Through sockets and backend points, each client serves as an observer to the server for updates, and reciprocally, the server observes each client.

- **Bridge Pattern:** Hibernate generalizes queries to the database, allowing compatibility with the same code across different types of databases. This facilitates seamless integration with various database types.

- **Factory Method**: For the login/logout/getUser functions we generate fetchers via a factory method that shares the api cache but changes the parameters of that route.



