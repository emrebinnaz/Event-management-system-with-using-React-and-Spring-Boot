package com.example.EMS.event.mapper;

import java.util.*;

import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.person.mapper.ParticipantsInEventsMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",uses = {ParticipantsInEventsMapper.class,
        EventQuestionsMapper.class, EventSurveyQuestionMapper.class})
public interface EventMapper {

    @Mapping(source = "eventQuestions", target = "eventQuestions")
    @Mapping(source = "eventSurveyQuestions", target = "eventSurveyQuestions")
    EventDTO mapToDto(Event event);

    @Mapping(source = "eventQuestions", target = "eventQuestions")
    @Mapping(source = "eventSurveyQuestions", target = "eventSurveyQuestions")
    Event mapToEntity(EventDTO eventDTO);

    List<EventDTO> mapToDto(List<Event> eventList);

    List<Event> mapToEntity(List<EventDTO> eventDTOList);

}
