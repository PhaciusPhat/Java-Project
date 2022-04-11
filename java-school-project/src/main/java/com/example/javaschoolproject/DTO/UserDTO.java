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
    @NotNull(message = "Username not null")
    @NotEmpty(message = "Username not empty")
    @NotBlank(message = "Username not blank")
    private String Username;
    @NotNull(message = "Name not null")
    @NotEmpty(message = "Name not empty")
    @NotBlank(message = "Name not blank")
    private String Name;
    @NotNull(message = "Email not null")
    @NotEmpty(message = "Email not empty")
    @NotBlank(message = "Email not blank")
    private String Email;
    @NotNull(message = "Phone not null")
    @NotEmpty(message = "Phone not empty")
    @NotBlank(message = "Phone not blank")
    private String Phone;
    private Role role;
}
