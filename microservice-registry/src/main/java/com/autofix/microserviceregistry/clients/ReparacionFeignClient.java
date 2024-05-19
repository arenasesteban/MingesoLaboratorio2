package com.autofix.microserviceregistry.clients;

import com.autofix.microserviceregistry.configurations.FeignClientConfig;
import com.autofix.microserviceregistry.dtos.CantidadMonto;
import com.autofix.microserviceregistry.dtos.ReparacionMeses;
import com.autofix.microserviceregistry.dtos.ReparacionTipoVehiculo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Month;
import java.util.List;

@FeignClient(value = "microservice-repair",
        url = "http://localhost:8083/reparacion",
        configuration = {FeignClientConfig.class})
public interface ReparacionFeignClient {
    @GetMapping("/cantidad-reparaciones")
    Integer obtenerCantidadReparaciones(@RequestParam List<Long> id_registros);

    @GetMapping("/patentes")
    List<String> obtenerPatentesPorTipoReparacion(@RequestParam String tipo_reparacion, @RequestParam Integer mes, @RequestParam Integer ano);

    @GetMapping("/monto-tipo-reparacion")
    Integer obtenerMontoPorPatenteYTipoReparacion(@RequestParam List<String> patentes, @RequestParam String tipo_reparacion, @RequestParam Integer mes, @RequestParam Integer ano);

    @GetMapping("/cantidad-monto")
    CantidadMonto calcularCantidadYMontoReparacionPorMes(@RequestParam String tipo_reparacion, @RequestParam Integer mes) ;
}