package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.DTO.UserDTO;
import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.ChangePass;
import com.example.javaschoolproject.Models.User;
import com.example.javaschoolproject.Repository.UserRepository;
import com.example.javaschoolproject.Security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private UserDetails userDetails;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final General general;
    private PasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();

    public User getUserByUsername(String username) throws NotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NotFoundException("Not found any user have this username");
        }
        return user;
    }

    private String getUsernameFromToken(String requestTokenHeader){
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        return username;
    }

    private void checkEqualsUser(String checkUsername, String username){
        if(!checkUsername.equals(username)){
            throw new BadRequestException("You can't change info of difference user");
        }
    }



    public UserDTO getUser(String requestTokenHeader) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        User user = getUserByUsername(username);
        UserDTO userDTO = new UserDTO(user.getUser_username(), user.getUser_name(), user.getUser_email(), user.getUser_phone(), user.getUser_role());
        return userDTO;
    }

    public void updateUser(UserDTO userDTO, String requestTokenHeader) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        checkEqualsUser(username, userDTO.getUsername());
        User user = getUserByUsername(username);
        if(userRepository.findByEmail(userDTO.getEmail()) != null && !userDTO.getEmail().equals(user.getUser_email())){
            throw new BadRequestException("Already have user own this email");
        }
        user.setUser_email(userDTO.getEmail());
        user.setUser_name(userDTO.getName());
        user.setUser_phone(userDTO.getPhone());
        userRepository.save(user);
    }

    public void changePassword(String requestTokenHeader, ChangePass changePass) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        checkEqualsUser(username, changePass.getUsername());
        general.authenticate(changePass.getUsername(), changePass.getOld_password());
        User user = getUserByUsername(changePass.getUsername());
        String new_password = changePass.getNew_password();
        if(changePass.getNew_password() == null || new_password.equals(""))
            throw new BadRequestException("New Password Illegal");
        user.setUser_password(bcryptEncoder.encode(changePass.getNew_password()));
        userRepository.save(user);
    }

//    admin

    private void checkEqualsUserAdmin(String checkUsername, String username){
        if(checkUsername.equals(username)){
            throw new BadRequestException("You can't change info your Role or delete yourself");
        }
    }

    public List<User> getUserList(){
        return userRepository.findAll();
    }

    public void changeRole(String requestTokenHeader, UserDTO userDTO) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        checkEqualsUserAdmin(username, userDTO.getUsername());
        User user = getUserByUsername(userDTO.getUsername());
        user.setUser_role(userDTO.getRole());
        userRepository.save(user);
    }



    public void deleteUser(String requestTokenHeader, String Username) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        checkEqualsUserAdmin(username, Username);
        User user = getUserByUsername(Username);
        if(user.getCartUserList().size() > 0 || user.getInvoices().size() > 0){
            throw  new BadRequestException("Can't not delete this user");
        }
        userRepository.deleteById(user.getUser_id());
    }






}
