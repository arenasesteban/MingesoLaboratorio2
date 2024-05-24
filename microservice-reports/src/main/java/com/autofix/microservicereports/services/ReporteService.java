package com.autofix.microservicereports.services;

import com.autofix.microservicereports.clients.RegistroFeignClient;
import com.autofix.microservicereports.dtos.ComparativoReparacion;
import com.autofix.microservicereports.dtos.ResumenReparacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReporteService {
    @Autowired
    RegistroFeignClient registroFeignClient;

    public List<ResumenReparacion> reporteResumenReparaciones(Integer mes, Integer ano) {
        List<ResumenReparacion> resumenReparaciones = registroFeignClient.reporteReparacionTipoVehiculo(mes , ano);

        for(ResumenReparacion resumenReparacion : resumenReparaciones) {
            resumenReparacion.setCantidad_total(resumenReparacion.getCantidad_sedan() +
                    resumenReparacion.getCantidad_hatchback() +
                    resumenReparacion.getCantidad_suv() +
                    resumenReparacion.getCantidad_pickup() +
                    resumenReparacion.getCantidad_furgoneta());

            resumenReparacion.setMonto_total(resumenReparacion.getMonto_sedan() +
                    resumenReparacion.getMonto_hatchback() +
                    resumenReparacion.getMonto_suv() +
                    resumenReparacion.getMonto_pickup() +
                    resumenReparacion.getMonto_furgoneta());
        }

        return resumenReparaciones;
    }

    public List<ComparativoReparacion> reporteComparativoReparaciones(Integer mes) {
        List<ComparativoReparacion> comparativoReparaciones = registroFeignClient.reporteReparacionMeses(mes);

        for(ComparativoReparacion comparativoReparacion : comparativoReparaciones) {
            if(comparativoReparacion.getCantidad_segundo_mes() != 0) {
                comparativoReparacion.setPrimera_variacion_cantidad((double) (((comparativoReparacion.getCantidad_primer_mes()
                                        - comparativoReparacion.getCantidad_segundo_mes())
                                        / comparativoReparacion.getCantidad_segundo_mes()) * 100));
            }

            if(comparativoReparacion.getMonto_segundo_mes() != 0) {
                comparativoReparacion.setPrimera_variacion_monto((double) (((comparativoReparacion.getMonto_primer_mes()
                                        - comparativoReparacion.getMonto_segundo_mes())
                                        / comparativoReparacion.getMonto_segundo_mes()) * 100));
            }

            if(comparativoReparacion.getCantidad_tercer_mes() != 0) {
                comparativoReparacion.setSegunda_variacion_cantidad((double) (((comparativoReparacion.getCantidad_segundo_mes()
                                        - comparativoReparacion.getCantidad_tercer_mes())
                                        / comparativoReparacion.getCantidad_tercer_mes()) * 100));
            }

            if(comparativoReparacion.getMonto_tercer_mes() != 0) {
                comparativoReparacion.setSegunda_variacion_monto((double) (((comparativoReparacion.getMonto_segundo_mes()
                                        - comparativoReparacion.getMonto_tercer_mes())
                                        / comparativoReparacion.getMonto_tercer_mes()) * 100));
            }
        }

        return comparativoReparaciones;
    }
}