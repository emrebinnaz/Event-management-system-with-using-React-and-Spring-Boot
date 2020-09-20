package com.example.EMS.person.service;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.event.entity.Event;
import com.example.EMS.event.entity.EventQuestions;
import com.example.EMS.event.service.EventQuestionsService;
import com.example.EMS.event.service.EventService;
import com.example.EMS.person.entity.Participant;
import com.example.EMS.person.entity.ParticipantAnswersForEventQuestions;
import com.example.EMS.person.repository.ParticipantAnswersForEventQuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.EMS.common.enums.MessageType.SUCCESS;
import static com.example.EMS.common.enums.MessageType.ERROR;

@Service
@RequiredArgsConstructor
public class ParticipantAnswersForEventQuestionsService {

    private final EventQuestionsService eventQuestionService;
    private final ParticipantService participantService;
    private ParticipantAnswersForEventQuestions participantAnswerForEventQuestion;
    private final ParticipantAnswersForEventQuestionsRepository answerRepository;

    @Transactional
    public MessageResponse answerTheQuestionsOfEvent(String eventName,String username,
                                                     List<String> answers) {
        List<EventQuestions> eventQuestions = eventQuestionService.getAllQuestionsOfEvent(eventName);
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        if(optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            for (int i = 0; i < answers.size() ; i++ ) {
                createParticipantAnswer(answers.get(i),eventQuestions.get(i),participant);
                saveAnswerToEventQuestion(eventQuestions.get(i));
                saveAnswerToParticipant(participant);
            }
            return new MessageResponse("Sorular cevaplandı", SUCCESS);
        }
        return new MessageResponse("Sorular cevaplanamadı", ERROR);
    }


    private void createParticipantAnswer(String answer,EventQuestions eventQuestion,Participant participant){
        participantAnswerForEventQuestion =
                new ParticipantAnswersForEventQuestions(answer,
                        participant,
                        eventQuestion);
    }
    private void saveAnswerToEventQuestion(EventQuestions eventQuestion) {
        Set<ParticipantAnswersForEventQuestions> participantAnswers =
                eventQuestion.getParticipantAnswers();
        participantAnswers.add(participantAnswerForEventQuestion);
        eventQuestion.setParticipantAnswers(participantAnswers);
        eventQuestionService.save(eventQuestion);

    }

    private void saveAnswerToParticipant(Participant participant) {
        Set<ParticipantAnswersForEventQuestions> participantAnswers = participant.getParticipantAnswers();
        participantAnswers.add(participantAnswerForEventQuestion);
        participant.setParticipantAnswers(participantAnswers);
        participantService.save(participant);
    }

    public List<String> getParticipantAnswers(String eventName, String username) {
        List<String> answers = new ArrayList<String>();
        Optional<Participant> optionalParticipant = participantService.findByUsername(username);
        List<EventQuestions> allQuestionsOfEvent = eventQuestionService.getAllQuestionsOfEvent(eventName);
        if (optionalParticipant.isPresent()) {
            Participant participant = optionalParticipant.get();
            answers = addParticipantAnswerToEachQuestion(participant,allQuestionsOfEvent);
        }
        return answers;
    }

    private List<String> addParticipantAnswerToEachQuestion(Participant participant,
                                                     List<EventQuestions> allQuestionsOfEvent) {
        List<String> answers = new ArrayList<String>();
        for (int i = 0; i < allQuestionsOfEvent.size(); i++) {
            EventQuestions eventQuestion = allQuestionsOfEvent.get(i);
                Set<ParticipantAnswersForEventQuestions> allParticipantAnswersForOneQuestion =
                        eventQuestion.getParticipantAnswers();
                List<ParticipantAnswersForEventQuestions> participantAnswers =
                    getAnswersOfRelatedParticipant(participant,allParticipantAnswersForOneQuestion);
                participantAnswers.forEach(answer -> answers.add(answer.getAnswer()));
        }
        return answers;
    }

    private List<ParticipantAnswersForEventQuestions> getAnswersOfRelatedParticipant(Participant participant,
                      Set<ParticipantAnswersForEventQuestions> allParticipantAnswersForOneQuestion) {
        return allParticipantAnswersForOneQuestion
                .stream()
                .filter(answer -> (answer.getParticipant().getId() == participant.getId()))
                .collect(Collectors.toList());
    }

}
