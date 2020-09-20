package com.example.EMS.question;


import com.example.EMS.question.entity.Question;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TestQuestion {


    @Test
    public void testCreateQuestion() {
        Question q = new Question(null,"soru");
        Assert.assertEquals("soru",q.getQuestion());
    }
}
