package com.example.EMS.question.mapper;

import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.person.dto.ParticipantQuestionsAboutEventDTO;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.mapper.ParticipantMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring",uses = {EventMapper.class, ParticipantMapper.class})
public interface ParticipantQuestionMapper {

    ParticipantQuestionsAboutEvent INSTANCE = Mappers.getMapper(ParticipantQuestionsAboutEvent.class);

    @Mapping(source = "participant", target = "participant")
    @Mapping(source = "event", target = "event")
    ParticipantQuestionsAboutEventDTO mapToDto(ParticipantQuestionsAboutEvent participantQuestions);

    @Mapping(source = "participant",target = "participant")
    @Mapping(source = "event",target = "event")
    ParticipantQuestionsAboutEvent mapToEntity( ParticipantQuestionsAboutEventDTO participantQuestionsDTO);


    List<ParticipantQuestionsAboutEventDTO> mapToDto(List<ParticipantQuestionsAboutEvent> participantQuestionsList);

    List<ParticipantQuestionsAboutEvent> mapToEntity(List<ParticipantQuestionsAboutEventDTO> participantQuestionsListDTO);
}
