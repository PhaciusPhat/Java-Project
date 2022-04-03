package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Models.JwtRequest;
import com.example.javaschoolproject.Models.JwtResponse;
import com.example.javaschoolproject.Models.User;
import com.example.javaschoolproject.Repository.UserRepository;
import com.example.javaschoolproject.Security.JwtTokenUtil;
import com.example.javaschoolproject.Services.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),  authenticationRequest.getPassword()));
        } catch (DisabledException e) {
//            throw new Exception("USER_DISABLED", e);
            return ResponseEntity.status(400).body("USER_DISABLED");
        } catch (BadCredentialsException e) {
//            throw new Exception(, e);
            return ResponseEntity.status(400).body("INVALID_CREDENTIALS");
        }
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws Exception{
        if(userDetailsService.registerUser(user)){
            return ResponseEntity.ok("Register user success");
        }
        return ResponseEntity.status(400).body("Already have user own this username");

    }


}
