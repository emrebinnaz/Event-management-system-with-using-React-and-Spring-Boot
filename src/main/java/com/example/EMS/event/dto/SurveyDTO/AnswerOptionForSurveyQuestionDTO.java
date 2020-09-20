package com.example.EMS.event.dto.SurveyDTO;

import com.example.EMS.event.dto.EventDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import javax.validation.constraints.NotBlank;

@Builder
public class AnswerOptionForSurveyQuestionDTO {

    @JsonProperty("answerOption")
    @NotBlank(message = "Cevap seçeneği kısmı boş olmamalı")
    public final String answerOption;

    @JsonCreator
    public AnswerOptionForSurveyQuestionDTO(@JsonProperty("answerOption") String answerOption) {
        this.answerOption = answerOption;
    }
}