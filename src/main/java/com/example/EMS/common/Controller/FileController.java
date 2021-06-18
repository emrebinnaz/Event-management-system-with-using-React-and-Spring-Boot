package com.example.EMS.common.Controller;

import com.example.EMS.common.service.FileService;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.mapper.ParticipantsInEventsMapperImpl;
import com.example.EMS.person.service.ParticipantsInEventsService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    private final ParticipantsInEventsMapperImpl participantsInEventsMapper;
    private final ParticipantsInEventsService participantsInEventsService;


    @PostMapping("/downloadEventInformation")
    @PreAuthorize("hasAuthority('PARTICIPANT')")
    public ResponseEntity<Resource> downloadEventInformation(@RequestBody ParticipantsInEventsDTO participantInEventDTO) {

        final ParticipantsInEvents participantInEvent = participantsInEventsMapper.mapToEntity(participantInEventDTO);
        final byte [] file = participantsInEventsService.downloadPdfAboutEventInfo(participantInEvent);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + "file")
                .contentType(MediaType.APPLICATION_PDF)
                .body(new ByteArrayResource(file));
    }
}
