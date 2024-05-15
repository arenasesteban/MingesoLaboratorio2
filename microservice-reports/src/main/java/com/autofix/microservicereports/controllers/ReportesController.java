package com.autofix.microservicereports.controllers;

import com.autofix.microservicereports.dtos.ResumenReparacion;
import com.autofix.microservicereports.services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reporte")
@CrossOrigin("*")
public class ReportesController {
    @Autowired
    ReporteService reporteService;

    @GetMapping("/resumen-reparaciones")
    public ResponseEntity<List<ResumenReparacion>> reporteResumenReparaciones(@RequestBody List<String> tipo_reparaciones) {
        List<ResumenReparacion> reporte = reporteService.reporteResumenReparaciones(tipo_reparaciones);
        return ResponseEntity.ok(reporte);
    }
}