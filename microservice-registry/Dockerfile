FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-registry.jar
ENTRYPOINT ["java","-jar","/microservice-registry.jar"]