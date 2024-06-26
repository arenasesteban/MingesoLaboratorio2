package com.autofix.microserviceregistry.services;

import com.autofix.microserviceregistry.clients.ReparacionFeignClient;
import com.autofix.microserviceregistry.clients.VehiculoFeignClient;
import com.autofix.microserviceregistry.dtos.CantidadMontoInterfaz;
import com.autofix.microserviceregistry.dtos.ReparacionMeses;
import com.autofix.microserviceregistry.dtos.ReparacionTipoVehiculo;
import com.autofix.microserviceregistry.dtos.Vehiculo;
import com.autofix.microserviceregistry.entities.Detalle;
import com.autofix.microserviceregistry.entities.Registro;
import com.autofix.microserviceregistry.repositories.DetalleRepository;
import com.autofix.microserviceregistry.repositories.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class RegistroService {
    @Autowired
    RegistroRepository registroRepository;

    @Autowired
    DetalleRepository detalleRepository;

    @Autowired
    VehiculoFeignClient vehiculoFeignClient;

    @Autowired
    ReparacionFeignClient reparacionFeignClient;

    public Registro crearRegistro(Registro registro) {
        return registroRepository.save(registro);
    }

    public List<Detalle> crearDetalles(List<Detalle> detalles) {
        return detalleRepository.saveAll(detalles);
    }

    public List<Registro> obtenerRegistros() {
        return registroRepository.findAll();
    }

    public Registro obtenerRegistro(Long id_registro) {
        return registroRepository.encontrarPorId_registro(id_registro);
    }

    public Registro calcularTotal(Registro registro, int descuento_bono) {
        Vehiculo vehiculo = vehiculoFeignClient.obtenerVehiculoPorPatente(registro.getPatente());

        double recargo_kilometraje = registro.getMonto_reparaciones() * recargoPorKilometraje(vehiculo.getKilometraje(), vehiculo.getTipo());
        double recargo_antiguedad = registro.getMonto_reparaciones() * recargoPorAntiguedad(vehiculo.getAno_fabricacion(), vehiculo.getTipo());
        double recargo_retraso = registro.getMonto_reparaciones() * recargoPorRetrasoRecogida(registro.getFecha_salida(), registro.getFecha_retiro());

        double descuento_cantidad_reparaciones = registro.getMonto_reparaciones() * descuentoPorNumeroReparaciones(vehiculo.getPatente(), vehiculo.getMotor(), registro.getId_registro());
        double descuento_dia_atencion = registro.getMonto_reparaciones() * descuentoPorDiaAtencion(registro.getFecha_ingreso(), registro.getHora_ingreso());

        registro.setMonto_recargos((int) (recargo_kilometraje + recargo_antiguedad + recargo_retraso));
        registro.setMonto_descuentos((int) (descuento_cantidad_reparaciones + descuento_dia_atencion + descuento_bono));
        registro.setMonto_iva((int) ((registro.getMonto_reparaciones() + registro.getMonto_recargos() - registro.getMonto_descuentos()) * .19));

        registro.setCosto_total(registro.getMonto_reparaciones() + registro.getMonto_recargos() - registro.getMonto_descuentos() + registro.getMonto_iva());

        return registroRepository.save(registro);
    }

    public double descuentoPorNumeroReparaciones(String patente, String motor, Long id_registro) {
        int numero_reparaciones = contarReparaciones(patente, id_registro);
        double descuento = .0;

        if(numero_reparaciones >= 1 && numero_reparaciones <= 2) {
            descuento = switch (motor) {
                case "Gasolina" -> .05;
                case "Diesel" -> .07;
                case "Híbrido" -> .1;
                case "Eléctrico" -> .08;
                default -> descuento;
            };
        }
        else if(numero_reparaciones >= 3 && numero_reparaciones <= 5) {
            descuento = switch (motor) {
                case "Gasolina" -> .1;
                case "Diesel" -> .12;
                case "Híbrido" -> .15;
                case "Eléctrico" -> .13;
                default -> descuento;
            };
        }
        else if(numero_reparaciones >= 6 && numero_reparaciones <= 9) {
            descuento = switch (motor) {
                case "Gasolina" -> .15;
                case "Diesel" -> .17;
                case "Híbrido" -> .2;
                case "Eléctrico" -> .18;
                default -> descuento;
            };
        }
        else if(numero_reparaciones >= 10) {
            descuento = switch (motor) {
                case "Gasolina" -> .2;
                case "Diesel" -> .22;
                case "Híbrido" -> .25;
                case "Eléctrico" -> .23;
                default -> descuento;
            };
        }

        return descuento;
    }

    public int contarReparaciones(String patente, Long id_registro) {
        List<Long> id_registros = registroRepository.buscarPorPatenteYMenorAId_registro(patente, id_registro);
        return detalleRepository.contarDetallePorId_registro(id_registros);
    }

    public double descuentoPorDiaAtencion(LocalDate fecha_ingreso, LocalTime hora_ingreso) {
        double descuento = .0;

        if (fecha_ingreso.getDayOfWeek() == DayOfWeek.MONDAY || fecha_ingreso.getDayOfWeek() == DayOfWeek.THURSDAY) {
            if (!hora_ingreso.isBefore(LocalTime.of(9, 0)) && !hora_ingreso.isAfter(LocalTime.of(12, 0))) {
                descuento = .1;
            }
        }

        return descuento;
    }

    public double recargoPorKilometraje(Integer kilometraje, String tipo) {
        double recargo = .0;

        if(kilometraje >= 5001 && kilometraje <= 12000) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback" -> .03;
                case "SUV", "Pickup", "Furgoneta" -> .05;
                default -> recargo;
            };
        }
        else if(kilometraje >= 12001 && kilometraje <= 25000) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback" -> .07;
                case "SUV", "Pickup", "Furgoneta" -> .09;
                default -> recargo;
            };
        }
        else if(kilometraje >= 25001 && kilometraje <= 40000) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback", "SUV", "Pickup", "Furgoneta" -> .12;
                default -> recargo;
            };
        }
        else if(kilometraje > 40000) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback", "SUV", "Pickup", "Furgoneta" -> .2;
                default -> recargo;
            };
        }

        return recargo;
    }

    public double recargoPorAntiguedad(int ano_fabricacion, String tipo) {
        int ano_antiguedad = 2024 - ano_fabricacion;
        double recargo = .0;

        if(ano_antiguedad >= 6 && ano_antiguedad <= 10) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback" -> .05;
                case "SUV", "Pickup", "Furgoneta" -> .07;
                default -> recargo;
            };
        }
        else if(ano_antiguedad >= 11 && ano_antiguedad <= 15) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback" -> .09;
                case "SUV", "Pickup", "Furgoneta" -> .11;
                default -> recargo;
            };
        }
        else if(ano_antiguedad >= 16) {
            recargo = switch (tipo) {
                case "Sedan", "Hatchback" -> .15;
                case "SUV", "Pickup", "Furgoneta" -> .20;
                default -> recargo;
            };
        }

        return recargo;
    }

    public double recargoPorRetrasoRecogida(LocalDate fecha_salida, LocalDate fecha_retiro) {
        int retraso = Period.between(fecha_salida, fecha_retiro).getDays();

        return retraso * .05;
    }

    public Integer obtenerMontoPorPatenteYTipoReparacion(List<String> patentes, String tipo_reparacion, Integer mes, Integer ano) {
        Integer monto = detalleRepository.sumarPorPatenteYTipoReparacion(patentes, tipo_reparacion, mes, ano);

        if(monto == null) {
            monto = 0;
        }

        return monto;
    }

    public CantidadMontoInterfaz calcularCantidadYMontoReparacionPorMes(String tipo_reparacion, Integer mes) {
        CantidadMontoInterfaz cantidad_monto = detalleRepository.contarDetallePorTipoReparacionYMes(tipo_reparacion, mes);

        if (cantidad_monto.getCantidad() == 0) {
            return new CantidadMontoInterfaz() {
                @Override
                public Integer getCantidad() {
                    return 0;
                }

                @Override
                public Integer getMonto() {
                    return 0;
                }
            };
        }

        return cantidad_monto;
    }

    public List<ReparacionTipoVehiculo> reporteReparacionTipoVehiculo(Integer mes, Integer ano) {
        List<String> tipo_reparaciones = reparacionFeignClient.obtenerTipoReparaciones();
        List<ReparacionTipoVehiculo> reparacionesTipoVehiculo = new ArrayList<>();

        for(String tipo_reparacion : tipo_reparaciones) {
            ReparacionTipoVehiculo reparacionTipoVehiculo = new ReparacionTipoVehiculo();

            reparacionTipoVehiculo.setTipo_reparacion(tipo_reparacion);

            List<String> patentes = detalleRepository.encontrarPatentesPorTipoReparacion(tipo_reparacion, mes, ano);

            reparacionTipoVehiculo.setCantidad_sedan(vehiculoFeignClient.obtenerCantidadVehiculosPorTipoVehiculo(patentes, "Sedan"));
            List<String> patenes_sedan = vehiculoFeignClient.obtenerPatentesPorTipoVehiculo(patentes, "Sedan");
            reparacionTipoVehiculo.setMonto_sedan(obtenerMontoPorPatenteYTipoReparacion(patenes_sedan, tipo_reparacion, mes, ano));

            reparacionTipoVehiculo.setCantidad_hatchback(vehiculoFeignClient.obtenerCantidadVehiculosPorTipoVehiculo(patentes, "Hatchback"));
            List<String> patentes_hatchback = vehiculoFeignClient.obtenerPatentesPorTipoVehiculo(patentes, "Hatchback");
            reparacionTipoVehiculo.setMonto_hatchback(obtenerMontoPorPatenteYTipoReparacion(patentes_hatchback, tipo_reparacion, mes, ano));

            reparacionTipoVehiculo.setCantidad_suv(vehiculoFeignClient.obtenerCantidadVehiculosPorTipoVehiculo(patentes, "SUV"));
            List<String> patentes_suv = vehiculoFeignClient.obtenerPatentesPorTipoVehiculo(patentes, "SUV");
            reparacionTipoVehiculo.setMonto_suv(obtenerMontoPorPatenteYTipoReparacion(patentes_suv, tipo_reparacion, mes, ano));

            reparacionTipoVehiculo.setCantidad_pickup(vehiculoFeignClient.obtenerCantidadVehiculosPorTipoVehiculo(patentes, "Pickup"));
            List<String> patentes_pickup = vehiculoFeignClient.obtenerPatentesPorTipoVehiculo(patentes, "Pickup");
            reparacionTipoVehiculo.setMonto_pickup(obtenerMontoPorPatenteYTipoReparacion(patentes_pickup, tipo_reparacion, mes, ano));

            reparacionTipoVehiculo.setCantidad_furgoneta(vehiculoFeignClient.obtenerCantidadVehiculosPorTipoVehiculo(patentes, "Furgoneta"));
            List<String> patentes_furgoneta = vehiculoFeignClient.obtenerPatentesPorTipoVehiculo(patentes, "Furgoneta");
            reparacionTipoVehiculo.setMonto_furgoneta(obtenerMontoPorPatenteYTipoReparacion(patentes_furgoneta, tipo_reparacion, mes, ano));

            reparacionesTipoVehiculo.add(reparacionTipoVehiculo);
        }

        return reparacionesTipoVehiculo;
    }

    public List<ReparacionMeses> reporteReparacionMeses(Integer mes) {
        List<String> tipo_reparaciones = reparacionFeignClient.obtenerTipoReparaciones();
        List<ReparacionMeses> reparacionesMeses = new ArrayList<>();

        for(String tipo_reparacion : tipo_reparaciones) {
            ReparacionMeses reparacionMeses = new ReparacionMeses();

            reparacionMeses.setTipo_reparacion(tipo_reparacion);

            int primer_mes = mes;
            CantidadMontoInterfaz cantidad_monto_1 = calcularCantidadYMontoReparacionPorMes(tipo_reparacion, primer_mes);
            reparacionMeses.setPrimer_mes(reparacionMeses.obtenerMes(primer_mes));
            reparacionMeses.setCantidad_primer_mes(cantidad_monto_1.getCantidad());
            reparacionMeses.setMonto_primer_mes(cantidad_monto_1.getMonto());

            int segundo_mes = reparacionMeses.calcularMesAnterior(mes, 1);
            CantidadMontoInterfaz cantidad_monto_2 = calcularCantidadYMontoReparacionPorMes(tipo_reparacion, segundo_mes);
            reparacionMeses.setSegundo_mes(reparacionMeses.obtenerMes(segundo_mes));
            reparacionMeses.setCantidad_segundo_mes(cantidad_monto_2.getCantidad());
            reparacionMeses.setMonto_segundo_mes(cantidad_monto_2.getMonto());

            int tercer_mes = reparacionMeses.calcularMesAnterior(mes, 2);
            CantidadMontoInterfaz cantidad_monto_3 = calcularCantidadYMontoReparacionPorMes(tipo_reparacion, tercer_mes);
            reparacionMeses.setTercer_mes(reparacionMeses.obtenerMes(tercer_mes));
            reparacionMeses.setCantidad_tercer_mes(cantidad_monto_3.getCantidad());
            reparacionMeses.setMonto_tercer_mes(cantidad_monto_3.getMonto());

            reparacionesMeses.add(reparacionMeses);
        }

        return reparacionesMeses;
    }

    public Registro actualizarRegistro(Registro registro) {
        return registroRepository.save(registro);
    }
}