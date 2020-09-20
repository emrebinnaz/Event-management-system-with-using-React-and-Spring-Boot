package com.example.EMS.person.controller;

import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.dto.LecturerDTO;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.mapper.LecturerMapper;
import com.example.EMS.person.service.LecturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Validated
public class LecturerController {

    private final LecturerMapper lecturerMapper;
    private final LecturerService lecturerService;

    @GetMapping("/lecturers")
    public List<LecturerDTO> getAllLecturers() {
        List<Lecturer> lecturers = lecturerService.getAllLecturers();
        return lecturerMapper.mapToDto(lecturers);
    }
    @GetMapping("/lecturer/of/{eventName}")
    public LecturerDTO getLecturerOfEvent(@PathVariable String eventName) {
        Optional<Lecturer> optionalLecturer = lecturerService.getLecturerOfEvent(eventName);
        return lecturerMapper.mapToDto(optionalLecturer.get());
    }
}
