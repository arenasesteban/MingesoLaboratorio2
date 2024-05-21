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

    public Integer obtenerCantidadVehiculosPorTipoVehiculo(List<String> patentes, String tipo_vehiculo) {
        return vehiculoRepository.contarPorPatenteYTipoVehiculo(patentes, tipo_vehiculo);
    }

    public List<String> obtenerPatentesPorTipoVehiculo(List<String> patentes, String tipo_vehiculo) {
        return vehiculoRepository.encontrarPatentesPorPatenteYTipoVehiculo(patentes, tipo_vehiculo);
    }

    public Vehiculo actualizarVehiculo(String patente, Integer kilometraje) {
        Vehiculo vehiculo_1 = vehiculoRepository.encontrarPorPatente(patente);
        vehiculo_1.setKilometraje(kilometraje);
        System.out.println("VEHICULO: " + vehiculo_1);
        return vehiculoRepository.save(vehiculo_1);
    }
}