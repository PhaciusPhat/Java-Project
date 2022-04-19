package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Models.InvoiceDetail;
import com.example.javaschoolproject.Repository.InvoiceDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceDetailService {
    @Autowired
    private InvoiceDetailRepository invoiceDetailRepository;

    public void save(InvoiceDetail invoiceDetail){

        invoiceDetailRepository.save(invoiceDetail);
    }

    public List<InvoiceDetail> findByInvoiceId(long iv_id){
        return invoiceDetailRepository.findByInvoiceId(iv_id);
    }

}
