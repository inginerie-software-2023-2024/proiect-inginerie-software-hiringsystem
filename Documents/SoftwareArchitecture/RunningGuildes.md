# Running Guides
How to run/build/deploy the application.
Will separate the running of the application in two sections:
  - The Spring Boot backend
  - The NextJS frontend
  - Docker-Compose (Spring Boot + NextJS + Postgres)

# Backend (Spring Boot)
All the dependencies are included inside the maven pom.xml

### Dev Mode

You can run the Spring Boot application directly via `mvn spring-boot:run -Pdev` which will start the backend in development mode (meaning it will use H2 database) and other debug settings.

(!)
 ATTENTION: Make sure you have the following environment variables set, otherwise it will throw an error:

 ```
EMAIL=Your email
EMAIL_PASSWORD=password
 ```
 ^ These should be obtained from a SMTP provider. In case you want to remove this functonality, you can find it used at `ro.hiringsystem.service.impl.EmailSenderServiceImpl`.

 We recommend running it from an IDE though, such as IntelliJ.


### Prod Mode (No Docker)

Firstly you'll need to compile the backend into a jar, you do that by running `mvn package -Pprod`. The **HiringSystem.jar** will be generated inside the target folder, which you can run using `java -jar HiringSystem.jar`.

(i) ATTENTION: By default, the production is designed to connect to a database that is in the same network as the backend, connected through a custom hostname 'postgres'. Inside the **application-prod.yml** file, you will need to change the `spring.datasource.url` setting.

The queries of the database are written using Hibernate (HQL) with no native queries to a specific format, if you want to use a different database type you'll have to either make sure it is compatible with HQL or rewrite the queries in your native language.

As mentioned in the DEV mode, please make sure you have the environment variables set.

 ```
EMAIL=Your email
EMAIL_PASSWORD=password
 ```

For Docker usage there is a **Dockerfile** defined, but more on that in the Docker-Compose section.

# Frontend (NextJS)

### Dev Mode

Located in the **frontend** folder right from the root of the project, besides the src folder of the backend.

1. run `npm install` to download all the dependencies

2. run `npm run dev` to start NextJS

The frontend also requires two environmental variables:

```
BACKEND_URL=http://localhost:8081
NEXT_PUBLIC_BACKEND_URL_FOR_BROWSER=http://localhost:8081
```

The difference between them is once again, the consideration of running it in a private network, where the backend url would not be exposed to the browser. the BACKEND_URL variable is used for middleware requests to the backend, which can't be seen directly by the browser, and the other one does the requests directly from the browser of the user.

By NextJS convention the `.env.development` file will be used only in dev mode, and is overwritten by values inside `.env` file.

### Prod Mode

1. Compile the frontend via `npm run build`. Attention, the environment variables prefixed with **NEXT_PUBLIC** are statically injected at built, meaning that you won't be able to modify them unless you rebuild the frontend.

2. Run the frontend using `npm run start`.

Same environment variables are required:

```
BACKEND_URL=http://backend:8081
NEXT_PUBLIC_BACKEND_URL_FOR_BROWSER=http://localhost:8081
```


By NextJS convention the `.env.production` file will be used only in prod mode, and is overwritten by values inside `.env` file.

# Docker-Compose

There are two dockerfiles in this project. One right at the root for building the backend image, and one in the **frontend** folder, for building the NextJS docker image.

We have defined a docker-compose.yml file for building a production environment that contains three docker containers:
  - postgres
  - our backend
  - our frontend

```
version: '3'

services:
  postgres:
    image: postgres
    environment:
      POSTGRES_USER: prodUser
      POSTGRES_PASSWORD: prodPassword
      POSTGRES_DB: HiringSystemProductionDB
    expose:
      - "5432"
    ports:
      - "5432:5432"

  backend: #spring-boot
    image: hiringsystem-backend
    depends_on:
      - postgres
    build:
      context: .
    ports:
      - "8081:8081"
    env_file:
      - .env.email

  frontend: #nextjs
    build:
      context: ./frontend
    env_file:
      - ./frontend/.env.production
    image: hiringsystem-frontend
    depends_on:
      - backend
    ports:
      - "3000:3000"
```

First, you will need to build the images and then run the compose file.

1. At the root of the project run `docker-compose build`

2. After the images have been built, run `docker-compose up`