package com.autofix.microservicevehicle.repositories;

import com.autofix.microservicevehicle.entities.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, String> {

}
