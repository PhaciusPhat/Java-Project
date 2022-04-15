package com.example.javaschoolproject.Models;

//import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "Product")
@NoArgsConstructor
@Data
public class Product extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long p_id;
    @Column(unique = true)
    @NotNull(message = "p_name not null")
    @NotEmpty(message = "p_name not empty")
    @NotBlank(message = "p_name not blank")
    private String p_name;
    @NotNull(message = "p_img not null")
    @NotEmpty(message = "p_img not empty")
    @NotBlank(message = "p_img not blank")
    private String p_img;
    @NotNull(message = "p_des not null")
    @NotEmpty(message = "p_des not empty")
    @NotBlank(message = "p_des not blank")
    private String p_des;
    @NotNull(message = "p_number not null")
    @NotEmpty(message = "p_number not empty")
    @NotBlank(message = "p_number not blank")
    private int p_number;
    @NotNull(message = "p_price not null")
    @NotEmpty(message = "p_price not empty")
    @NotBlank(message = "p_price not blank")
    private int p_price;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "pt_id", nullable = false, referencedColumnName = "pt_id")
    private ProductType product_type;
    @JsonIgnore
    @OneToMany(mappedBy = "products",cascade = CascadeType.ALL)
    private List<InvoiceDetail> invoiceDetailList;
    @JsonIgnore
    @OneToMany(mappedBy = "cart_product",cascade = CascadeType.ALL)
    private List<Cart> cartUserList;
    public Product(String p_name, String p_img, String p_des, int p_number, int p_price) {
        this.p_name = p_name;
        this.p_img = p_img;
        this.p_des = p_des;
        this.p_number = p_number;
        this.p_price = p_price;
    }

}
