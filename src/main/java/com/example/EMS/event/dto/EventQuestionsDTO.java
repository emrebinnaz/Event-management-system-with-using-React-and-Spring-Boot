package com.example.EMS.event.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.*;
import javax.validation.constraints.NotBlank;

@Builder
@ToString
public class EventQuestionsDTO {


    @JsonProperty("questionType")
    @NotBlank(message ="Soru tipi boş olmamalı")
    public final String questionType;

    @JsonProperty("isQuestionRequired")
    public final boolean questionRequired;

    @JsonProperty("question")
    @NotBlank(message ="Soru boş olmamalı")
    public final String question;

    @JsonProperty("expectedMaxValueAnswerOfQuestion")
    public final String expectedMaxValueAnswerOfQuestion;

    @JsonProperty("expectedMinValueAnswerOfQuestion")
    public final String expectedMinValueAnswerOfQuestion;

    @JsonProperty()
    public final EventDTO eventDTO;

    @JsonCreator
    public EventQuestionsDTO(@JsonProperty("questionType")String questionType,
                             @JsonProperty("isQuestionRequired")boolean questionRequired,
                             @JsonProperty("question")String question,
                             @JsonProperty("expectedMaxValueAnswerOfQuestion")String expectedMaxValueAnswerOfQuestion,
                             @JsonProperty("expectedMinValueAnswerOfQuestion") String expectedMinValueAnswerOfQuestion,
                             @JsonProperty("eventDTO")EventDTO eventDTO) {

        this.questionType = questionType;
        this.questionRequired = questionRequired;
        this.question = question;
        this.expectedMaxValueAnswerOfQuestion = expectedMaxValueAnswerOfQuestion;
        this.expectedMinValueAnswerOfQuestion = expectedMinValueAnswerOfQuestion;
        this.eventDTO = eventDTO;
    }

}
