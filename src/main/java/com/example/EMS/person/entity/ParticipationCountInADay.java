package com.example.EMS.person.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

public interface ParticipationCountInADay {

    LocalDate getPartitionDate();
    Integer getPartitionCount();

}
