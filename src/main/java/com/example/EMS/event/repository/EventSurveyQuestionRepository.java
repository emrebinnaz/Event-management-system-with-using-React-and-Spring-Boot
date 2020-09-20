package com.example.EMS.event.repository;

import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.event.entity.Survey.EventSurveyQuestions;
import com.example.EMS.event.entity.Survey.SurveyStatistics;
import com.example.EMS.person.entity.ParticipationCountInADay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventSurveyQuestionRepository extends JpaRepository<EventSurveyQuestions,Integer> {

    @Query(
            value = "SELECT * FROM event_survey_questions esq WHERE esq.event_id = :event_id",
            nativeQuery = true)
    List<EventSurveyQuestions> findAllByEventId(@Param("event_id") int event_id);


    @Query(value = "SELECT esa.answer AS answer, COUNT(esa.*) AS numberOfAnswersToSurveyQuestion, " +
            "esq.question AS question "+
            "FROM event_survey_answers AS esa " +
            "INNER JOIN event_survey_questions as esq on esq.id = esa.survey_question_id " +
            "WHERE esa.survey_question_id = :survey_question_id " +
            "GROUP BY esa.answer,esq.question ", nativeQuery = true)
    List<SurveyStatistics> getStatisticsOfSurveyQuestion(@Param("survey_question_id") Integer survey_question_id);


}
