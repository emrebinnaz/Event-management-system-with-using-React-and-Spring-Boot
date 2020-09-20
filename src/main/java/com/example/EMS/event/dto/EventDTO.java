package com.example.EMS.event.dto;
import com.example.EMS.event.dto.SurveyDTO.EventSurveyQuestionDTO;
import com.example.EMS.person.dto.ParticipantsInEventsDTO;
import com.example.EMS.person.entity.Organizator;
import com.example.EMS.person.entity.ParticipantsInEvents;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.EMS.event.entity.EventQuestions;
import lombok.Builder;


import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;
import java.util.List;
import java.util.HashSet;
@Builder
public class EventDTO {
    @JsonProperty("name")
    @Size(max = 255, message = "İsim 255 karakterden fazla olamaz")
    @NotBlank(message ="Etkinlik ismi boş olmamalı.")
    public final String name;

    @JsonProperty("startDate")
    public final LocalDate startDate;

    @JsonProperty("endDate")
    public final LocalDate endDate;

    @JsonProperty("address")
    @NotBlank(message ="Adres boş olmamalı")
    public final String address;

    @JsonProperty("quota")
    @Min(value = 1, message = "Etkinlik en az 1 kişi için oluşturulmalı")
    public final int quota;

    @JsonProperty("longitude")
    @NotNull
    public final double longitude;

    @JsonProperty("latitude")
    @NotNull
    public final double latitude;

    @JsonProperty("currentNumberOfPeople")
    @Min(value = 0)
    public final int currentNumberOfPeople;

    @JsonProperty("raffleWinnerUsername")
    public final String raffleWinnerUsername;

    @JsonProperty("organizator")
    public final int organizatorId;

    @JsonProperty("lecturer")
    public final String lecturerUsername;

    @JsonProperty("eventQuestions")
    public final Set<EventQuestionsDTO> eventQuestions;

    @JsonProperty("participantsInEvents")
    public final Set<ParticipantsInEventsDTO> participantsInEventsDTO;

    @JsonProperty("eventSurveyQuestions")
    public final Set<EventSurveyQuestionDTO> eventSurveyQuestions;


    @JsonCreator
    public EventDTO(@JsonProperty("name") String name,
                    @JsonProperty("startDate") LocalDate startDate,
                    @JsonProperty("endDate") LocalDate endDate,
                    @JsonProperty("address") String address,
                    @JsonProperty("quota") int quota,
                    @JsonProperty("longitude")  double longitude,
                    @JsonProperty("latitude")  double latitude,
                    @JsonProperty("currentNumberOfPeople")  int currentNumberOfPeople,
                    @JsonProperty("raffleWinnerUsername") String raffleWinnerUsername,
                    @JsonProperty("organizator")  int organizatorId,
                    @JsonProperty("lecturer")  String lecturerUsername,
                    @JsonProperty("eventQuestions") Set<EventQuestionsDTO> eventQuestions,
                    @JsonProperty("participantsInEvents") Set<ParticipantsInEventsDTO> participantsInEventsDTO,
                    @JsonProperty("eventSurveyQuestions")Set<EventSurveyQuestionDTO> eventSurveyQuestions) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.address = address;
        this.quota = quota;
        this.longitude = longitude;
        this.latitude = latitude;
        this.currentNumberOfPeople = currentNumberOfPeople;
        this.raffleWinnerUsername = raffleWinnerUsername;
        this.organizatorId = organizatorId;
        this.lecturerUsername = lecturerUsername;
        this.eventQuestions = eventQuestions;
        this.participantsInEventsDTO = participantsInEventsDTO;
        this.eventSurveyQuestions = eventSurveyQuestions;

    }

}
