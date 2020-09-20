package com.example.EMS.security.service;

import com.example.EMS.common.LoginResponse;
import com.example.EMS.common.MessageResponse;
import com.example.EMS.common.enums.MessageType;
import com.example.EMS.security.dto.LoginRequestDTO;
import com.example.EMS.security.entity.Users;
import com.example.EMS.security.util.JwtUtil;
import com.sun.xml.bind.v2.runtime.output.SAXOutput;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationProvider authenticationProvider;

    @Value("${security.jwt.secret-key}")
    private String secretKey;
    private MessageResponse messageResponse;

    public LoginResponse login(LoginRequestDTO loginRequestDTO) {
        try {
            Users user = (Users) customUserDetailsService.loadUserByTcKimlikNo(loginRequestDTO.getTcKimlikNo());
            var authenticationToken = new UsernamePasswordAuthenticationToken(
                    user.getUsername(), loginRequestDTO.getPassword());
            Authentication authentication = authenticationProvider.authenticate(authenticationToken);
            String jwtToken =  JwtUtil.generateToken(authentication,secretKey,7);
            messageResponse = new MessageResponse("Girdiğiniz bilgiler doğrudur.Yönlendiriliyorsunuz",
                                                        MessageType.SUCCESS);
            return new LoginResponse(jwtToken,messageResponse);
        } catch (Exception ex) {
               ex.printStackTrace();
        }
        messageResponse = new MessageResponse("Girdiğiniz bilgiler hatalıdır! Lütfen tekrar giriniz.",
                MessageType.ERROR);
        return new LoginResponse(null,messageResponse);
    }

}
