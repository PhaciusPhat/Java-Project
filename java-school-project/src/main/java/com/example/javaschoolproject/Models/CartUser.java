package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CartUser implements Serializable {
//    @JsonIgnore
    @Column(name="user_id")
    Long user_id;
//    @JsonIgnore
    @Column(name="p_id")
    Long p_id;

}
