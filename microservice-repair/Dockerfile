FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-repair.jar
ENTRYPOINT ["java","-jar","/microservice-repair.jar"]