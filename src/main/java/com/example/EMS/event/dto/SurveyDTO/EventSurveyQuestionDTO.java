package com.example.EMS.event.dto.SurveyDTO;

import com.example.EMS.question.dto.QuestionDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import java.util.*;
@Getter
public class EventSurveyQuestionDTO extends QuestionDTO {

    @JsonProperty("answerOptions")
    public final Set<AnswerOptionForSurveyQuestionDTO> answerOptions;

    @JsonCreator
    @Builder
    public EventSurveyQuestionDTO(@JsonProperty("question") String question,
                                  @JsonProperty("answerOptions") Set<AnswerOptionForSurveyQuestionDTO> answerOptions) {
        super(question);
        this.answerOptions = answerOptions;
    }
}