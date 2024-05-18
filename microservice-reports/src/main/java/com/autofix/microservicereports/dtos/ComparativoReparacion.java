package com.autofix.microservicereports.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComparativoReparacion {
    private String tipo_reparacion;

    private String primer_mes;
    private Integer cantidad_primer_mes;
    private Integer monto_primer_mes;

    private Double primera_variacion_cantidad = .0;
    private Double primera_variacion_monto = .0;

    private String segundo_mes;
    private Integer cantidad_segundo_mes;
    private Integer monto_segundo_mes;

    private Double segunda_variacion_cantidad = .0;
    private Double segunda_variacion_monto = .0;

    private String tercer_mes;
    private Integer cantidad_tercer_mes;
    private Integer monto_tercer_mes;
}