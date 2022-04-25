package com.example.javaschoolproject.DTO;

import com.example.javaschoolproject.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private long user_id;
    private String user_username;
    private String user_name;
    private String user_email;
    private String user_phone;
    private Role user_role;
}
