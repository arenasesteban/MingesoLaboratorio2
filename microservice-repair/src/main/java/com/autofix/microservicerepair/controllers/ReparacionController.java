package com.autofix.microservicerepair.controllers;

import com.autofix.microservicerepair.entities.Reparacion;
import com.autofix.microservicerepair.services.ReparacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reparacion")
@CrossOrigin("*")
public class ReparacionController {
    @Autowired
    ReparacionService reparacionService;

    @PostMapping("/")
    public ResponseEntity<Reparacion> crearReparacion(@RequestBody Reparacion reparacion) {
        Reparacion reparacion1 = reparacionService.crearReparacion(reparacion);
        return ResponseEntity.ok(reparacion1);
    }

    @GetMapping("/cantidad-reparaciones")
    public ResponseEntity<Integer> obtenerCantidadReparaciones(@RequestBody List<Long> id_registros) {
        Integer cantidad_reparaciones = reparacionService.obtenerCantidadReparaciones(id_registros);
        return ResponseEntity.ok(cantidad_reparaciones);
    }

    @GetMapping("/patentes")
    public ResponseEntity<List<String>> obtenerPatentesPorTipoReparacion(@RequestParam String tipo_reparacion) {
        List<String> patentes = reparacionService.obtenerIdRegistroPorTipoReparacion(tipo_reparacion);
        return ResponseEntity.ok(patentes);
    }

    @GetMapping("/monto-tipo-reparacion")
    public ResponseEntity<Integer> obtenerMontoPorPatenteYTipoReparacion(@RequestBody List<String> patentes, @RequestParam String tipo_reparacion) {
        Integer monto_tipo_reparacion = reparacionService.obtenerMontoPorPatenteYTipoReparacion(patentes, tipo_reparacion);
        return ResponseEntity.ok(monto_tipo_reparacion);
    }
}