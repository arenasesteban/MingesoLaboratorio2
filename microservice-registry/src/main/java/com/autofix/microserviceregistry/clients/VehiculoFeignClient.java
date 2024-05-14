package com.autofix.microserviceregistry.clients;

import com.autofix.microserviceregistry.configurations.FeignClientConfig;
import com.autofix.microserviceregistry.dtos.Vehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(value = "microservice-vehicle",
        url = "http://localhost:8081/vehiculo",
        configuration = {FeignClientConfig.class})
public interface VehiculoFeignClient {
    @GetMapping("/patente")
    Vehiculo obtenerVehiculoPorPatente(@RequestParam String patente);

    @GetMapping("/patentes")
    List<String> obtenerPatentes();
}