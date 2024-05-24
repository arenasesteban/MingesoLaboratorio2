package com.autofix.microservicerepair.controllers;

import com.autofix.microservicerepair.entities.Reparacion;
import com.autofix.microservicerepair.services.ReparacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reparacion")
public class ReparacionController {
    @Autowired
    ReparacionService reparacionService;

    @PostMapping("/")
    public ResponseEntity<List<Reparacion>> crearReparaciones(@RequestBody List<Reparacion> reparaciones) {
        List<Reparacion> reparaciones_1 = reparacionService.crearReparaciones(reparaciones);
        return ResponseEntity.ok(reparaciones_1);
    }

    @GetMapping("/")
    public ResponseEntity<List<Reparacion>> obtenerReparaciones() {
        List<Reparacion> reparaciones = reparacionService.obtenerReparaciones();
        return ResponseEntity.ok(reparaciones);
    }

    @GetMapping("/tipo-reparaciones")
    public ResponseEntity<List<String>> obtenerTipoReparaciones() {
        List<String> tipo_reparaciones = reparacionService.obtenerTipoReparaciones();
        return ResponseEntity.ok(tipo_reparaciones);
    }
}