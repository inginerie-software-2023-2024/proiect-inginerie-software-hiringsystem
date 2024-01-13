# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file into the container and rename it
COPY target/HiringSystem.jar ./app.jar

# Specify the command to run on container start
CMD ["java", "-jar", "./app.jar"]
