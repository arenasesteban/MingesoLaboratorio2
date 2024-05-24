package com.autofix.microserviceregistry.controllers;

import com.autofix.microserviceregistry.dtos.ReparacionMeses;
import com.autofix.microserviceregistry.dtos.ReparacionTipoVehiculo;
import com.autofix.microserviceregistry.entities.Detalle;
import com.autofix.microserviceregistry.entities.Registro;
import com.autofix.microserviceregistry.services.RegistroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.List;

@RestController
@RequestMapping("/registro")
public class RegistroController {
    @Autowired
    RegistroService registroService;

    @PostMapping("/")
    public ResponseEntity<Registro> crearRegistro(@RequestBody Registro registro) {
        Registro registro_1 = registroService.crearRegistro(registro);
        return ResponseEntity.ok(registro_1);
    }

    @PostMapping("/detalle")
    public ResponseEntity<List<Detalle>> crearRegistro(@RequestBody List<Detalle> detalles) {
        List<Detalle> detalles_1 = registroService.crearDetalles(detalles);
        return ResponseEntity.ok(detalles_1);
    }

    @GetMapping("/")
    public ResponseEntity<List<Registro>> obtenerRegistros() {
        List<Registro> registros = registroService.obtenerRegistros();
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/{id_registro}")
    public ResponseEntity<Registro> obtenerRegistro(@PathVariable Long id_registro) {
        Registro registro = registroService.obtenerRegistro(id_registro);
        return ResponseEntity.ok(registro);
    }

    @PostMapping("/calcular-total")
    public ResponseEntity<Registro> calcularTotal(@RequestBody Registro registro, @RequestParam Integer descuento_bono) {
        Registro registro_1 = registroService.calcularTotal(registro, descuento_bono);
        return ResponseEntity.ok(registro_1);
    }

    @GetMapping("/reparacion-tipo-vehiculo")
    public ResponseEntity<List<ReparacionTipoVehiculo>> reporteReparacionTipoVehiculo(@RequestParam Integer mes, @RequestParam Integer ano) {
        List<ReparacionTipoVehiculo> reparacionesTipoVehiculo = registroService.reporteReparacionTipoVehiculo(mes, ano);
        return ResponseEntity.ok(reparacionesTipoVehiculo);
    }

    @GetMapping("/reparacion-meses")
    public ResponseEntity<List<ReparacionMeses>> reporteReparacionMeses(@RequestParam Integer mes) {
        List<ReparacionMeses> reparacionesMeses = registroService.reporteReparacionMeses(mes);
        return ResponseEntity.ok(reparacionesMeses);
    }

    @PutMapping("/")
    public ResponseEntity<Registro> actualizarRegistro(@RequestBody Registro registro) {
        Registro registro_1 = registroService.actualizarRegistro(registro);
        return ResponseEntity.ok(registro_1);
    }
}