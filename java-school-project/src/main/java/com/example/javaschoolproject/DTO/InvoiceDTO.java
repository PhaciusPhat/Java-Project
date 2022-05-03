package com.example.javaschoolproject.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private long iv_id;
    private long iv_total;
    private String iv_address;
    private String iv_describe;
    private boolean iv_status;
    private UserDTO userDTO;
    private long createdDate;
}
