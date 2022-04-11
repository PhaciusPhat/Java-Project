package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity(name = "InvoiceDetail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDetail extends Auditable{
    @EmbeddedId
    private ProductInvoice productInvoice;

    @NotNull(message = "number not null")
    @NotEmpty(message = "number not empty")
    @NotBlank(message = "number not blank")
    private long number;
    @NotNull(message = "price not null")
    @NotEmpty(message = "price not empty")
    @NotBlank(message = "price not blank")
    private long price;

    @JsonIgnore
    @ManyToOne
    @MapsId("iv_id")
    @JoinColumn(name="iv_id")
    private Invoice invoices;
    @JsonIgnore
    @ManyToOne
    @MapsId("p_id")
    @JoinColumn(name="p_id")
    private Product products;
}
