package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "ProductType")
@NoArgsConstructor
@Data
public class ProductType  extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pt_id;
    @NotNull
    @Column(unique = true)
    private String pt_name;

    @OneToMany(mappedBy = "product_type",cascade = CascadeType.ALL)
    private List<Product> products;


    public ProductType(String pt_name) {
        this.pt_name = pt_name;
    }
}
