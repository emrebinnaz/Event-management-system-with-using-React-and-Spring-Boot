package com.example.EMS.event.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyAnswerDTO;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.Survey.EventSurveyAnswers;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.event.mapper.EventSurveyAnswersMapper;
import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.event.service.EventSurveyAnswerService;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.mapper.ParticipantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
public class EventSurveyAnswersController {
    private final EventSurveyAnswersMapper surveyAnswersMapper;
    private final EventSurveyAnswerService surveyAnswerService;
    private final EventMapper eventMapper;

    @PostMapping("/sendSurveyAnswersOf/{eventName}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public MessageResponse addAnswersToSurveyQuestions(@PathVariable String eventName,
            @RequestBody @Valid List<EventSurveyAnswerDTO> surveyAnswersDTOList) {
        List<EventSurveyAnswers> surveyAnswers =
                surveyAnswersMapper.mapToEntity(surveyAnswersDTOList);
        return surveyAnswerService.addAnswersToSurveyQuestions(surveyAnswers,eventName);

    }

    @PostMapping("/isAnsweredToSurveyBefore/{participantUsername}")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public boolean isAnsweredBeforeToSurveyQuestions(@PathVariable String participantUsername,
                                                     @RequestBody @Valid EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        return surveyAnswerService.isAnsweredBeforeToSurveyQuestions(participantUsername,event);
    }
}
