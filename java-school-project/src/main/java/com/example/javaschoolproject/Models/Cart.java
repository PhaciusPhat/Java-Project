package com.example.javaschoolproject.Models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity(name="Cart")
public class Cart {
    @EmbeddedId
    private CartUser cartUser;

    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @MapsId("p_id")
    @JoinColumn(name="p_id")
    private Product product;

}
