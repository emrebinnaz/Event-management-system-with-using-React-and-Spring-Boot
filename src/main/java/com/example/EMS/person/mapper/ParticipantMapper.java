package com.example.EMS.person.mapper;


import com.example.EMS.event.mapper.EventSurveyQuestionMapper;
import com.example.EMS.person.dto.LecturerDTO;
import com.example.EMS.person.dto.ParticipantDTO;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Participant;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring",uses ={ParticipantsInEventsMapper.class,
        EventSurveyQuestionMapper.class})
public interface ParticipantMapper {
    ParticipantDTO mapToDto(Participant participant);

    Participant mapToEntity(ParticipantDTO participantDTO);

    List<ParticipantDTO> mapToDto(List<Participant> participantList);

    List<Participant> mapToEntity(List<ParticipantDTO> participantDTOList);
}
