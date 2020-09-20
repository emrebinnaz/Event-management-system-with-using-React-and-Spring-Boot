package com.example.EMS.event.dto.SurveyDTO;

import com.example.EMS.person.dto.ParticipantDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Builder
@ToString
public class EventSurveyAnswerDTO {
    @JsonProperty("answer")
    @NotBlank(message ="Cevap boş olmamalı")
    public final String answer;

    @JsonProperty("participant")
    public final ParticipantDTO participant;

    @JsonProperty("eventSurveyQuestion")
    public final EventSurveyQuestionDTO eventSurveyQuestion;

    @JsonCreator()
    public EventSurveyAnswerDTO(@JsonProperty("answer") String answer,
                                @JsonProperty("participant") ParticipantDTO participant,
                                @JsonProperty("eventSurveyQuestion") EventSurveyQuestionDTO eventSurveyQuestion) {
        this.answer = answer;
        this.participant = participant;
        this.eventSurveyQuestion = eventSurveyQuestion;
    }
}
