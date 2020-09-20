package com.example.EMS.security.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class JwtUtil {
    public static String generateToken(Authentication authentication,
                                       String secretKey,
                                       Integer expirationDay) {
        return  Jwts.builder()
                .setSubject(authentication.getName())
                .claim("authorities",getAuthorities(authentication))
                .setIssuedAt(new Date())
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();

    }

    private static List<String> getAuthorities(Authentication authentication) {
        return authentication.getAuthorities()
                .stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());
    }

    public static String extractUsernameFromJWT(String jwtToken,String secretKey) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(jwtToken)
                .getBody()
                .getSubject(); // auth içindeki username imiz
    }
}
