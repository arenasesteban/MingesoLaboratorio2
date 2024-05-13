package com.autofix.microservicevehicle.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo {
    @Id
    @Column(unique = true, nullable = false)
    private String patente;

    private String marca;
    private String modelo;
    private String tipo;
    private String motor;
    private Integer numero_asientos;
    private Integer kilometraje;
    private Integer ano_fabricacion;
}
