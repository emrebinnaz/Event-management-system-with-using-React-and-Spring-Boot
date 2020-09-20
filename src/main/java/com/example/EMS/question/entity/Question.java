package com.example.EMS.question.entity;


import com.example.EMS.common.entity.IdBaseEntity;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;

@EqualsAndHashCode(of = "id")
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Question extends IdBaseEntity {
    @Column(name = "QUESTION")
    private String question;

    public Question(Integer id, String question) {
        super(id);
        this.question = question;
    }
    public Question() {

    }
    public Question(Integer id) {
        super(id);
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
