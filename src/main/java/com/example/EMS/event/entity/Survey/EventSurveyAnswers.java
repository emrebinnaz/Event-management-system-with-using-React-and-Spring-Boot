package com.example.EMS.event.entity.Survey;

import com.example.EMS.event.pkclasses.EventSurveyAnswersPK;
import com.example.EMS.person.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@IdClass(EventSurveyAnswersPK.class)
@NoArgsConstructor
@AllArgsConstructor
public class EventSurveyAnswers implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "survey_question_id", referencedColumnName = "id",nullable = false)
    private EventSurveyQuestions eventSurveyQuestions;

    @Id
    @ManyToOne
    @JoinColumn(name = "participant_id", referencedColumnName = "id", nullable = false)
    private Participant participant;

    @Column(name = "ANSWER",nullable = false)
    private String answer;


}
