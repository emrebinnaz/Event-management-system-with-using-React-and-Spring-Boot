package com.example.EMS.event.pkclasses.ParticipantAnswersForEventQuestionsPK;

import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.person.entity.Participant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
public class ParticipantAnswersForEventQuestionsPK implements Serializable {

    private EventQuestions questions;
    private Participant participant;

    public ParticipantAnswersForEventQuestionsPK(EventQuestions questions,
                                                 Participant participant) {
        this.questions = questions;
        this.participant = participant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ParticipantAnswersForEventQuestionsPK that =
                (ParticipantAnswersForEventQuestionsPK) o;
        return Objects.equals(questions, that.questions) &&
                Objects.equals(participant, that.participant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.questions, this.participant);
    }
}
