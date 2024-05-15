package com.autofix.microservicerepair.repositories;

import com.autofix.microservicerepair.entities.Reparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {
    @Query("SELECT COUNT(*) FROM Reparacion r WHERE r.id_registro = :id_registro")
    Integer contarReparacionPorId_registro(Long id_registro);

    @Query("SELECT DISTINCT r.patente FROM Reparacion r WHERE r.tipo_reparacion = :tipo_reparacion")
    List<String> encontrarPatentesByTipoReparacion(String tipo_reparacion);

    @Query("SELECT COUNT(r) FROM Reparacion r WHERE r.patente IN :patentes AND r.tipo_reparacion = :tipo_reparacion")
    Integer contarPorPatenteYTipoReparacion(List<String> patentes, String tipo_reparacion);
}