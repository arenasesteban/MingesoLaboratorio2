package com.autofix.microservicereports.clients;

import com.autofix.microservicereports.configurations.FeignClientConfig;
import com.autofix.microservicereports.dtos.ComparativoReparacion;
import com.autofix.microservicereports.dtos.ResumenReparacion;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Month;
import java.util.List;

@FeignClient(value = "microservice-registry",
        url = "http://localhost:8082/registro",
        configuration = {FeignClientConfig.class})
public interface RegistroFeignClient {
    @GetMapping("/reparacion-tipo-vehiculo")
    List<ResumenReparacion> reporteReparacionTipoVehiculo(@RequestParam Integer mes, @RequestParam Integer ano);

    @GetMapping("/reparacion-meses")
    List<ComparativoReparacion> reporteReparacionMeses(@RequestParam Integer mes);
}