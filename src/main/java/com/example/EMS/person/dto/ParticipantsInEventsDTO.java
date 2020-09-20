package com.example.EMS.person.dto;


import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public class ParticipantsInEventsDTO {

    @JsonProperty("event")
    public final EventDTO event;

    @JsonProperty("participant")
    public final ParticipantDTO participant;

    @JsonCreator
    public ParticipantsInEventsDTO(@JsonProperty("event") EventDTO event,
                                   @JsonProperty("participant") ParticipantDTO participant) {
        this.event = event;
        this.participant = participant;
    }
}
