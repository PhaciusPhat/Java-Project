package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.InvoiceDetail;
import com.example.javaschoolproject.Models.ProductInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, ProductInvoice> {

    @Query("from InvoiceDetail c where c.invoices.iv_id = ?1")
    public List<InvoiceDetail> findByInvoiceId(long id);
}
