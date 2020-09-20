package com.example.EMS.security.service;

import com.example.EMS.security.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }
    public UserDetails loadUserByTcKimlikNo(String tcKimlikNo) {
        return userRepository.findByTcKimlikNo(tcKimlikNo);
    }

    public UserDetails loadUserByPassword(String password) {
        return userRepository.findByPassword(password);
    }
}

