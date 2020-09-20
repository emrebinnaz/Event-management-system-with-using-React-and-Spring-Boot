package com.example.EMS.event.repository;

import com.example.EMS.event.entity.Survey.EventSurveyAnswers;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.person.entity.Participant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSurveyAnswerRepository extends JpaRepository
        <EventSurveyAnswers, Integer> {


    @Modifying
    @Query(value = "INSERT INTO event_survey_answers (answer, participant_id, survey_question_id) " +
            "VALUES (:answer,:participant_id,:survey_question_id)", nativeQuery = true)
    void save(@Param("answer") String answer,
                          @Param("participant_id")Integer participant_id,
                          @Param("survey_question_id") Integer survey_question_id);


    @Query(
            value = "SELECT case when count(esa) > 0 then true else false end " +
                    "FROM event_survey_answers esa " +
                    "WHERE esa.survey_question_id = :survey_question_id " +
                    "and" +
                    " esa.participant_id = :participant_id",
            nativeQuery = true)

    boolean isAnsweredBeforeToSurveyQuestions(@Param("survey_question_id") int survey_question_id,
                                              @Param("participant_id")int  participant_id);
}
