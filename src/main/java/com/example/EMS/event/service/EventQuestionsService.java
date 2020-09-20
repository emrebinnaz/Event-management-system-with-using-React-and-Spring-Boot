package com.example.EMS.event.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.dto.EventQuestionsDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.event.repository.EventQuestionsRepository;
import com.example.EMS.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.SUCCESS;
import static com.example.EMS.common.enums.MessageType.ERROR;

@Service
@RequiredArgsConstructor
public class EventQuestionsService {

    private final EventQuestionsRepository eventQuestionsRepository;
    private final EventService eventService;
    public MessageResponse addQuestionsToEvent(String eventName, List<EventQuestions> eventQuestions) {
        Event event = eventService.getEventByName(eventName);

        if(event == null){
            return new MessageResponse("Soru ekleme başarısız", ERROR);
        }
        else{
            event.setEventQuestions(eventQuestions.stream().collect(Collectors.toSet()));
            eventService.save(event);
            return new MessageResponse("Soru ekleme başarılı", SUCCESS);
        }
    }
    public List<EventQuestions> getAllQuestionsOfEvent(String eventName) {
        Event event = eventService.getEventByName(eventName);
        return eventQuestionsRepository.findAllByEventId(event.getId());

    }

    public void save(EventQuestions eventQuestion) {
        eventQuestionsRepository.save(eventQuestion);
    }
}
