package com.example.javaschoolproject.Controllers.manage;

import com.example.javaschoolproject.DTO.UserDTO;
import com.example.javaschoolproject.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "admin/user")
@RequiredArgsConstructor
public class UserManageController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getUserList() {
        return ResponseEntity.ok(userService.getUserList());
    }

    @GetMapping("/find")
    public ResponseEntity<?> getUserListByName(@RequestParam String user_name){
        return ResponseEntity.ok(userService.getUserListByName(user_name));
    }

    @SneakyThrows
    @GetMapping("/{user_id}")
    public ResponseEntity<?> getUserDetail(@PathVariable Long user_id) {
        return ResponseEntity.ok(userService.getUserById(user_id));
    }

    @SneakyThrows
    @PutMapping("/{user_id}")
    public ResponseEntity<?> changeRole(HttpServletRequest request, @RequestBody UserDTO userDTO, @PathVariable Long user_id) {
        final String requestTokenHeader = request.getHeader("Authorization");
        userService.changeRole(requestTokenHeader, userDTO, user_id);
        return ResponseEntity.ok("Update Role Success");

    }

    @SneakyThrows
    @DeleteMapping("/{user_id}")
    public ResponseEntity<?> deleteUser(HttpServletRequest request, @PathVariable Long user_id) {
        final String requestTokenHeader = request.getHeader("Authorization");
        userService.deleteUser(requestTokenHeader, user_id);
        return ResponseEntity.ok("Delete user successfully");
    }


}
