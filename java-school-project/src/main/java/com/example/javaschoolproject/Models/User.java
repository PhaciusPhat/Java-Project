package com.example.javaschoolproject.Models;

import com.example.javaschoolproject.Enum.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "User")
@NoArgsConstructor
@Data
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;
//    @ReadOnlyProperty
    @Column(unique = true)
    @NotNull(message = "user_username not null")
    @NotEmpty(message = "user_username not empty")
    @NotBlank(message = "user_username not blank")
    private String user_username;
    @NotNull(message = "user_password not null")
    @NotEmpty(message = "user_password not empty")
    @NotBlank(message = "user_password not blank")
    private String user_password;
    @NotNull
//    @Min(value=10, message = "user_phone must 10 number")
//    @Max(value=10, message = "user_phone must 10 number")
    @Column(columnDefinition = "nvarchar(10)")
    private String user_phone;
    @NotNull(message = "user_name not null")
    @NotEmpty(message = "user_name not empty")
    @NotBlank(message = "user_name not blank")
    private String user_name;
    @Column(unique = true)
    @NotNull(message = "user_email not null")
    @NotEmpty(message = "user_email not empty")
    @NotBlank(message = "user_email not blank")
    private String user_email;
    private Role user_role;
    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Invoice> invoices;
    @JsonIgnore
    @OneToMany(mappedBy = "cart_user",cascade = CascadeType.ALL)
    private List<Cart> cartUserList;
    public User(String user_username, String user_password, String user_phone, String user_name, String user_email, Role user_role) {
        this.user_username = user_username;
        this.user_password = user_password;
        this.user_phone = user_phone;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_role = user_role;
    }
}
