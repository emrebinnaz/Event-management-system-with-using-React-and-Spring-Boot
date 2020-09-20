package com.example.EMS.person.entity;

import com.example.EMS.common.entity.Person;
import com.example.EMS.event.entity.Event;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "Lecturer_Seq",allocationSize = 1)
@AllArgsConstructor
@NoArgsConstructor
public class Lecturer extends Person {

    @JsonIgnore
    @OneToMany(mappedBy = "lecturer")
    private Set<Event> events;

    @JsonIgnore
    @OneToMany(mappedBy = "lecturer")
    private Set<ParticipantQuestionsAboutEvent> participantQuestions;

    public Lecturer(Integer id,final String name, final String surname,
                       final String tcKimlikNo, final String username,
                       final String password, final String phone,
                       final String email, final LocalDate birthDate,
                      final Set<Event> events) {
        super(id, name, surname, tcKimlikNo, username, password, phone, email, birthDate);
        this.events = events;
    }
}
