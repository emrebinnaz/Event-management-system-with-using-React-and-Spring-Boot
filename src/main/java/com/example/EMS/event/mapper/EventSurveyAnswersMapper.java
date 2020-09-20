package com.example.EMS.event.mapper;

import com.example.EMS.event.dto.SurveyDTO.EventSurveyAnswerDTO;
import com.example.EMS.event.entity.Survey.EventSurveyAnswers;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.person.mapper.ParticipantMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring",uses = {EventSurveyQuestionMapper.class,
        ParticipantMapper.class})

public interface EventSurveyAnswersMapper {

    @Mapping(source = "participant", target = "participant")
    @Mapping(source = "eventSurveyQuestions", target = "eventSurveyQuestion")
    EventSurveyAnswerDTO mapToDto(EventSurveyAnswers surveyAnswer);

    @Mapping(source = "participant", target = "participant")
    @Mapping(source = "eventSurveyQuestion", target = "eventSurveyQuestions")
    EventSurveyAnswers mapToEntity(EventSurveyAnswerDTO surveyAnswerDTO);

    List<EventSurveyAnswerDTO> mapToDto(List<EventSurveyAnswers> surveyAnswerList);

    List<EventSurveyAnswers> mapToEntity(List<EventSurveyAnswerDTO> surveyAnswerDTOList);
}
