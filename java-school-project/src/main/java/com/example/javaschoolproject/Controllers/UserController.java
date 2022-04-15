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

    @GetMapping("/admin")
    public ResponseEntity<?> getUserList() {
        return ResponseEntity.ok(userService.getUserList());
    }

    @GetMapping("/admin/find")
    public ResponseEntity<?> getUserListByName(@RequestParam String user_name){
        return ResponseEntity.ok(userService.getUserListByName(user_name));
    }

    @SneakyThrows
    @GetMapping("/admin/{user_id}")
    public ResponseEntity<?> getUserDetail(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getUserById(user_id));
    }

    @SneakyThrows
    @PutMapping("/admin/{user_id}")
    public ResponseEntity<?> changeRole(HttpServletRequest request,@RequestBody UserDTO userDTO, @PathVariable Long user_id) {
        final String requestTokenHeader = request.getHeader("Authorization");
        userService.changeRole(requestTokenHeader, userDTO);
        return ResponseEntity.ok("Update Role Success");

    }

    @SneakyThrows
    @DeleteMapping("/admin/{user_id}")
    public ResponseEntity<?> deleteUser(HttpServletRequest request, @PathVariable Long user_id) {
        final String requestTokenHeader = request.getHeader("Authorization");
        userService.deleteUser(requestTokenHeader, user_id);
        return ResponseEntity.ok("Delete user successfully");
    }


    @SneakyThrows
    @GetMapping("/")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(userService.getUser(requestTokenHeader));
    }


    @SneakyThrows
    @PutMapping("/")
    public ResponseEntity<?> updateUser(HttpServletRequest request, @RequestBody @Valid UserDTO userDTO) {
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
