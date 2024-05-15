package com.autofix.microservicereports.services;

import com.autofix.microservicereports.clients.RegistroFeignClient;
import com.autofix.microservicereports.dtos.ReparacionTipoVehiculo;
import com.autofix.microservicereports.dtos.ResumenReparacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReporteService {
    @Autowired
    RegistroFeignClient registroFeignClient;

    public List<ResumenReparacion> reporteResumenReparaciones(List<String> tipo_reparaciones) {
        List<ResumenReparacion> resumenReparaciones = new ArrayList<>();

        for(String tipo_reparacion : tipo_reparaciones) {
            ResumenReparacion resumenReparacion = new ResumenReparacion();
            resumenReparacion.setTipo_reparacion(tipo_reparacion);

            ReparacionTipoVehiculo reparacionTipoVehiculo = registroFeignClient.reporteReparacionTipoVehiculo(tipo_reparacion);

            resumenReparacion.setCantidad_sedan(reparacionTipoVehiculo.getCantidad_sedan());
            resumenReparacion.setMonto_sedan(reparacionTipoVehiculo.getMonto_sedan());

            resumenReparacion.setCantidad_hatchback(reparacionTipoVehiculo.getCantidad_hatchback());
            resumenReparacion.setMonto_sedan(reparacionTipoVehiculo.getMonto_sedan());

            resumenReparacion.setCantidad_suv(reparacionTipoVehiculo.getCantidad_suv());
            resumenReparacion.setMonto_sedan(reparacionTipoVehiculo.getMonto_sedan());

            resumenReparacion.setCantidad_pickup(reparacionTipoVehiculo.getCantidad_pickup());
            resumenReparacion.setMonto_sedan(reparacionTipoVehiculo.getMonto_sedan());

            resumenReparacion.setCantidad_furgoneta(reparacionTipoVehiculo.getCantidad_furgoneta());
            resumenReparacion.setMonto_sedan(reparacionTipoVehiculo.getMonto_sedan());

            resumenReparacion.setCantidad_total(reparacionTipoVehiculo.getCantidad_sedan() +
                    reparacionTipoVehiculo.getCantidad_hatchback() +
                    reparacionTipoVehiculo.getCantidad_suv() +
                    reparacionTipoVehiculo.getCantidad_pickup() +
                    reparacionTipoVehiculo.getCantidad_furgoneta());

            resumenReparacion.setMonto_total(reparacionTipoVehiculo.getMonto_sedan() +
                    reparacionTipoVehiculo.getMonto_hatchback() +
                    reparacionTipoVehiculo.getMonto_suv() +
                    reparacionTipoVehiculo.getMonto_pickup() +
                    reparacionTipoVehiculo.getMonto_furgoneta());

            resumenReparaciones.add(resumenReparacion);
        }

        return resumenReparaciones;
    }
}
