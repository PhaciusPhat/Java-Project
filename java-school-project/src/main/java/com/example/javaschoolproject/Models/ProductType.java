package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
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
    @Column(unique = true)
    @NotNull(message = "pt_name not null")
    @NotEmpty(message = "pt_name not empty")
    @NotBlank(message = "pt_name not blank")
    private String pt_name;
    @JsonIgnore
    @OneToMany(mappedBy = "product_type",cascade = CascadeType.ALL)
    private List<Product> products;


    public ProductType(String pt_name) {
        this.pt_name = pt_name;
    }
}
