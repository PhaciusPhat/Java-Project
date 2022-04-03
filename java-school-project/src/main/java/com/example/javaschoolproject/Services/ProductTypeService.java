package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Repository.ProductRepository;
import com.example.javaschoolproject.Repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;

    public List<ProductType> getProductTypeList(){
        return productTypeRepository.findAll();
    }

    public List<ProductType> getProductTypeByName(String name){return null;}

    public ProductType getProductTypeById(Long id){return null;}

    public void updateProductType(ProductType productType) {}

    public void deleteProductType(){}

    public void createProductType(ProductType productType){
        productTypeRepository.save(productType);
    }



}

