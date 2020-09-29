package com.example.EMS.common.Controller;

import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.common.service.EmailService;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.mapper.EventMapper;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.service.ParticipantService;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.util.ByteArrayDataSource;
import javax.validation.Valid;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sendEmail")
public class EmailController {
    private final EmailService emailService;
    private final ParticipantService participantService;
    private final EventMapper eventMapper;

    @PostMapping("/{participantUsername}")
    public void sendEmailToParticipant(@PathVariable String participantUsername,
                                        @RequestBody @Valid EventDTO eventDTO) throws Exception {
        Event event = eventMapper.mapToEntity(eventDTO);
        Optional<Participant> optionalParticipant =
                participantService.findByUsername(participantUsername);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            emailService.sendEmailWithQrCode(participant,event);
        }
    }

    @PostMapping("/toRaffleWinner/{participantUsername}")
    public void sendEmailToRaffleWinner(@PathVariable String participantUsername,
                                        @RequestBody @Valid EventDTO eventDTO) {
        Optional<Participant> optionalParticipant =
                participantService.findByUsername(participantUsername);
        Participant participant = optionalParticipant.get();
        Event event = eventMapper.mapToEntity(eventDTO);
        emailService.sendMailAboutEventRaffle(participant,event);
    }
}
