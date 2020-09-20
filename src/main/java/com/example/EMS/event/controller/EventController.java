package com.example.EMS.event.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;

    @GetMapping
    public List<EventDTO> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("/WithSurvey")
    public List<EventDTO> getAllEventsWithSurvey() {
        List<Event> events = eventService.getAllEventsWithSurvey();
        return eventMapper.mapToDto(events);

    }

    @GetMapping("/NonRaffled")
    public List<EventDTO> getAllNonRaffledEvents() {
        List<Event> events = eventService.getAllNonRaffledEvents();
        return eventMapper.mapToDto(events);
    }

    @GetMapping("{eventName}")
    public EventDTO getEventByName(@PathVariable String eventName) {
        Event event = eventService.getEventByName(eventName);
        return eventMapper.mapToDto(event);
    }

    @PostMapping("{organizatorUsername}/{lecturerUsername}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse addEvent(@PathVariable String organizatorUsername,
                                    @RequestBody @Valid EventDTO eventDTO,
                                    @PathVariable String lecturerUsername) {
        return eventService.addEvent(organizatorUsername,
                eventMapper.mapToEntity(eventDTO),
                lecturerUsername);
    }

    @PutMapping("{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse updateEvent(@PathVariable String eventName,
                                       @Valid @RequestBody EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return eventService.updateEvent(eventName,event);

    }

    @DeleteMapping("/delete/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse deleteEvent(@PathVariable String eventName) {
        return eventService.deleteEvent(eventName);
    }

    @GetMapping("/OfLecturer/{username}")
    @PreAuthorize("hasAuthority('LECTURER')")
    public List<EventDTO> getEventsOfLecturer(@PathVariable String username) {
        return eventMapper.mapToDto(eventService.getEventsOfLecturer(username));
    }


}
