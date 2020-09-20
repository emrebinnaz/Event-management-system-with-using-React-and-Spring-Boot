package com.example.EMS.event.entity.Survey;

import com.example.EMS.event.entity.Event;
import com.example.EMS.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SURVEY_SEQ")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EventSurveyQuestions extends Question {

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "event_id")
    private Event Event;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "SURVEY_QUESTION_ID")
    private Set<AnswerOptionForSurveyQuestion> answerOptions;


    @OneToMany(mappedBy = "eventSurveyQuestions",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EventSurveyAnswers> eventSurveyAnswers;

    public EventSurveyQuestions(Integer id, String question,
                                Event event,Set<AnswerOptionForSurveyQuestion> answerOptions) {
        super(id, question);
        this.Event = event;
        this.answerOptions = answerOptions;
    }

    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof EventSurveyQuestions)) {
            return false;
        }
        EventSurveyQuestions question = (EventSurveyQuestions) obj;
        return getQuestion().equals(question.getQuestion()) &&
                getAnswerOptions().equals(question.getAnswerOptions());

    }
}
