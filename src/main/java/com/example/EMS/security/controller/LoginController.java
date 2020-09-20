package com.example.EMS.security.controller;

import com.example.EMS.common.LoginResponse;
import com.example.EMS.common.MessageResponse;
import com.example.EMS.security.dto.LoginRequestDTO;
import com.example.EMS.security.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        return loginService.login(loginRequestDTO);
    }
}
