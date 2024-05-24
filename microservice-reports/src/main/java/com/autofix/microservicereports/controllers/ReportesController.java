package com.autofix.microservicereports.controllers;

import com.autofix.microservicereports.dtos.ComparativoReparacion;
import com.autofix.microservicereports.dtos.ResumenReparacion;
import com.autofix.microservicereports.services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reporte")
public class ReportesController {
    @Autowired
    ReporteService reporteService;

    @GetMapping("/resumen-reparaciones")
    public ResponseEntity<List<ResumenReparacion>> reporteResumenReparaciones(@RequestParam Integer mes, @RequestParam Integer ano) {
        List<ResumenReparacion> reporte = reporteService.reporteResumenReparaciones(mes, ano);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/comparativo-reparaciones")
    public ResponseEntity<List<ComparativoReparacion>> reporteComparativoReparaciones(@RequestParam Integer mes) {
        List<ComparativoReparacion> reporte = reporteService.reporteComparativoReparaciones(mes);
        return ResponseEntity.ok(reporte);
    }
}