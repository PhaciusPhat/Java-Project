package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Entity(name="Cart")
public class Cart {
    @EmbeddedId
    @JsonIgnore
    private CartUser cartUser;
    @NotNull(message = "cart_number not null")
    @NotEmpty(message = "cart_number not empty")
    @NotBlank(message = "cart_number not blank")
    private int cart_number;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @MapsId("user_id")
    @JoinColumn(name="user_id")
    private User cart_user;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @MapsId("p_id")
    @JoinColumn(name="p_id")
    private Product cart_product;

}
