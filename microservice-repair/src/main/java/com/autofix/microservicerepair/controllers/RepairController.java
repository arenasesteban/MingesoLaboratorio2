package com.autofix.microservicerepair.controllers;

import com.autofix.microservicerepair.entities.Repair;
import com.autofix.microservicerepair.services.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/repair")
@CrossOrigin("*")
public class RepairController {
    @Autowired
    RepairService repairService;

    @PostMapping("/")
    public ResponseEntity<Repair> createRepair(@RequestBody Repair repair) {
        Repair repair1 = repairService.createRepair(repair);
        return ResponseEntity.ok(repair1);
    }
}
