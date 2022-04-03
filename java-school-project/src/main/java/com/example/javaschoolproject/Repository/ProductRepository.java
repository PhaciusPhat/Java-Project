package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("from Product c where c.p_name=?1")
    Product findByCountryName(@Param("name") String name);
}
