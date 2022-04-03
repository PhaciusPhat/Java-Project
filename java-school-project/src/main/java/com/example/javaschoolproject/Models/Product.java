package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Product")
@NoArgsConstructor
@Data
public class Product extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long p_id;
    @NotNull
    @Column(unique = true)
    private String p_name;
    @NotNull
    private String p_img;
    @NotNull
    private String p_des;
    @NotNull
    private int p_number;
    @NotNull
    private int p_price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "pt_id", nullable = false, referencedColumnName = "pt_id")
    private ProductType product_type;

    public Product(String p_name, String p_img, String p_des, int p_number, int p_price) {
        this.p_name = p_name;
        this.p_img = p_img;
        this.p_des = p_des;
        this.p_number = p_number;
        this.p_price = p_price;
    }
}
