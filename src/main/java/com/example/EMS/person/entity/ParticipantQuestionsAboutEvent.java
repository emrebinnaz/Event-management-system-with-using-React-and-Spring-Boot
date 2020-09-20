package com.example.EMS.person.entity;

import com.example.EMS.event.entity.Event;
import com.example.EMS.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "PARTICIPANT_QUESTION_SEQ")
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantQuestionsAboutEvent extends Question {

    @Column(name = "ANSWER")
    private String answer;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturer;

    /*
    @JsonIgnore
    @ManyToOne()
    private ParticipantsInEvents participantsInEvents;
    */
    @JsonIgnore
    @ManyToOne()
    private Event event;

    @JsonIgnore
    @ManyToOne()
    private Participant participant;

    public ParticipantQuestionsAboutEvent(Integer id,String answer) {
        super(id);
        this.answer = answer;
    }
}
