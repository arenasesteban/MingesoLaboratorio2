package com.autofix.microservicerepair.entities;

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
public class Reparacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_reparacion;

    private Integer numero_reparacion;
    private String tipo_reparacion;
    private LocalDate fecha_reparacion;
    private LocalTime hora_reparacion;
    private Integer monto_reparacion;

    private Long id_registro;
    private String patente;
}
