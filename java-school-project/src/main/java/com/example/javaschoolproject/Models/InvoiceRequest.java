package com.example.javaschoolproject.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceRequest {
    private String iv_address;
    private String iv_describe;
    private List<CartRequest> cartRequestList;
}
