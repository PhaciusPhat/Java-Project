package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Models.InvoiceRequest;
import com.example.javaschoolproject.Services.InvoiceService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "api/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @SneakyThrows
    @GetMapping("/")
    public ResponseEntity<?> getAllInvoicesByUser(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(invoiceService.getInvoicesByUser(requestTokenHeader));
    }

    @SneakyThrows
    @GetMapping("/{iv_id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable long iv_id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(iv_id));
    }

    @SneakyThrows
    @GetMapping("/findByDate")
    public ResponseEntity<?> getInvoicesByDate(HttpServletRequest request, @RequestParam("start_date") long start_date, @RequestParam("end_date") long end_date) {
        final String requestTokenHeader = request.getHeader("Authorization");
        return ResponseEntity.ok(invoiceService.getInvoicesByDate(requestTokenHeader, start_date, end_date));
    }

    @SneakyThrows
    @PostMapping("/")
    public ResponseEntity<?> createInvoice(HttpServletRequest request, @RequestBody InvoiceRequest invoiceRequest) {
        final String requestTokenHeader = request.getHeader("Authorization");
        invoiceService.createInvoice(requestTokenHeader, invoiceRequest);
        return ResponseEntity.ok("Create invoice successfully");
    }

    @SneakyThrows
    @PutMapping("/{iv_id}")
    public ResponseEntity<?> updateInvoice(HttpServletRequest request, @PathVariable long iv_id) {
        final String requestTokenHeader = request.getHeader("Authorization");
        invoiceService.updateStatusInvoice(requestTokenHeader, iv_id);
        return ResponseEntity.ok("Update invoice successfully");
    }


}
