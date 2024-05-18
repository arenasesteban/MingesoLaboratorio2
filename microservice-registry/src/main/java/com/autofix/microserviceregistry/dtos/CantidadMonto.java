package com.autofix.microserviceregistry.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CantidadMonto {
    private Integer cantidad;
    private Integer monto;
}
