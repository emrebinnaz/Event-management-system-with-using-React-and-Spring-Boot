package com.example.EMS.event.pkclasses;


import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.person.entity.Participant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter

public class EventSurveyAnswersPK implements Serializable {


    private EventSurveyQuestions eventSurveyQuestions;
    private Participant participant;

    public EventSurveyAnswersPK(EventSurveyQuestions eventSurveyQuestions,
                                Participant participant) {
        this.eventSurveyQuestions = eventSurveyQuestions;
        this.participant = participant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        EventSurveyAnswersPK that = (EventSurveyAnswersPK) o;
        return Objects.equals(eventSurveyQuestions, that.eventSurveyQuestions) &&
                Objects.equals(participant, that.participant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.eventSurveyQuestions, this.participant);
    }
}
