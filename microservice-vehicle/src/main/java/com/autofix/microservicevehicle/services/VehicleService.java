package com.autofix.microservicevehicle.services;

import com.autofix.microservicevehicle.entities.Vehicle;
import com.autofix.microservicevehicle.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    @Autowired
    VehicleRepository vehicleRepository;

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }
}
