package com.autofix.microservicevehicle.controllers;

import com.autofix.microservicevehicle.entities.Vehicle;
import com.autofix.microservicevehicle.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
@CrossOrigin("*")
public class VehicleController {
    @Autowired
    VehicleService vehicleService;

    @PostMapping("/")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle vehicle1 = vehicleService.createVehicle(vehicle);
        return ResponseEntity.ok(vehicle1);
    }

    @GetMapping("/")
    public ResponseEntity<List<Vehicle>> getVehicles() {
        List<Vehicle> vehicles = vehicleService.getVehicles();
        return ResponseEntity.ok(vehicles);
    }
}