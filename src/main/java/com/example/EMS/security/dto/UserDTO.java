package com.example.EMS.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {

    @NotBlank(message = "İsim kısmı boş olamaz !")
    private String name;

    @NotBlank(message = "Soyisim kısmı boş olamaz !")
    private String surname;

    @NotBlank(message = "TC kısmı boş olamaz !")
    private String tcKimlikNo;

    @NotBlank(message = "Kullanıcı adı kısmı boş olamaz !")
    private String username;

    @NotBlank(message = "Parola kısmı boş olamaz !")
    private String password;

    @NotBlank(message = "Telefon numarası girilmeli")
    private String phone;

    @NotBlank(message = "Email kısmı boş olamaz !")
    @Email(message = "Email geçerli olmalı.")
    private String email;

    @PastOrPresent
    private LocalDate birthDate;

    private List<String> authorities;

}
