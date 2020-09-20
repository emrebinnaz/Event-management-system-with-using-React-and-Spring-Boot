package com.example.EMS.person.repository;

import com.example.EMS.person.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    Optional<Participant> findByUsername(String username);

    Optional<Participant> findByPhone(String phone);

    Optional<Participant> findByEmail(String email);
}
