package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Services.General;
import com.example.javaschoolproject.Models.JwtRequest;
import com.example.javaschoolproject.Models.JwtResponse;
import com.example.javaschoolproject.Models.User;
import com.example.javaschoolproject.Security.JwtTokenUtil;
import com.example.javaschoolproject.Services.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private General general;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody @Valid JwtRequest authenticationRequest) throws Exception {
        general.authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid User user){
        userDetailsService.registerUser(user);
        return ResponseEntity.ok("Register user success");

    }


}
