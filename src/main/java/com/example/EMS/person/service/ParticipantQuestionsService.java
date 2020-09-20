package com.example.EMS.person.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.dto.ParticipantQuestionsAboutEventDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.repository.ParticipantQuestionsRepository;
import com.example.EMS.person.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.*;
import static com.example.EMS.common.enums.MessageType.SUCCESS;
import static com.example.EMS.common.enums.MessageType.ERROR;

@Service
@RequiredArgsConstructor
public class ParticipantQuestionsService {

    private final EventService eventService;
    private final ParticipantService participantService;
    private final ParticipantsInEventsService participantsInEventsService;
    private final ParticipantQuestionsRepository participantQuestionsRepository;

    @Transactional
    public MessageResponse sendParticipantQuestion(ParticipantQuestionsAboutEvent participantQuestion,
                                                   String questionText) {
        try {
            Event eventFromDB = getEventOfQuestion(participantQuestion);
            Participant participantFromDB = getParticipantOfQuestion(participantQuestion);
            if(isParticipantJoinedBeforeToEvent(participantFromDB.getUsername(),eventFromDB)){
                ParticipantQuestionsAboutEvent addedQuestion =
                        createParticipantQuestionWith(questionText,eventFromDB,participantFromDB);
                participantQuestionsRepository.save(addedQuestion);
                return new MessageResponse("Soru başarıyla eklendi ! ",SUCCESS);
            }
            return new MessageResponse("Bu etkinliğe katılmadığınız için " +
                    "soru ekleyemezsiniz ! ",ERROR);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new MessageResponse("Soru eklenirken hata oluştu",ERROR);
        }
    }

    private Event getEventOfQuestion(ParticipantQuestionsAboutEvent participantQuestion) {
        Event eventFromDTO = participantQuestion.getEvent();
        Event eventFromDB = eventService.getEventByName(eventFromDTO.getName());
        return eventFromDB;
    }

    private Participant getParticipantOfQuestion(ParticipantQuestionsAboutEvent participantQuestion) {
        Participant participantFromDTO = participantQuestion.getParticipant();
        Optional<Participant> optionalParticipant = participantService.findByUsername(participantFromDTO.getUsername());
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            return participant;
        }
        else {
            return null;
        }
    }

    private boolean isParticipantJoinedBeforeToEvent(String participantUsername,
                                                     Event event) {
        return participantsInEventsService.isParticipatedBeforeToEvent(participantUsername,event);
    }

    private ParticipantQuestionsAboutEvent createParticipantQuestionWith(String questionText,Event event, Participant participant) {
        ParticipantQuestionsAboutEvent participantQuestion =
                new ParticipantQuestionsAboutEvent();
        participantQuestion.setQuestion(questionText);
        participantQuestion.setLecturer(event.getLecturer());
        participantQuestion.setEvent(event);
        participantQuestion.setParticipant(participant);
        return participantQuestion;

    }

    public List<ParticipantQuestionsAboutEvent> getParticipantQuestionsOf(Event event) {
        return  participantQuestionsRepository.findAllByEventId(event.getId());
    }

    @Transactional
    public MessageResponse updateAnswerOfQuestion(ParticipantQuestionsAboutEvent participantQuestion){

        Event eventFromDB = getEventOfQuestion(participantQuestion);
        Participant participantFromDB = getParticipantOfQuestion(participantQuestion);
        String answer = participantQuestion.getAnswer();
        ParticipantQuestionsAboutEvent answeredQuestion =
                participantQuestionsRepository.
                findByEventIdAndParticipantIdAndQuestion(eventFromDB.getId(),
                        participantFromDB.getId(),
                        participantQuestion.getQuestion());
        answeredQuestion.setAnswer(answer);
        participantQuestionsRepository.save(answeredQuestion);

        return new MessageResponse("Cevap eklendi ! ",SUCCESS);
    }

}
