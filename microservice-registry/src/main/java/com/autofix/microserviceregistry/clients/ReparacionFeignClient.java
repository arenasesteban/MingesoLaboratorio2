package com.autofix.microserviceregistry.clients;

import com.autofix.microserviceregistry.configurations.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(value = "microservice-repair",
        url = "http://localhost:8083/reparacion",
        configuration = {FeignClientConfig.class})
public interface ReparacionFeignClient {
    @GetMapping("/cantidad-reparaciones")
    Integer obtenerCantidadReparaciones(@RequestParam List<Long> id_registros);
}
