package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Services.ProductService;
import com.example.javaschoolproject.Services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ProductTypeService productTypeService;
    @GetMapping
    public ResponseEntity<?> getProductList() {
        return ResponseEntity.ok(productService.getActiveProducts());
    }

    @GetMapping("/find")
    public ResponseEntity<?> getProductListByName(@RequestParam String p_name){
        return ResponseEntity.ok(productService.getProductListByName(p_name));
    }

    @GetMapping("/findByProductType/{pt_id}")
    public ResponseEntity<?> getProductListByProductTypeId(@PathVariable Long pt_id){
        return ResponseEntity.ok(productService.getProductListByProductTypeId(pt_id));
    }

    @SneakyThrows
    @GetMapping("/{p_id}")
    public ResponseEntity<?> getProductList(@PathVariable Long p_id) {
        Product p = productService.getProductById(p_id);
        return ResponseEntity.ok(p);
    }
}
