package com.example.EMS.person.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.service.EmailService;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipationCountInADay;
import com.example.EMS.person.repository.ParticipantsInEventsRepository;
import com.example.EMS.person.service.ParticipantService;
import com.example.EMS.security.entity.Authority;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class ParticipantsInEventsService {

    private final ParticipantService participantService;
    private final EventService eventService;
    private final ParticipantsInEventsRepository participantsInEventsRepository;
    private ParticipantsInEvents newParticipation = new ParticipantsInEvents();

    @Transactional
    public MessageResponse addParticipantToEvent(String username, Event event) {
        Event eventFromDB = eventService.getEventByName(event.getName());
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            if(isEventNotFull(eventFromDB)){
                increaseCurrentPeopleCountOfEvent(eventFromDB);
            }
            else {
                return new MessageResponse("Bu etkinliğin kontenjanı dolmuştur",
                        ERROR);
            }
            if(isParticipatedBeforeToEvent(username,eventFromDB)){
                return new MessageResponse("Bu etkinliğe daha önceden başvurdunuz ! ",
                        ERROR);
            }
            newParticipation = new ParticipantsInEvents(
                    eventFromDB,
                    participant,
                    java.time.LocalDate.now(),null);
           saveNewParticipationToEvent(eventFromDB);
           saveNewParticipationToParticipant(participant);
           return new MessageResponse("Etkinliğe başarılı bir şekilde kayıt oldunuz." +
                    "Mail'inize etkinliğin detaylarını içeren bir QR Code yolluyoruz.",
                    SUCCESS);
        }
        return new MessageResponse("Bu etkinliğe kayıt olamadınız.",
                ERROR);
    }



    private boolean isEventNotFull(Event eventFromDB) {
        return eventFromDB.getQuota() != eventFromDB.getCurrentNumberOfPeople();
    }

    private void increaseCurrentPeopleCountOfEvent(Event event) {
        int numberOfPeopleInEvent = event.getCurrentNumberOfPeople();
        event.setCurrentNumberOfPeople(numberOfPeopleInEvent + 1);
    }

    @Transactional
    public boolean isParticipatedBeforeToEvent(String username, Event event) {
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        Event eventFromDB = eventService.getEventByName(event.getName());
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();

            return participantsInEventsRepository.isExistsParticipationWith
                    (eventFromDB.getId(),
                            participant.getId());
        }
        return false;
    }

    private void saveNewParticipationToEvent(Event event) {
        event.getParticipantsInEvents().add(newParticipation);
        eventService.save(event);
    }

    private void saveNewParticipationToParticipant(Participant participant) {
        participant.getParticipantsInEvents().add(newParticipation);
        participantService.save(participant);
    }

    public List<Participant> getParticipantsOfEvent(String eventName) {
        List<Participant> participants = new ArrayList<Participant>();
        Event event = eventService.getEventByName(eventName);
        for(ParticipantsInEvents pie : event.getParticipantsInEvents()){
             participants.add(pie.getParticipant());
        }
        return participants;
    }

    public List<ParticipationCountInADay> getPartipationDatesAndParticipantCountsOfEvent(Event event) {
        List<ParticipationCountInADay> participationCountInADays =
                participantsInEventsRepository.countOfTotalParticipantsInDays(event.getId());
        return participationCountInADays;
    }

}
