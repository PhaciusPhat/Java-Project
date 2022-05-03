package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;


public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query("from Invoice i where i.user.user_id = ?1")
    List<Invoice> getInvoicesByUser(@Param("user_id") long user_id);

    @Query("from Invoice i where i.user.user_id = ?1 and i.iv_id = ?2")
    Invoice getInvoicesByUserAndId(@Param("user_id") long user_id, @Param("iv_id") long iv_id);

    @Query("from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2 and i.user.user_id = ?3")
    List<Invoice> getInvoicesByDate(@Param("start_date") long start_date, @Param("end_date") long end_date, @Param("user_id") long user_id);

    @Query("from Invoice i where i.user.user_name LIKE CONCAT('%',?1,'%')")
    List<Invoice> getInvoicesByUserByAdmin(@Param("user_name") String user_name);

    @Query("from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2")
    List<Invoice> getInvoicesByDateByAdmin(@Param("start_date") long start_date, @Param("end_date") long end_date);

    @Query("from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2 and i.user.user_name LIKE CONCAT('%',?3,'%')")
    List<Invoice> getInvoicesByDateByUserByAdmin(@Param("start_date") long start_date, @Param("end_date") long end_date, @Param("user_name") String user_name);

}

