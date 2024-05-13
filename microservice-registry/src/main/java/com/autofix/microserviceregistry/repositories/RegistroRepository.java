package com.autofix.microserviceregistry.repositories;

import com.autofix.microserviceregistry.entities.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {

}
