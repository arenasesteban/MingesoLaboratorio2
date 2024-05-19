package com.autofix.microservicerepair.repositories;

import com.autofix.microservicerepair.dtos.CantidadMontoInterfaz;
import com.autofix.microservicerepair.entities.Reparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {
    @Query("SELECT COUNT(*) FROM Reparacion r WHERE r.id_registro = :id_registro")
    Integer contarReparacionPorId_registro(Long id_registro);

    @Query("SELECT DISTINCT r.patente FROM Reparacion r WHERE r.tipo_reparacion = :tipo_reparacion AND MONTH(r.fecha_reparacion) = :mes AND YEAR(r.fecha_reparacion) = :ano")
    List<String> encontrarPatentesByTipoReparacion(String tipo_reparacion, Integer mes, Integer ano);

    @Query("SELECT SUM(r.monto_reparacion) FROM Reparacion r WHERE r.patente IN :patentes AND r.tipo_reparacion = :tipo_reparacion AND MONTH(r.fecha_reparacion) = :mes AND YEAR(r.fecha_reparacion) = :ano")
    Integer sumarPorPatenteYTipoReparacion(List<String> patentes, String tipo_reparacion, Integer mes, Integer ano);

    @Query("SELECT COUNT(r) AS cantidad, SUM(r.monto_reparacion) AS monto FROM Reparacion r WHERE r.tipo_reparacion = :tipo_reparacion AND MONTH(r.fecha_reparacion) = :mes")
    CantidadMontoInterfaz contarPorTipoReparacionYMes(String tipo_reparacion, Integer mes);
}