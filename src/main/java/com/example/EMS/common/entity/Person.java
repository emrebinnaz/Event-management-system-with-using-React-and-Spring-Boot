package com.example.EMS.common.entity;


import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDate;

@Getter
@Setter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Person extends IdBaseEntity{
    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private String surname;

    @Column(name = "TR_IDENTITY_NUMBER", unique = true)
    private String tcKimlikNo;

    @Column(name = "USERNAME", unique = true)
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "PHONE", unique = true)
    private String phone;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "BIRTHDATE")
    private LocalDate birthDate;

    public Person(Integer id) {
        super(id);
    }

    public Person(Integer id,final String name, final String surname,
                  final String tcKimlikNo, final String username, final String password, final String phone, final String email, final LocalDate birthDate) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.tcKimlikNo = tcKimlikNo;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.birthDate = birthDate;
    }
}
