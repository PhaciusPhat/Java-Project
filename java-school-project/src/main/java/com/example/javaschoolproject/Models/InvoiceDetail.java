package com.example.javaschoolproject.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "InvoiceDetail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDetail extends Auditable{
    @EmbeddedId
    private ProductInvoice productInvoice;

    @NotNull
    private long number;
    @NotNull
    private long price;

    @ManyToOne
    @MapsId("iv_id")
    @JoinColumn(name="iv_id")
    private Invoice invoice;

    @ManyToOne
    @MapsId("p_id")
    @JoinColumn(name="p_id")
    private Product product;
}
