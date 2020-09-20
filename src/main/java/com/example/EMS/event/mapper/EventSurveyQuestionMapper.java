package com.example.EMS.event.mapper;

import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AnswerOptionForSurveyQuestionMapper.class,
                        EventSurveyAnswersMapper.class})
public interface EventSurveyQuestionMapper {

    @Mapping(source ="answerOptions", target = "answerOptions")
    EventSurveyQuestionDTO mapToDto( EventSurveyQuestions eventSurveyQuestion);

    @Mapping(source ="answerOptions", target = "answerOptions")
    EventSurveyQuestions mapToEntity(EventSurveyQuestionDTO eventSurveyQuestionDTO);

    List<EventSurveyQuestionDTO> mapToDto(List<EventSurveyQuestions> eventSurveyQuestionList);

    List<EventSurveyQuestions> mapToEntity(List<EventSurveyQuestionDTO> eventSurveyQuestionDTOList);
}
