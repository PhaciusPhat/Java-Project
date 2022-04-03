package com.example.javaschoolproject.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ProductInvoice implements Serializable {
    @Column(name="iv_id")
    Long iv_id;
    @Column(name="p_id")
    Long p_id;
}
