package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Models.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("from Product c where c.p_name=?1")
    Product findProductByName (@Param("p_name") String p_name);

    @Query("from Product c where c.product_type.pt_id=?1")
    List<Product> findProductListByProductTypeId (@Param("pt_id") long pt_id);

    @Query("from Product s where s.p_name LIKE CONCAT('%',:p_name,'%')")
    List<Product> findProductListByName(@Param("p_name") String p_name);

    @Query("from Product s where s.p_name LIKE CONCAT('%',:p_name,'%') and s.product_type.pt_id=:pt_id")
    List<Product> findProductListByNameAndProductTypeId(@Param("p_name") String p_name, @Param("pt_id") long pt_id);

    @Query("from Product s where s.p_isActive=:p_active")
    List<Product> findProductListByActive(@Param("p_active") boolean p_active);
}
