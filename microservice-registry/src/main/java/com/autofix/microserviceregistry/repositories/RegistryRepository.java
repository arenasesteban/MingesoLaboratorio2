package com.autofix.microserviceregistry.repositories;

import com.autofix.microserviceregistry.entities.Registry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistryRepository extends JpaRepository<Registry, Long> {

}
