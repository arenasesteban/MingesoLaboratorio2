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

    private Float primera_variacion;

    private String segundo_mes;
    private Integer cantidad_segundo_mes;
    private Integer monto_segundo_mes;

    private Float segunda_variacion;

    private String tercer_mes;
    private Integer cantidad_tercer_mes;
    private Integer monto_tercer_mes;
}