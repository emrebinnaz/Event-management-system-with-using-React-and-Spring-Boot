package com.example.EMS.question.dto;


import com.example.EMS.event.dto.EventDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
public class QuestionDTO {

    @JsonProperty("question")
    public final String question;

    @JsonCreator
    public QuestionDTO(@JsonProperty("question") String question) {
        this.question = question;
    }



}
