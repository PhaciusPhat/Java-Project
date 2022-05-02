package com.example.javaschoolproject.Controllers.manage;

import com.example.javaschoolproject.Services.InvoiceService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @SneakyThrows
    @GetMapping("/{iv_id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable long iv_id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(iv_id));
    }

    @GetMapping("/findByUser")
    public ResponseEntity<?> getAllInvoicesByUserByAdmin(@RequestParam String user_name) {
        return ResponseEntity.ok(invoiceService.getInvoicesByUserByAdmin(user_name));
    }

    @GetMapping("/findByDate")
    public ResponseEntity<?>  getInvoicesByDateByAdmin(@RequestParam("start_date") long start_date, @RequestParam("end_date") long end_date){
        return ResponseEntity.ok(invoiceService.getInvoicesByDateByAdmin(start_date, end_date));
    }

    @GetMapping("/findByDateAndUser")
    public ResponseEntity<?>  getInvoicesByDateAndUserByAdmin(@RequestParam("start_date") long start_date, @RequestParam("end_date") long end_date, @RequestParam("user_name") String user_name){
        return ResponseEntity.ok(invoiceService.getInvoicesByDateAndUserByAdmin(start_date, end_date, user_name));
    }
}
