package com.autofix.microservicerepair.repositories;

import com.autofix.microservicerepair.entities.Reparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Controller;

import java.util.List;


@Controller
public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {
    @Query("SELECT r.tipo_reparacion FROM Reparacion r")
    List<String> obtenerTipoReparaciones();
}