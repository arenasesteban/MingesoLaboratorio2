package com.autofix.microservicereports.clients;

import com.autofix.microservicereports.configurations.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(value = "microservice-registry",
        url = "http://localhost:8082/reparacion",
        configuration = {FeignClientConfig.class})
public interface RegistroFeignClient {

}