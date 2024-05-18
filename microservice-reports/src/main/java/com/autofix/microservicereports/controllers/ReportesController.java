package com.autofix.microservicereports.controllers;

import com.autofix.microservicereports.dtos.ComparativoReparacion;
import com.autofix.microservicereports.dtos.ResumenReparacion;
import com.autofix.microservicereports.services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/reporte")
@CrossOrigin("*")
public class ReportesController {
    @Autowired
    ReporteService reporteService;

    @GetMapping("/resumen-reparaciones")
    public ResponseEntity<List<ResumenReparacion>> reporteResumenReparaciones(@RequestParam List<String> tipo_reparaciones) {
        List<ResumenReparacion> reporte = reporteService.reporteResumenReparaciones(tipo_reparaciones);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/comparativo-reparaciones")
    public ResponseEntity<List<ComparativoReparacion>> reporteComparativoReparaciones(@RequestParam List<String> tipo_reparaciones, @RequestParam Integer mes) {
        List<ComparativoReparacion> reporte = reporteService.reporteComparativoReparaciones(tipo_reparaciones, mes);
        return ResponseEntity.ok(reporte);
    }
}