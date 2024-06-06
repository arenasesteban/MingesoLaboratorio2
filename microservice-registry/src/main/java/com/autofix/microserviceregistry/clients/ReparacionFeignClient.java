package com.autofix.microserviceregistry.clients;

import com.autofix.microserviceregistry.configurations.FeignClientConfig;
import com.autofix.microserviceregistry.dtos.CantidadMontoInterfaz;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Month;
import java.util.List;

@FeignClient(value = "microservice-repair",
        path = "/reparacion",
        configuration = {FeignClientConfig.class})
public interface ReparacionFeignClient {
    @GetMapping("/tipo-reparaciones")
    List<String> obtenerTipoReparaciones();
}