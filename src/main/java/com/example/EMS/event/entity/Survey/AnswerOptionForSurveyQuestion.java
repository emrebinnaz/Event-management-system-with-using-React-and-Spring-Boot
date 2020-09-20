package com.example.EMS.event.entity.Survey;

import com.example.EMS.common.entity.IdBaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "SURVEY_ANSWER_OPTION_SEQ")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AnswerOptionForSurveyQuestion extends IdBaseEntity {

    @Column(nullable = false, name = "ANSWER_OPTION")
    private String answerOption;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "survey_question_id")
    private EventSurveyQuestions surveyQuestion;

    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof AnswerOptionForSurveyQuestion)) {
            return false;
        }
        AnswerOptionForSurveyQuestion answerOption = (AnswerOptionForSurveyQuestion) obj;
        return getAnswerOption().equals(answerOption.getAnswerOption());
    }

}
