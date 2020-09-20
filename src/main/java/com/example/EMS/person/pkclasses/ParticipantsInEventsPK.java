package com.example.EMS.person.entity.pkclasses;

import com.example.EMS.event.entity.Event;
import com.example.EMS.person.entity.Participant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Objects;

@SuppressWarnings("serial")
@NoArgsConstructor
@Getter
@Setter
public class ParticipantsInEventsPK implements Serializable {
    private Event event;
    private Participant participant;

    public ParticipantsInEventsPK(Event event, Participant participant) {
        this.event = event;
        this.participant = participant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ParticipantsInEventsPK that = (ParticipantsInEventsPK) o;
        return Objects.equals(event, that.event) &&
                Objects.equals(participant, that.participant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.event, this.participant);
    }
}
