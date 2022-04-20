package com.example.javaschoolproject.Controllers.manage;

import com.example.javaschoolproject.Services.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "admin/invoice")
@RequiredArgsConstructor
public class InvoiceManageController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/")
    public ResponseEntity<?> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @GetMapping("/findByUser")
    public ResponseEntity<?> getAllInvoicesByUserByAdmin(@RequestParam String user_name) {
        return ResponseEntity.ok(invoiceService.getInvoicesByUserByAdmin(user_name));
    }

    @GetMapping("/findByDate")
    public ResponseEntity<?>  getInvoicesByDateByAdmin(@RequestParam("start_date") long start_date, @RequestParam("end_date") long end_date){
        return ResponseEntity.ok(invoiceService.getInvoicesByDateByAdmin(start_date, end_date));
    }
}
