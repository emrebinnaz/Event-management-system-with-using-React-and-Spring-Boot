package com.example.EMS.person.mapper;


import com.example.EMS.person.dto.LecturerDTO;
import com.example.EMS.person.dto.ParticipantAnswersForEventQuestionsDTO;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.ParticipantAnswersForEventQuestions;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantAnswersForEventQuestionsMapper {
    ParticipantAnswersForEventQuestionsDTO mapToDto(ParticipantAnswersForEventQuestions answers);

    ParticipantAnswersForEventQuestions mapToEntity(ParticipantAnswersForEventQuestionsDTO answersDTO);

    List<ParticipantAnswersForEventQuestionsDTO> mapToDto(List<ParticipantAnswersForEventQuestions> answerList);

    List<ParticipantAnswersForEventQuestions> mapToEntity(List<ParticipantAnswersForEventQuestionsDTO> answerDTOList);
}
