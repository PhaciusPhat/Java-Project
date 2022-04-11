package com.example.javaschoolproject.Repository;

import com.example.javaschoolproject.Models.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

    @Query("from ProductType c where c.pt_name=?1")
    ProductType findProductTypeByName (@Param("pt_name") String pt_name);

    @Query("from ProductType s where s.pt_name LIKE CONCAT('%',:pt_name,'%')")
    List<ProductType> findProductTypeListByName(@Param("pt_name") String pt_name);

}
