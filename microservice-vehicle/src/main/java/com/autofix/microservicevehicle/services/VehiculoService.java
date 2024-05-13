package com.autofix.microservicevehicle.services;

import com.autofix.microservicevehicle.entities.Vehiculo;
import com.autofix.microservicevehicle.repositories.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehiculoService {
    @Autowired
    VehiculoRepository vehiculoRepository;

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public List<Vehiculo> obtenerVehiculos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo obtenerVehiculoPorPatente(String patente) {
        return vehiculoRepository.encontrarPorPatente(patente);
    }
}
