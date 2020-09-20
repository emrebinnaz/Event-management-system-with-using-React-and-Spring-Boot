package com.example.EMS.person.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.QRGenBarcodeGenerator;
import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.repository.ParticipantRepository;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.util.ByteArrayDataSource;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ParticipantService {
    private final ParticipantRepository participantRepository;
    private final EventService eventService;
    public Optional<Participant> findByUsername(String username){
        return participantRepository.findByUsername(username);
    }

    public void save(Participant participant) {
        System.out.println(participant.getEmail() + participant.getEventSurveyAnswers());
        participantRepository.save(participant);
    }

    public List<Event> getEventsOfParticipant(Participant participant) {
        List<Event> events = new ArrayList<>() ;
       List<ParticipantsInEvents> participations = getParticipationsOf(participant);
       for(ParticipantsInEvents participation :  participations) {
           events.add(participation.getEvent());
       }
        return events;
    }

    private List<ParticipantsInEvents> getParticipationsOf(Participant participant){
        return participant.getParticipantsInEvents()
                .stream()
                .collect(Collectors.toList());
    }

    public String sendQrCodeAsInnerHTMLAfterParticipation(Participant participant,
                                                            Event event) throws IOException, WriterException {
        String url = "http://localhost:3000/" + participant.getUsername() +
                "/and/" +  event.getName() + "/information";
        byte[] qrCodeImage = QRGenBarcodeGenerator.getQRCodeImage(url, 250, 250);
        return new String(Base64.getEncoder().encode(qrCodeImage));
    }

    public boolean isAnyParticipantHasSamePhoneWith(String phone) {
        Optional<Participant> optionalParticipant = participantRepository.findByPhone(phone);
        return optionalParticipant.isPresent();
    }
    public boolean isAnyParticipantHasSameEmailWith(String email) {
        Optional<Participant> optionalParticipant = participantRepository.findByEmail(email);
        return optionalParticipant.isPresent();
    }
}
