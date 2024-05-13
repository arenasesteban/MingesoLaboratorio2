package com.autofix.microservicerepair.controllers;

import com.autofix.microservicerepair.entities.Reparacion;
import com.autofix.microservicerepair.services.ReparacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
