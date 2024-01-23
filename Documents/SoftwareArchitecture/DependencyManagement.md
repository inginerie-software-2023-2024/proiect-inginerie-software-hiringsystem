# Dependency Management

The project uses maven on the backend side to manage its dependencies. Everything you need for backend is inside the pom.xml.

The frontend uses npm libraries, with no vulnerabilities declared, and is also less prone to dependency confusion as it doesn't have any private dependencies that might be hijacked.

### Backend Dependencies Usage:

- **Hibernate & HikariCP** - Hibernate is an object-relational mapping (ORM) framework that provides a convenient way to map Java objects to database tables. HikariCP is a high-performance connection pool for managing database connections efficiently.
- **MapStruct** - MapStruct is a code generation library that simplifies the mapping between different Java bean types. It generates mapping code based on defined mappings, reducing the boilerplate code needed for mapping.
- **Spring Mails** -  Spring Mail provides integration with JavaMail for sending and receiving emails. It offers a high-level abstraction and simplifies email-related tasks in Spring applications.
- **Spring Security** - Spring Security is a powerful framework for implementing authentication and authorization in Java applications. It provides a wide range of features and tools for securing web applications and APIs.
- **Spring Web** - Spring Web is a module in the Spring framework that provides support for building web applications. It includes features like request handling, routing, and handling HTTP requests and responses.
- **Spring WebSockets** -  Spring WebSockets enables real-time, bidirectional communication between a client and server over a single, long-lived connection. It is commonly used for applications that require real-time updates and event-driven communication. We use them for the interview room peer to peer connection and message handling.
- **Spring JDBC + JPA** - Spring JDBC is a module that simplifies database access using the JDBC API. It provides convenient utilities and templates for executing SQL queries and handling database operations. Spring JPA is a module that provides an abstraction layer over JPA (Java Persistence API) for simplified database access and object-relational mapping.
- **Json WebTokens** - JWT is a compact and self-contained mechanism for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization in web applications, providing a stateless and portable token-based approach.
- **JUnit + Mockito** - Dependencies used for testing the backend.

### Spring Security + JWT

We use Spring Security to secure the requests to the backend and personalize its config inside, mainly configuring the routes and the permission required to access them. In our case, also allowing CORS operations by altering the CORS filter.

Since we use **Json Web Tokens** for authentication, we don't need sessions. Therefore, in Spring Security's configuration we set the session creation policy to STATELESS. Inside the application.properties file we set configuration options for how much a token takes to expire. In our case we use two type of tokens, **access_token & refresh_token**. The access_token is used for the actual authorization while the refresh_token is used to obtain a new access_token when one expires.

For the utilization of the tokens mentioned above, we take advantage of the already preimplemented chain of responsability of Spring Security, and we insert our own filter, `JwtAuthFilter` to handle requests. This filter will validate the user and will also obtain an **Authentication** for them, which we can access later in the chain of responsability via Spring Boot's dependency injection, giving an **Authentication** parameter, wherever we need it.

### Some of the dependencies used in Frontend:

- **Tailwind** - Manages the css bundle, allows us to give up on using separate files for css that add unnecessary overhead.
- **Typescript** - Used to prevent runtime type bugs caused by using plain javascript.
- **RadixUI** - An open source component library optimized for fast development, easy maintenance, and accessibility.
- **Shadcn/UI** - A component library that offers stylization using radix and tailwind.
- **iron-session** - Used for encrypting browser cookies and managing user sessions between browser and middleware.
- **react-hook-form** - Form managing
- **valibot + zod** - Form validators
- **simple-peer/peerjs** - Used for peer to peer communication in the interview rooms
- **SWR** - Separate hook specialized for data fetching
- **lucide-react** - Used for icons
- **react-day-picker** - Used for slot scheduling


## RPA

For full application testing we also use robotic process automation. More details on that in the QA section.