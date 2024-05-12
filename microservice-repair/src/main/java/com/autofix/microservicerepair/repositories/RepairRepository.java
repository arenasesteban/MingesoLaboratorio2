package com.autofix.microservicerepair.repositories;

import com.autofix.microservicerepair.entities.Repair;
import com.autofix.microservicerepair.services.RepairService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;

@Controller
public interface RepairRepository extends JpaRepository<Repair, Long> {

}