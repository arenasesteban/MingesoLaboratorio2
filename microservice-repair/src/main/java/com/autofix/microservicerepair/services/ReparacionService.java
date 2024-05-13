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

    public Reparacion crearReparacion(Reparacion reparacion) {
        return reparacionRepository.save(reparacion);
    }

    public Integer obtenerCantidadReparaciones(List<Long> id_registros) {
        int cantidad_reparaciones = 0;

        for(Long id_registro : id_registros) {
            cantidad_reparaciones += reparacionRepository.contarReparacionPorId_registro(id_registro);
        }

        return cantidad_reparaciones;
    }
}
