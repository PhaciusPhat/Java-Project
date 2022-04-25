package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.DTO.UserDTO;
import com.example.javaschoolproject.Enum.Role;
import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.ChangePass;
import com.example.javaschoolproject.Models.User;
import com.example.javaschoolproject.Repository.UserRepository;
import com.example.javaschoolproject.Security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final JwtTokenUtil jwtTokenUtil;
    private final General general;
    private PasswordEncoder bcryptEncoder = new BCryptPasswordEncoder();
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    private UserDTO convertToDto(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return userDTO;
    }

    public User getUserById(Long id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found user"));
    }

    public User getUserByUsername(String username) throws NotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NotFoundException("Not found any user have this username");
        }
        return user;
    }

    public String getUsernameFromToken(String requestTokenHeader) {
        String jwtToken = requestTokenHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        return username;
    }

    private void checkEqualsUser(String checkUsername, String username) {
        if (!checkUsername.equals(username)) {
            throw new BadRequestException("You can't change info of difference user");
        }
    }

    public UserDTO getUser(String requestTokenHeader) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        User user = getUserByUsername(username);
        UserDTO userDTO = convertToDto(user);
        return userDTO;
    }

    public void updateUser(UserDTO userDTO, String requestTokenHeader) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        checkEqualsUser(username, userDTO.getUser_username());
        User user = getUserByUsername(username);
        if (userRepository.findByEmail(userDTO.getUser_email()) != null && !userDTO.getUser_email().equals(user.getUser_email())) {
            throw new BadRequestException("Already have user own this email");
        }
        user.setUser_email(userDTO.getUser_email());
        user.setUser_name(userDTO.getUser_name());
        user.setUser_phone(userDTO.getUser_phone());
        userRepository.save(user);
    }

    public void changePassword(String requestTokenHeader, ChangePass changePass) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        checkEqualsUser(username, changePass.getUsername());
        general.authenticate(changePass.getUsername(), changePass.getOld_password());
        User user = getUserByUsername(changePass.getUsername());
        String new_password = changePass.getNew_password();
        if (changePass.getNew_password() == null || new_password.equals(""))
            throw new BadRequestException("New Password Illegal");
        user.setUser_password(bcryptEncoder.encode(changePass.getNew_password()));
        userRepository.save(user);
    }

//    admin

    private void checkEqualsUserAdmin(String checkUsername, String username) {
        if (checkUsername.equals(username)) {
            throw new BadRequestException("You can't change info your Role or delete yourself");
        } else {
            User userCheck = userRepository.findByUsername(checkUsername);
            User user = userRepository.findByUsername(username);
            if (userCheck.getUser_role() == Role.ADMIN && user.getUser_role() == Role.SUPER_ADMIN) {
                throw new BadRequestException("You can't change info of user have bigger role");
            }
        }
    }

    public List<UserDTO> getUserList() {
        return userRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<UserDTO> getUserListByName(String user_name) {
        return userRepository.findUserListByName(user_name).stream().map(this::convertToDto).collect(Collectors.toList());
    }


    public void changeRole(String requestTokenHeader, UserDTO userDTO, long user_id) throws NotFoundException {
//        admin
        String username = getUsernameFromToken(requestTokenHeader);
//        check admin vs user
        checkEqualsUserAdmin(username, userDTO.getUser_username());
//      get user
        User user = getUserById(user_id);
        user.setUser_role(userDTO.getUser_role());
        userRepository.save(user);
    }


    public void deleteUser(String requestTokenHeader, Long user_id) throws NotFoundException {
        String username = getUsernameFromToken(requestTokenHeader);
        User user = getUserById(user_id);
        checkEqualsUserAdmin(username, user.getUser_username());
        if (user.getCartUserList().size() > 0 || user.getInvoices().size() > 0) {
            throw new BadRequestException("Can't not delete this user");
        }
        userRepository.deleteById(user_id);
    }


}
