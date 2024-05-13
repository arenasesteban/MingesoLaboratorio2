package com.autofix.microservicerepair.repositories;

import com.autofix.microservicerepair.entities.Reparacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;

@Controller
public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {

}