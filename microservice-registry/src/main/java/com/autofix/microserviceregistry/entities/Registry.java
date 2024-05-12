package com.autofix.microserviceregistry.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Registry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_registry;

    private LocalDate fechaIngreso;
    private LocalTime horaIngreso;
    private LocalDate fechaSalida;
    private LocalTime horaSalida;
    private LocalDate fechaRetiro;
    private LocalTime horaRetiro;
    private Integer montoTotal;

    private String patente;
}
