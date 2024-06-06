FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} microservice-vehicle.jar
ENTRYPOINT ["java","-jar","/microservice-vehicle.jar"]