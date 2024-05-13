package com.autofix.microservicerepair.services;

import com.autofix.microservicerepair.entities.Reparacion;
import com.autofix.microservicerepair.repositories.ReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReparacionService {
    @Autowired
    ReparacionRepository reparacionRepository;

    public Reparacion crearReparacion(Reparacion reparacion) {
        return reparacionRepository.save(reparacion);
    }
}
