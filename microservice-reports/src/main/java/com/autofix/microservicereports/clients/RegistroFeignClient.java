package com.autofix.microservicereports.clients;

import com.autofix.microservicereports.configurations.FeignClientConfig;
import com.autofix.microservicereports.dtos.ComparativoReparacion;
import com.autofix.microservicereports.dtos.ReparacionTipoVehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Month;

@FeignClient(value = "microservice-registry",
        url = "http://localhost:8082/registro",
        configuration = {FeignClientConfig.class})
public interface RegistroFeignClient {
    @GetMapping("/reparacion-tipo-vehiculo")
    ReparacionTipoVehiculo reporteReparacionTipoVehiculo(@RequestParam String tipo_reparacion);

    @GetMapping("/reparacion-meses")
    ComparativoReparacion reporteReparacionMeses(@RequestParam String tipo_reparacion, @RequestParam Integer mes);
}