package com.autofix.microservicerepair.repositories;

import com.autofix.microservicerepair.entities.Reparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Controller;

@Controller
public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {
    @Query("SELECT COUNT(*) FROM Reparacion r WHERE r.id_registro = :id_registro")
    Integer contarReparacionPorId_registro(Long id_registro);
}