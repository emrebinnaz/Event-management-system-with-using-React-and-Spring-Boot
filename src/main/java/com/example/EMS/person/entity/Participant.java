package com.example.EMS.person.entity;

import com.example.EMS.common.entity.Person;
import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.event.entity.Survey.EventSurveyAnswers;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SequenceGenerator(name = "idgen6", sequenceName = "PARTICIPANT_SEQ")
public class Participant extends Person {
    @OneToMany(mappedBy = "participant",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParticipantsInEvents> participantsInEvents;

    @OneToMany(mappedBy = "participant",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParticipantAnswersForEventQuestions> participantAnswers;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "PARTICIPANT_ID")
    private Set<EventQuestions> eventQuestions;

    @OneToMany(mappedBy = "participant",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<EventSurveyAnswers> eventSurveyAnswers;

    public Participant(Integer id,final String name, final String surname, final String tcKimlikNo, final String username, final String password, final String phone, final String email, final LocalDate birthDate) {
        super(id,name,surname,tcKimlikNo,username,password,phone,email,birthDate);
    }
}
