package com.example.EMS.person.dto;


import com.example.EMS.event.dto.EventDTO;
import com.example.EMS.question.dto.QuestionDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Builder;

@Getter
public class ParticipantQuestionsAboutEventDTO extends QuestionDTO {

    @JsonProperty("event")
    public final EventDTO event;

    @JsonProperty("participant")
    public final ParticipantDTO participant;

    @JsonProperty("answer")
    public final String answer;

    @JsonCreator
    @Builder
    public ParticipantQuestionsAboutEventDTO(@JsonProperty("event") EventDTO event,
                                             @JsonProperty("participant") ParticipantDTO participant,
                                             @JsonProperty("answer") String answer,
                                             @JsonProperty("question") String question) {
        super(question);
        this.event = event;
        this.participant = participant;
        this.answer = answer;
    }
}
