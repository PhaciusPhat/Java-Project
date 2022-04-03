package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path="api/product-type")
public class ProductTypeController {
//    @Autowired
    private final ProductTypeService productTypeService;

    @GetMapping
    public List<ProductType> getProductTypeList(){
        return productTypeService.getProductTypeList();
    }

//    @GetMapping
//    public ProductType getProductTypeById(){
//        return null;
//    }
//
//    @GetMapping
//    public void getProductTypeByName(String name){}

    @PostMapping
    public void createProductType(@RequestBody ProductType productType){
        productTypeService.createProductType(productType);
    }

    @PutMapping
    public void updateProductType(@RequestBody ProductType productType){}

    @DeleteMapping
    public void deleteProductType(){}

}
