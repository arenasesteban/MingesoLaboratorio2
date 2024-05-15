package com.autofix.microservicereports.clients;

import com.autofix.microservicereports.configurations.FeignClientConfig;
import com.autofix.microservicereports.dtos.ReparacionTipoVehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "microservice-registry",
        url = "http://localhost:8082/reparacion",
        configuration = {FeignClientConfig.class})
public interface RegistroFeignClient {
    @GetMapping("/reparacion-tipo-vehiculo")
    ReparacionTipoVehiculo reporteReparacionTipoVehiculo(@RequestParam String tipo_reparacion);
}