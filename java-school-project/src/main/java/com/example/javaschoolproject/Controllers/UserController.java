package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.DTO.UserDTO;
import com.example.javaschoolproject.Models.ChangePass;
import com.example.javaschoolproject.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;


    @SneakyThrows
    @GetMapping("/")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(userService.getUser(requestTokenHeader));
    }


    @SneakyThrows
    @PutMapping("/")
    public ResponseEntity<?> updateUser(HttpServletRequest request, @RequestBody UserDTO userDTO) {
        final String requestTokenHeader = request.getHeader("Authorization");
        userService.updateUser(userDTO, requestTokenHeader);
        return ResponseEntity.ok("Update Success");
    }

    @SneakyThrows
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody ChangePass changePass) {
        final String requestTokenHeader = request.getHeader("Authorization");
        userService.changePassword(requestTokenHeader, changePass);
        return ResponseEntity.ok("Change password success");
    }


}
