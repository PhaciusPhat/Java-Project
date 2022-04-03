package com.example.javaschoolproject.Models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name="Invoice")
@NoArgsConstructor
public class Invoice extends Auditable{
    @Id
    @GeneratedValue
    private long iv_id;
    @NotNull
    private long iv_total;
    @NotNull
    private String iv_address;
    @NotNull
    private String iv_describe;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id",nullable = false,referencedColumnName = "user_id")
    private User user;

    public Invoice(long iv_total, String iv_address, String iv_describe) {
        this.iv_total = iv_total;
        this.iv_address = iv_address;
        this.iv_describe = iv_describe;
    }
}
