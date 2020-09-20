package com.example.EMS.person.mapper;

import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.dto.LecturerDTO;
import com.example.EMS.person.entity.Lecturer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LecturerMapper {

    LecturerDTO mapToDto(Lecturer lecturer);

    Lecturer mapToEntity(LecturerDTO lecturerDTO);

    List<LecturerDTO> mapToDto(List<Lecturer> lecturerList);

    List<Lecturer> mapToEntity(List<LecturerDTO> lecturerDTOList);


}
