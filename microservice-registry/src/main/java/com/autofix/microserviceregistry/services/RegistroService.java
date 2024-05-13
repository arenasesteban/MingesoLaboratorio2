package com.autofix.microserviceregistry.services;

import com.autofix.microserviceregistry.entities.Registro;
import com.autofix.microserviceregistry.repositories.RegistroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroService {
    @Autowired
    RegistroRepository registroRepository;

    public Registro crearRegistro(Registro registro) {
        return registroRepository.save(registro);
    }

    public List<Registro> obtenerRegistros() {
        return registroRepository.findAll();
    }
}
