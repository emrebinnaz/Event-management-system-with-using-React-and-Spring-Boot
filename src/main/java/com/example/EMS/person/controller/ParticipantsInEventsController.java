package com.example.EMS.person.controller;

import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipationCountInADay;
import com.example.EMS.person.mapper.ParticipantMapper;
import com.example.EMS.person.service.ParticipantsInEventsService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.util.ByteArrayDataSource;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated

public class ParticipantsInEventsController {

    private final EventService eventService;
    private final ParticipantsInEventsService participantsInEventsService;


    @GetMapping("/participationDatesAndparticipantCounts/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public List<ParticipationCountInADay> getPartipationDatesAndParticipantCountsOfEvent
            (@PathVariable String eventName) {

        Event event = eventService.getEventByName(eventName);
        List<ParticipationCountInADay> partipationDatesAndParticipantCountsOfEvent =
                participantsInEventsService.getPartipationDatesAndParticipantCountsOfEvent(event);
        return partipationDatesAndParticipantCountsOfEvent;
    }

}
