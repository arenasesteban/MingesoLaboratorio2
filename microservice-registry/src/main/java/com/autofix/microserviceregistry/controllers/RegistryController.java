package com.autofix.microserviceregistry.controllers;

import com.autofix.microserviceregistry.entities.Registry;
import com.autofix.microserviceregistry.services.RegistryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registry")
@CrossOrigin("*")
public class RegistryController {
    @Autowired
    RegistryService registryService;

    @PostMapping("/")
    public ResponseEntity<Registry> createRegistry(@RequestBody Registry registry) {
        Registry registry1 = registryService.createRegistry(registry);
        return ResponseEntity.ok(registry1);
    }

    @GetMapping("/")
    public ResponseEntity<List<Registry>> getRegistries() {
        List<Registry> registries = registryService.getRegistries();
        return ResponseEntity.ok(registries);
    }
}
