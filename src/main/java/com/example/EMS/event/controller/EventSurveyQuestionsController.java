package com.example.EMS.event.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.dto.EventQuestionsDTO;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.entity.Survey.SurveyStatistics;
import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.event.service.EventSurveyQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/surveyQuestionsOfEvent")
public class EventSurveyQuestionsController {

    private final EventSurveyQuestionMapper surveyQuestionMapper;
    private final EventSurveyQuestionService surveyQuestionService;

    @PostMapping("/{eventName}")
    @PreAuthorize("hasAuthority('ORGANIZATOR')")
    public MessageResponse addQuestionsToEvent(@PathVariable String eventName,
                       @RequestBody @Valid List<EventSurveyQuestionDTO> surveyQuestionDTOList) {
        List<EventSurveyQuestions> surveyQuestions =
                surveyQuestionMapper.mapToEntity(surveyQuestionDTOList);

        return surveyQuestionService.addSurveyQuestionsToEvent(eventName,surveyQuestions);

    }
    @GetMapping("/{eventName}")
    public List<EventSurveyQuestionDTO> getSurveyQuestionsOfEvent(@PathVariable String eventName) {
        List<EventSurveyQuestions> eventSurveyQuestions =
                surveyQuestionService.getAllSurveyQuestionsOfEvent(eventName);
        return surveyQuestionMapper.mapToDto(eventSurveyQuestions);
    }
    @GetMapping("/{eventName}/statistics")
    public List<List<SurveyStatistics>> getStatistics(@PathVariable String eventName) {
        return surveyQuestionService.getSurveyStatistics(eventName);
    }
}
