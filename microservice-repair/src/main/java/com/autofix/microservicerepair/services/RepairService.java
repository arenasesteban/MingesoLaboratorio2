package com.autofix.microservicerepair.services;

import com.autofix.microservicerepair.entities.Repair;
import com.autofix.microservicerepair.repositories.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepairService {
    @Autowired
    RepairRepository repairRepository;

    public Repair createRepair(Repair repair) {
        return repairRepository.save(repair);
    }
}
