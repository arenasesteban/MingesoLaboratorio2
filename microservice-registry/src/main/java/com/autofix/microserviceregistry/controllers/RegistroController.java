package com.autofix.microserviceregistry.controllers;

import com.autofix.microserviceregistry.entities.Registro;
import com.autofix.microserviceregistry.services.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registro")
@CrossOrigin("*")
public class RegistroController {
    @Autowired
    RegistroService registroService;

    @PostMapping("/")
    public ResponseEntity<Registro> crearRegistro(@RequestBody Registro registro) {
        Registro registro_1 = registroService.crearRegistro(registro);
        return ResponseEntity.ok(registro_1);
    }

    @GetMapping("/")
    public ResponseEntity<List<Registro>> obtenerRegistros() {
        List<Registro> registros = registroService.obtenerRegistros();
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/calcular-total")
    public ResponseEntity<Registro> calcularTotal(@RequestBody Registro registro, @RequestParam int descuento_bono) {
        Registro registro_1 = registroService.calcularTotal(registro, descuento_bono);
        return ResponseEntity.ok(registro_1);
    }
}