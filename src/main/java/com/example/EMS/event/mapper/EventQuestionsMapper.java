package com.example.EMS.event.mapper;

import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.dto.EventQuestionsDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.EventQuestions;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventQuestionsMapper {
    EventQuestionsDTO mapToDto(EventQuestions eventQuestion);

    EventQuestions mapToEntity( EventQuestionsDTO eventQuestionDTO);

    List<EventQuestionsDTO> mapToDto(List<EventQuestions> eventQuestionList);

    List<EventQuestions> mapToEntity(List< EventQuestionsDTO> eventQuestionDTOList);
}
