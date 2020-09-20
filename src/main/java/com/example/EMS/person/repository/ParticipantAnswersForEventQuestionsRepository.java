package com.example.EMS.person.repository;

import com.example.EMS.person.entity.ParticipantAnswersForEventQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParticipantAnswersForEventQuestionsRepository extends
        JpaRepository<ParticipantAnswersForEventQuestions,Integer> {

}
