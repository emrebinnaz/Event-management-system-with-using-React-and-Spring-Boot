package com.example.EMS.event.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.event.entity.Survey.EventSurveyAnswers;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.entity.Survey.SurveyStatistics;
import com.example.EMS.event.repository.EventSurveyAnswerRepository;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipationCountInADay;
import com.example.EMS.person.mapper.ParticipantMapper;
import com.example.EMS.person.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.SUCCESS;

@RequiredArgsConstructor
@Service
public class EventSurveyAnswerService {

    private final EventSurveyQuestionService surveyQuestionService;
    private final ParticipantService participantService;
    private final EventSurveyAnswerRepository surveyAnswerRepository;
    private final EventService eventService;

    @Transactional
    public MessageResponse addAnswersToSurveyQuestions(List<EventSurveyAnswers> surveyAnswers,
                                                       String eventName) {
        Participant participantFromDTO = surveyAnswers.get(0).getParticipant();
        Event event = eventService.getEventByName(eventName);
        Optional<Participant> optionalParticipant =
                participantService.findByUsername(participantFromDTO.getUsername());
        Participant participantFromDB = optionalParticipant.get();
        List<EventSurveyQuestions> eventSurveyQuestions =
                event.getEventSurveyQuestions().stream().collect(Collectors.toList());

        for(int i = 0; i < surveyAnswers.size();i++) {
            surveyAnswerRepository.save(surveyAnswers.get(i).getAnswer(),
                    participantFromDB.getId(),
                    eventSurveyQuestions.get(i).getId());
        }
        return new MessageResponse("Başarılı",SUCCESS);
    }

    public boolean isAnsweredBeforeToSurveyQuestions(String participantUsername,
                                                     Event event) {
        boolean isAnsweredBefore = false;
        Event eventFromDB = eventService.getEventByName(event.getName());
        Optional<Participant> optionalParticipant =
                participantService.findByUsername(participantUsername);
        if(optionalParticipant.isPresent()){
            Participant participant = optionalParticipant.get();
            List<EventSurveyQuestions> eventSurveyQuestions =
                    surveyQuestionService.findAllByEventId(eventFromDB.getId());
            for(int i = 0; i<eventSurveyQuestions.size(); i++) {
                Integer surveyQuestionId = eventSurveyQuestions.get(i).getId();
                isAnsweredBefore = surveyAnswerRepository.isAnsweredBeforeToSurveyQuestions(
                        surveyQuestionId,
                        participant.getId());
                if(isAnsweredBefore)
                    break;
            }
        }
        return isAnsweredBefore;
    }
}
