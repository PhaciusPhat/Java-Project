package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Repository.ProductRepository;
import com.example.javaschoolproject.Repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;
    public List<Product> getProductList(){
        System.out.println(productRepository.findAll());
        return productRepository.findAll();
    }

    public void CreateProduct(Product product, long pt_id){
        ProductType productType = productTypeRepository.getById(pt_id);
        if(productType != null){
            try {
                product.setProduct_type(productType);
                productRepository.save(product);
            } catch (Exception e){
                System.out.println(e.getMessage());
            }
        } else{
            throw new IllegalArgumentException("error");
        }
    }


}
