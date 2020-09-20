package com.example.EMS.security.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank(message = "Tc Kimlik no boş olamaz !")
    private String tcKimlikNo;

    @NotBlank(message = "Parola boş olamaz !")
    private String password;
}
