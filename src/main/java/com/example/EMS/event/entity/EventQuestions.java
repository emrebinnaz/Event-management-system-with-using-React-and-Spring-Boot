package com.example.EMS.event.entity;

import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.ParticipantAnswersForEventQuestions;
import com.example.EMS.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_QUESTION_SEQ")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EventQuestions extends Question{

    @Column(name = "TYPE",nullable = false)
    private String questionType;

    @Column(name = "IS_QUESTION_REQUIRED")
    private boolean questionRequired;

    @Column(name = "MAX_VALUE")
    private String expectedMaxValueAnswerOfQuestion;

    @Column(name = "MIN_VALUE")
    private String expectedMinValueAnswerOfQuestion;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "event_id")
    private Event Event;

    @OneToMany(mappedBy = "questions",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParticipantAnswersForEventQuestions> participantAnswers;

    public EventQuestions(Integer id,String question,
                          String questionType,boolean questionRequired,
                          String expectedMaxValueAnswerOfQuestion,
                          String expectedMinValueAnswerOfQuestion) {
        super(id,question);
        this.questionType = questionType;
        this.questionRequired = questionRequired;
        this.expectedMaxValueAnswerOfQuestion = expectedMaxValueAnswerOfQuestion;
        this.expectedMinValueAnswerOfQuestion = expectedMinValueAnswerOfQuestion;
    }

    public boolean isQuestionRequired() {
        return questionRequired;
    }

    public void setQuestionRequired(boolean isQuestionRequired) {
        this.questionRequired = isQuestionRequired;
    }

    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof EventQuestions)) {
            return false;
        }
        EventQuestions question = (EventQuestions) obj;
        return questionType.equals(question.questionType) &&
                expectedMaxValueAnswerOfQuestion.equals(question.expectedMaxValueAnswerOfQuestion) &&
                expectedMinValueAnswerOfQuestion.equals(question.expectedMinValueAnswerOfQuestion) &&
                questionRequired == question.questionRequired &&
                getQuestion().equals(question.getQuestion()) ;

    }
}

