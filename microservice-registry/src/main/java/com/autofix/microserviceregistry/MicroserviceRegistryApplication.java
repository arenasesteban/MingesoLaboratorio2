package com.autofix.microserviceregistry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MicroserviceRegistryApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceRegistryApplication.class, args);
	}

}
