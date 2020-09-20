package com.example.EMS.person.service;

import com.example.EMS.event.entity.Event;
import com.example.EMS.event.repository.EventRepository;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.repository.LecturerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class LecturerService {
    private final LecturerRepository lecturerRepository;
    private final EventService eventService;

    @Autowired
    public LecturerService(LecturerRepository lecturerRepository,
                           @Lazy EventService eventService) {
        this.lecturerRepository = lecturerRepository;
        this.eventService = eventService;
    }

    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    public Optional<Lecturer> findByUsername(String lecturerUsername){
        return lecturerRepository.findByUsername(lecturerUsername);
    }

    public Optional<Lecturer> getLecturerOfEvent(String eventName) {
        Event event = eventService.getEventByName(eventName);
        int lecturerId = event.getLecturer().getId();
        return lecturerRepository.findById(lecturerId);

    }

    public void save(Lecturer newLecturer) {
        lecturerRepository.save(newLecturer);
    }

    public boolean isAnyLecturerHasSamePhoneWith(String phone) {
        Optional<Lecturer> optionalLecturer = lecturerRepository.findByPhone(phone);
        return optionalLecturer.isPresent();
    }

    public boolean isAnyLecturerHasSameEmailWith(String email) {
        Optional<Lecturer> optionalLecturer = lecturerRepository.findByEmail(email);
        return optionalLecturer.isPresent();
    }
}
