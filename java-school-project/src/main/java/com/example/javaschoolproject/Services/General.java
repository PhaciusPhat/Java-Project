package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Service
public class General {

    @Autowired
    private AuthenticationManager authenticationManager;

    public void authenticate(String username, String password){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,  password));
        } catch (DisabledException e) {
            throw new BadRequestException("USER_DISABLED");
        } catch (BadCredentialsException e) {
            throw new BadRequestException("INVALID_CREDENTIALS");
        }
    }
}
