package com.autofix.microservicerepair.services;

import com.autofix.microservicerepair.entities.Reparacion;
import com.autofix.microservicerepair.repositories.ReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReparacionService {
    @Autowired
    ReparacionRepository reparacionRepository;

    public List<Reparacion> crearReparaciones(List<Reparacion> reparaciones) {
        return reparacionRepository.saveAll(reparaciones);
    }

    public List<Reparacion> obtenerReparaciones() {
        return reparacionRepository.findAll();
    }

    public List<String> obtenerTipoReparaciones() {
        return reparacionRepository.obtenerTipoReparaciones();
    }
}