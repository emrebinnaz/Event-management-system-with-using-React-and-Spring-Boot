package com.example.EMS.person.service;

import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.repository.OrganizatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizatorService {
    private final OrganizatorRepository organizatorRepository;
    public Optional<Organizator> findByUsername(String organizatorUsername) {
        return organizatorRepository.findByUsername(organizatorUsername);
    }

    public void save(Organizator newOrganizator) {
        organizatorRepository.save(newOrganizator);
    }
}
