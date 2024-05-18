package com.autofix.microservicevehicle.controllers;

import com.autofix.microservicevehicle.entities.Vehiculo;
import com.autofix.microservicevehicle.services.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehiculo")
@CrossOrigin("*")
public class VehiculoController {
    @Autowired
    VehiculoService vehiculoService;

    @PostMapping("/")
    public ResponseEntity<Vehiculo> crearVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo vehiculo1 = vehiculoService.crearVehiculo(vehiculo);
        return ResponseEntity.ok(vehiculo1);
    }

    @GetMapping("/")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculos();
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/patente")
    public ResponseEntity<Vehiculo> obtenerVehiculoPorPatente(@RequestParam String patente) {
        Vehiculo vehiculo = vehiculoService.obtenerVehiculoPorPatente(patente);
        return ResponseEntity.ok(vehiculo);
    }

    @GetMapping("/cantidad-vehiculos")
    public ResponseEntity<Integer> obtenerCantidadVehiculosPorTipoVehiculo(@RequestBody List<String> patentes, @RequestParam String tipo_vehiculo) {
        Integer cantidad_vehiculos = vehiculoService.obtenerCantidadVehiculosPorTipoVehiculo(patentes, tipo_vehiculo);
        return ResponseEntity.ok(cantidad_vehiculos);
    }

    @GetMapping("/patentes-tipo-vehiculo")
    public ResponseEntity<List<String>> obtenerPatentesPorTipoVehiculo(@RequestBody List<String> patentes, @RequestParam String tipo_vehiculo) {
        List<String> patentes_tipo_vehiculo = vehiculoService.obtenerPatentesPorTipoVehiculo(patentes, tipo_vehiculo);
        return ResponseEntity.ok(patentes_tipo_vehiculo);
    }
}