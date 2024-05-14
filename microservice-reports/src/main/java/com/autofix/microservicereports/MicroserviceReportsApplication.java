package com.autofix.microservicereports;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MicroserviceReportsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceReportsApplication.class, args);
	}

}
