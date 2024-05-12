package com.autofix.microservicevehicle.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @Column(unique = true, nullable = false)
    private String license_plate;

    private String brand;
    private String model;
    private String type;
    private String engine;
    private Integer number_seats;
    private Integer kilometers;
    private Integer year_manufacture;
}
