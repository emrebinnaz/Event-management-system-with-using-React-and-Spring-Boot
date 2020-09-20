package com.example.EMS.person.repository;

import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LecturerRepository  extends JpaRepository<Lecturer, Integer> {
    Optional<Lecturer> findByUsername(String username);

    Optional<Lecturer> findByPhone(String phone);

    Optional<Lecturer> findByEmail(String email);
}
