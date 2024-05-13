package com.autofix.microserviceregistry.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo {
    private String patente;
    private String marca;
    private String modelo;
    private String tipo;
    private String motor;
    private Integer numero_asientos;
    private Integer kilometraje;
    private Integer ano_fabricacion;
}
