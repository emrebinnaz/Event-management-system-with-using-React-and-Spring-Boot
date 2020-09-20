package com.example.EMS.person;

import com.example.EMS.common.LocalDateBuilder;
import com.example.EMS.common.entity.Person;
import com.example.EMS.person.entity.Participant;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TestParticipant {


    @Test
    public void testCreateParticipant() {
        Person participant = new Participant(null,"Emre","Binnaz","1234","emreb",
                "1234","0534534","emre@c.om",
                LocalDateBuilder.generateDefaultLocalDate());
        Assert.assertNotNull(participant);
        Assert.assertEquals("Emre", participant.getName());
    }


}
