package com.autofix.microservicevehicle.repositories;

import com.autofix.microservicevehicle.entities.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {
    @Query("SELECT v FROM Vehiculo v WHERE v.patente = :patente")
    Vehiculo encontrarPorPatente(String patente);

    @Query("SELECT v.patente FROM Vehiculo v")
    List<String> encontrarPatentes();
}
