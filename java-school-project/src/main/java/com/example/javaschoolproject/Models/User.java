package com.example.javaschoolproject.Models;

import com.example.javaschoolproject.Enum.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "User")
@NoArgsConstructor
@Data
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;
    @NotNull
    @Column(unique = true)
    private String user_username;
    @NotNull
    private String user_password;
    @NotNull
    @Column(columnDefinition = "nvarchar(10)")
    private String user_phone;
    @NotNull
    private String user_name;
    @NotNull
    private String user_email;
    @NotNull
    private Role user_role;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Invoice> invoices;

    public User(String user_username, String user_password, String user_phone, String user_name, String user_email, Role user_role) {
        this.user_username = user_username;
        this.user_password = user_password;
        this.user_phone = user_phone;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_role = user_role;
    }
}
