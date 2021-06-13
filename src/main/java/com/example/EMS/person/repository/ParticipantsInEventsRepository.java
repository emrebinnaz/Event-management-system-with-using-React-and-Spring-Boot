package com.example.EMS.person.repository;
import  com.example.EMS.person.entity.pkclasses.ParticipantsInEventsPK;
import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.example.EMS.person.entity.ParticipationCountInADay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;
@Repository
public interface ParticipantsInEventsRepository
        extends JpaRepository<ParticipantsInEvents,Integer> {

    @Query(
            value = "SELECT case when count(pie) > 0 then true else false end " +
                    "FROM participants_in_events pie " +
                    "WHERE pie.event_id = :event_id " +
                    "and" +
                    " pie.participant_id = :participant_id",
            nativeQuery = true)
            boolean isExistsParticipationWith(@Param("event_id") Integer event_id,
                                              @Param("participant_id")Integer participant_id);


    @Query(value = "SELECT pie.partition_date AS partitionDate, COUNT(pie.*) AS partitionCount " +
            "FROM participants_in_events AS pie " +
            "WHERE pie.event_id = :event_id" +
            " GROUP BY pie.partition_date", nativeQuery = true)
    List<ParticipationCountInADay> countOfTotalParticipantsInDays(@Param("event_id") Integer event_id);

    @Query(
            value = "SELECT * " +
                    "FROM participants_in_events " +
                    "WHERE event_id = :event_id " +
                    "and" +
                    " participant_id = :participant_id",
            nativeQuery = true)
    ParticipantsInEvents getParticipantInEvent(@Param("event_id") Integer event_id,
                          @Param("participant_id")Integer participant_id);

}
