package com.autofix.microservicerepair.services;

import com.autofix.microservicerepair.dtos.CantidadMontoInterfaz;
import com.autofix.microservicerepair.entities.Reparacion;
import com.autofix.microservicerepair.repositories.ReparacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.List;

@Service
public class ReparacionService {
    @Autowired
    ReparacionRepository reparacionRepository;

    public List<Reparacion> crearReparacion(List<Reparacion> reparaciones) {
        return reparacionRepository.saveAll(reparaciones);
    }

    public Integer obtenerCantidadReparaciones(List<Long> id_registros) {
        int cantidad_reparaciones = 0;

        for(Long id_registro : id_registros) {
            cantidad_reparaciones += reparacionRepository.contarReparacionPorId_registro(id_registro);
        }

        return cantidad_reparaciones;
    }

    public List<String> obtenerIdRegistroPorTipoReparacion(String tipo_reparacion) {
        return reparacionRepository.encontrarPatentesByTipoReparacion(tipo_reparacion);
    }

    public Integer obtenerMontoPorPatenteYTipoReparacion(List<String> patentes, String tipo_reparacion) {
        return reparacionRepository.contarPorPatenteYTipoReparacion(patentes, tipo_reparacion);
    }

    public CantidadMontoInterfaz calcularCantidadYMontoReparacionPorMes(String tipo_reparacion, Integer mes) {
        CantidadMontoInterfaz cantidad_monto = reparacionRepository.contarPorTipoReparacionYMes(tipo_reparacion, mes);

        if (cantidad_monto.getCantidad() == 0) {
            return new CantidadMontoInterfaz() {
                @Override
                public Integer getCantidad() {
                    return 0;
                }

                @Override
                public Integer getMonto() {
                    return 0;
                }
            };
        }

        return cantidad_monto;
    }
}
