package com.autofix.microserviceregistry.services;

import com.autofix.microserviceregistry.entities.Registry;
import com.autofix.microserviceregistry.repositories.RegistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class RegistryService {
    @Autowired
    RegistryRepository registryRepository;

    public Registry createRegistry(Registry registry) {
        return registryRepository.save(registry);
    }

    public List<Registry> getRegistries() {
        return registryRepository.findAll();
    }
}
