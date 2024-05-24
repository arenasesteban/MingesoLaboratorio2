package com.autofix.microserviceregistry.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Month;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparacionMeses {
    private String tipo_reparacion;

    private String primer_mes;
    private Integer cantidad_primer_mes;
    private Integer monto_primer_mes;

    private String segundo_mes;
    private Integer cantidad_segundo_mes;
    private Integer monto_segundo_mes;

    private String tercer_mes;
    private Integer cantidad_tercer_mes;
    private Integer monto_tercer_mes;

    public String obtenerMes(Integer numero_mes) {

        return switch (numero_mes) {
            case 1 -> "Enero";
            case 2 -> "Febrero";
            case 3 -> "Marzo";
            case 4 -> "Abril";
            case 5 -> "Mayo";
            case 6 -> "Junio";
            case 7 -> "Julio";
            case 8 -> "Agosto";
            case 9 -> "Septiembre";
            case 10 -> "Octubre";
            case 11 -> "Noviembre";
            case 12 -> "Diciembre";
            default -> "";
        };
    }

    public Integer calcularMesAnterior(Integer numero_mes, Integer meses_atras) {
        int mes_anterior = numero_mes - meses_atras;

        if(mes_anterior <= 0) {
            return mes_anterior + 12;
        }

        return mes_anterior;
    }
}