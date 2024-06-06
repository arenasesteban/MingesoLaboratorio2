FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-reports.jar
ENTRYPOINT ["java","-jar","/microservice-reports.jar"]