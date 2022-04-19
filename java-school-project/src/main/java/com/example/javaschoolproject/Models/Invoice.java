package com.example.javaschoolproject.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@Table(name="Invoice")
@NoArgsConstructor
@AllArgsConstructor
public class Invoice extends Auditable{
    @Id
    @GeneratedValue
    private long iv_id;
    @NotNull
    private long iv_total;
    @NotNull(message = "iv_address not null")
    @NotEmpty(message = "iv_address not empty")
    @NotBlank(message = "iv_address not blank")
    private String iv_address;
    @NotNull(message = "iv_describe not null")
    private String iv_describe;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id",nullable = false,referencedColumnName = "user_id")
    private User user;
    @OneToMany(mappedBy = "invoices",cascade = CascadeType.ALL)
    private List<InvoiceDetail> invoiceDetailList;
}
