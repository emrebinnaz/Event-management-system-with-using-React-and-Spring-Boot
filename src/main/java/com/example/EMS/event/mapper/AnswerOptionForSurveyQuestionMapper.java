package com.example.EMS.event.mapper;


import com.example.EMS.event.dto.SurveyDTO.AnswerOptionForSurveyQuestionDTO;
import com.example.EMS.event.entity.Survey.AnswerOptionForSurveyQuestion;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerOptionForSurveyQuestionMapper {

    AnswerOptionForSurveyQuestionDTO mapToDto(AnswerOptionForSurveyQuestion answerOption);

    AnswerOptionForSurveyQuestion mapToEntity(AnswerOptionForSurveyQuestionDTO answerOptionDTO);

    List<AnswerOptionForSurveyQuestionDTO> mapToDto(List<AnswerOptionForSurveyQuestion> answerOptionList);

    List<AnswerOptionForSurveyQuestion> mapToEntity(List<AnswerOptionForSurveyQuestionDTO> answerOptionDTOList);
}
