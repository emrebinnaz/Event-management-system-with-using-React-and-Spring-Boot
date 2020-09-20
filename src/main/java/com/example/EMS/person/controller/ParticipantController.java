package com.example.EMS.person.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.mapper.LecturerMapper;
import com.example.EMS.person.mapper.ParticipantMapper;
import com.example.EMS.person.service.LecturerService;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.person.service.ParticipantsInEventsService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;
import javax.mail.util.ByteArrayDataSource;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
public class ParticipantController {
    private final ParticipantMapper participantMapper;
    private final ParticipantService participantService;
    private final ParticipantsInEventsService participantsInEventsService;
    private final EventMapper eventMapper;

    @PostMapping("/join/{username}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public MessageResponse joinEvent(@PathVariable String username,
                                     @RequestBody @Valid EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return participantsInEventsService.addParticipantToEvent(username,event);
    }

    @PostMapping("/isJoinedBefore/{username}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public boolean isParticipatedBeforeToEvent(@PathVariable String username,
                                               @RequestBody @Valid EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return participantsInEventsService.isParticipatedBeforeToEvent(username,event);
    }

    @GetMapping("/participants/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public List<ParticipantDTO> getParticipantsOfEvent(@PathVariable String eventName) {
        List<Participant> participants = participantsInEventsService.getParticipantsOfEvent(eventName);
        return participantMapper.mapToDto(participants);
    }

    @GetMapping("/participant/{username}")
    public ParticipantDTO getParticipant(@PathVariable String username) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        Participant participant = optionalParticipant.get();
        return participantMapper.mapToDto(participant);

    }

    @GetMapping("/eventsOfParticipant/{participantUsername}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public List<EventDTO> getEventsOfParticipant(@PathVariable String participantUsername) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(participantUsername);
        Participant participant = optionalParticipant.get();
        return eventMapper.mapToDto(participantService.getEventsOfParticipant(participant));
    }

    @PostMapping(value = "/sendQrCodeOf/{username}",
            produces = MediaType.IMAGE_PNG_VALUE)
    public String sendQrCodeAsInnerHTMLToAfterParticipation(@PathVariable String username,
                                                  @Valid @RequestBody EventDTO eventDTO) throws IOException, WriterException {

        String innerHTML = "";
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            Event event = eventMapper.mapToEntity(eventDTO);
            innerHTML = participantService.sendQrCodeAsInnerHTMLAfterParticipation(participant,event);
        }
        return innerHTML;

    }

}
