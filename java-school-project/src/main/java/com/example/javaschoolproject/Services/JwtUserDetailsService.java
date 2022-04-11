package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Enum.Role;
import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Models.User;
import com.example.javaschoolproject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else{
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getUser_role().toString()));
            return new org.springframework.security.core.userdetails.User(user.getUser_username(), user.getUser_password(),
                    authorities);
        }
    }



    public void registerUser(User user){
        User temp = userRepository.findByUsername(user.getUser_username());
        if(temp != null){
            throw new BadRequestException("Already have user own this username");
        }
        temp = userRepository.findByEmail(user.getUser_email());
        if(temp != null){
            throw new BadRequestException("Already have user own this email");
        }
        user.setUser_password(bcryptEncoder.encode(user.getUser_password()));
        user.setUser_role(Role.CLIENT);
        userRepository.save(user);

    }

}
