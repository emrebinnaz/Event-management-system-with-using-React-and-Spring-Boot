package com.example.EMS.person.repository;

import com.example.EMS.person.entity.ParticipantQuestionsAboutEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantQuestionsRepository extends JpaRepository<ParticipantQuestionsAboutEvent,
        Integer> {

    List<ParticipantQuestionsAboutEvent> findAllByEventId(Integer id);

    ParticipantQuestionsAboutEvent findByEventIdAndParticipantIdAndQuestion(Integer eventId,
                                                                            Integer participantId,
                                                                            String question);
}
