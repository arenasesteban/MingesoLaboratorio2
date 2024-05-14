package com.autofix.microserviceregistry.repositories;

import com.autofix.microserviceregistry.entities.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {
    @Query("SELECT r.id_registro FROM Registro r WHERE r.id_registro < :id_registro")
    List<Long> buscarPorPatenteYMenorAId_registro(String patente, Long id_registro);

    @Query("SELECT DISTINCT r.patente FROM Registro r")
    List<String> buscarPatentesDistinct();
}
