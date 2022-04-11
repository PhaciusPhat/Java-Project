package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Services.ProductService;
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

    @GetMapping
    public ResponseEntity<?> getProductList() {
        return ResponseEntity.ok(productService.getProductList());
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
        return ResponseEntity.ok(productService.getProductById(p_id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createProduct(@RequestParam("pt_id") @Valid Long pt_id,
                                           @RequestParam("p_img") @Valid MultipartFile p_img,
                                           @RequestParam("p_name") @Valid String p_name,
                                           @RequestParam("p_des") @Valid String p_des,
                                           @RequestParam("p_number") @Valid int p_number,
                                           @RequestParam("p_price") @Valid int p_price) throws NotFoundException {
        Product product = new Product(p_name, p_img.getOriginalFilename(), p_des, p_number, p_price);
        productService.CreateProduct(product, pt_id, p_img);
        return ResponseEntity.ok("Create product success");
    }

    @SneakyThrows
    @PutMapping("/{p_id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long p_id,
                                           @RequestParam("p_img") MultipartFile p_img,
                                           @RequestParam("p_name") String p_name,
                                           @RequestParam("p_des") String p_des,
                                           @RequestParam("p_number") int p_number,
                                           @RequestParam("p_price") int p_price){
        Product product = new Product();
        product.setP_name(p_name);
        product.setP_des(p_des);
        product.setP_number(p_number);
        product.setP_price(p_price);
        productService.updateProduct(product, p_id, p_img);
        return ResponseEntity.ok("Update product success");
    }

    @SneakyThrows
    @DeleteMapping("/{p_id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long p_id){
        productService.deleteProduct(p_id);
        return ResponseEntity.ok("Delete product successful");
    }


}
