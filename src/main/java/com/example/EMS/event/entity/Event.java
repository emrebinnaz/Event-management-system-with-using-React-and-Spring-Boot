package com.example.EMS.event.entity;

import com.example.EMS.common.entity.IdBaseEntity;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.person.entity.Lecturer;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "EVENT_SEQ")
@ToString
public class Event extends IdBaseEntity {
    @Column(name = "NAME", unique = true)
    private String name;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "QUOTA")
    private int quota;

    @Column(name = "LONGITUDE")
    private double longitude;

    @Column(name = "LATITUDE")
    private double latitude;

    @Column(name = "CURRENT_NUMBER_OF_PEOPLE")
    private int currentNumberOfPeople;

    @Column(name = "RAFFLE_WINNER_USERNAME")
    private String raffleWinnerUsername;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "organizator_id")
    private Organizator organizator;


    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "lecturer_id")
    private Lecturer lecturer;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "EVENT_ID")
    private Set<EventQuestions> eventQuestions;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "EVENT_ID")
    private Set<ParticipantQuestionsAboutEvent> participantQuestions;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "EVENT_ID")
    private Set<EventSurveyQuestions> eventSurveyQuestions;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ParticipantsInEvents> participantsInEvents;

    public Event(final Integer id,final String name, final LocalDate startDate, final LocalDate endDate, final String address,
                 final int quota, final double longitude,
                 final double latitude,
                 final Organizator organizator,
                 final Set<EventQuestions> eventQuestions,
                 final Set<ParticipantsInEvents> participantsInEvents,
                 final Set<EventSurveyQuestions> eventSurveyQuestions) {
        super(id);
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.address = address;
        this.quota = quota;
        this.longitude = longitude;
        this.latitude = latitude;
        this.currentNumberOfPeople = 0;
        this.raffleWinnerUsername = "";
        this.organizator = organizator;
        this.eventQuestions = eventQuestions;
        this.participantsInEvents = participantsInEvents;
        this.eventSurveyQuestions = eventSurveyQuestions;
    }
}
