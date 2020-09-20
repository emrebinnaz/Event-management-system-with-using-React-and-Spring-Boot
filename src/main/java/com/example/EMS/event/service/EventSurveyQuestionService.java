package com.example.EMS.event.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.entity.Survey.SurveyStatistics;
import com.example.EMS.event.repository.EventQuestionsRepository;
import com.example.EMS.event.repository.EventSurveyQuestionRepository;
import com.example.EMS.person.entity.ParticipationCountInADay;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.ERROR;
import static com.example.EMS.common.enums.MessageType.SUCCESS;

@Service
@RequiredArgsConstructor
public class EventSurveyQuestionService {

    private final EventSurveyQuestionRepository surveyQuestionRepository;
    private final EventService eventService;
    public MessageResponse addSurveyQuestionsToEvent(String eventName,
                                                     List<EventSurveyQuestions> surveyQuestions) {
        Event event = eventService.getEventByName(eventName);

        if(event == null){
            return new MessageResponse("Soru ekleme başarısız", ERROR);
        }
        else{
            event.getEventSurveyQuestions().addAll(surveyQuestions);
            eventService.save(event);
            return new MessageResponse("Soru ekleme başarılı", SUCCESS);
        }
    }

    public void save(EventSurveyQuestions surveyQuestion) {
        surveyQuestionRepository.save(surveyQuestion);
    }

    public List<List<SurveyStatistics>> getSurveyStatistics(String eventName) {
        List<EventSurveyQuestions> allSurveyQuestionsOfEvent
                = getAllSurveyQuestionsOfEvent(eventName);
        List<List<SurveyStatistics>> surveyStatistics = new ArrayList<List<SurveyStatistics>>();
        for(int i = 0; i < allSurveyQuestionsOfEvent.size(); i++) {
            EventSurveyQuestions surveyQuestion = allSurveyQuestionsOfEvent.get(i);
            surveyStatistics.add(surveyQuestionRepository
                    .getStatisticsOfSurveyQuestion(surveyQuestion.getId()));
        }
        return surveyStatistics;
    }

    public List<EventSurveyQuestions> getAllSurveyQuestionsOfEvent(String eventName) {
        Event event = eventService.getEventByName(eventName);
        return surveyQuestionRepository.findAllByEventId(event.getId());
    }

    public List<EventSurveyQuestions> findAllByEventId(Integer id) {
        return surveyQuestionRepository.findAllByEventId(id);
    }
}
