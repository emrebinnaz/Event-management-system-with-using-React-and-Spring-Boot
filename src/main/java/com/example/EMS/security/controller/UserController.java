package com.example.EMS.security.controller;

import com.example.EMS.common.MessageResponse;
import com.example.EMS.security.dto.UserDTO;
import com.example.EMS.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/add/{userType}")
    @PreAuthorize("permitAll()")
    public MessageResponse addUser(@PathVariable String userType, @RequestBody UserDTO userDTO){
        System.out.println(userType);
        return userService.addUser(userDTO,userType);
    }
}
