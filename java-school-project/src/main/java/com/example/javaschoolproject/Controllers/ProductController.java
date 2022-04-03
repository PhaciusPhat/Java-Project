package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping(value="/test")
    public String test(@RequestBody Product product){
        System.out.println(product.getProduct_type());
        return "test";
    }


    @GetMapping
    public List<Product> getProductList(){
        return productService.getProductList();
    }

    @PostMapping("/?pt_id={pt_id}")
    public void createProduct(@Param(value = "pt_id") long pt_id, @RequestBody Product product){

        System.out.println(pt_id);
//        productService.CreateProduct(product, pt_id);
    }


}
