package com.example.EMS.person.entity;

import com.example.EMS.common.entity.Person;
import com.example.EMS.event.entity.Event;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "ORGANIZATOR_SEQ",allocationSize = 1)
@AllArgsConstructor
@NoArgsConstructor
public class Organizator extends Person {
    @Column(name = "IS_ONLINE")
    private boolean isOnline;

    @JsonIgnore
    @OneToMany(mappedBy = "organizator")
    private Set<Event> events;


    public Organizator(Integer id,final String name, final String surname,
                       final String tcKimlikNo, final String username,
                       final String password, final String phone,
                       final String email, final LocalDate birthDate,
                       final boolean isOnline, final Set<Event> events) {
        super(id,name,surname,tcKimlikNo,username,password,phone,email,birthDate);
        this.isOnline = isOnline;
        this.events = events;
    }
}
