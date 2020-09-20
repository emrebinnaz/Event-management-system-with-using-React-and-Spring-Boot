package com.example.EMS.person.dto;


import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.event.dto.EventQuestionsDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Builder
@ToString
public class ParticipantAnswersForEventQuestionsDTO {
    @JsonProperty("answer")
    @NotBlank(message ="Cevap boş olmamalı")
    public final String answer;

    @JsonProperty()
    public final ParticipantDTO participantDTO;

    @JsonProperty()
    public final EventQuestionsDTO eventQuestionsDTO;

    @JsonCreator()
    public ParticipantAnswersForEventQuestionsDTO(@JsonProperty("answer") String answer,
                                                  @JsonProperty() ParticipantDTO participantDTO,
                                                  @JsonProperty() EventQuestionsDTO eventQuestionsDTO){
        this.answer = answer;
        this.participantDTO = participantDTO;
        this.eventQuestionsDTO = eventQuestionsDTO;
    }
}
