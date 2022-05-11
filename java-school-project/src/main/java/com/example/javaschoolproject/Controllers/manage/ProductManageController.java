package com.example.javaschoolproject.Controllers.manage;

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
@RequestMapping(path = "admin/product")
@RequiredArgsConstructor
public class ProductManageController {
    private final ProductService productService;
    private final ProductTypeService productTypeService;

    @GetMapping
    public ResponseEntity<?> getProductList() {
        return ResponseEntity.ok(productService.getProductList());
    }

    @GetMapping("/find")
    public ResponseEntity<?> getProductListByName(@RequestParam String p_name) {
        return ResponseEntity.ok(productService.getProductListByName(p_name));
    }

    @GetMapping("/findByProductType/{pt_id}")
    public ResponseEntity<?> getProductListByProductTypeId(@PathVariable Long pt_id) {
        return ResponseEntity.ok(productService.getProductListByProductTypeId(pt_id));
    }

    @SneakyThrows
    @GetMapping("/{p_id}")
    public ResponseEntity<?> getProductList(@PathVariable Long p_id) {
        Product p = productService.getProductById(p_id);
        return ResponseEntity.ok(p);
    }

    @PostMapping("/")
    public ResponseEntity<?> createProduct(@RequestParam("pt_id") @Valid Long pt_id,
                                           @RequestParam("p_img") @Valid MultipartFile p_img,
                                           @RequestParam("p_name") @Valid String p_name,
                                           @RequestParam("p_des") @Valid String p_des,
                                           @RequestParam("p_number") @Valid int p_number,
                                           @RequestParam("p_price") @Valid int p_price) throws NotFoundException {
        Product product = new Product(p_name, p_img.getOriginalFilename(), p_des, p_number, p_price);
        System.out.println(product);
        productService.CreateProduct(product, pt_id, p_img);
        return ResponseEntity.ok("Create product success");
    }

    @SneakyThrows
    @PutMapping("/{p_id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long p_id,
                                           @RequestParam("pt_id") @Valid Long pt_id,
                                           @RequestParam("p_img") MultipartFile p_img,
                                           @RequestParam("p_name") String p_name,
                                           @RequestParam("p_des") String p_des,
                                           @RequestParam("p_number") int p_number,
                                           @RequestParam("p_price") int p_price) {
        ProductType productType = productTypeService.getProductTypeById(pt_id);
        System.out.println("p_img: " + p_img);
        Product product = new Product();
        product.setP_name(p_name);
        product.setP_des(p_des);
        product.setP_number(p_number);
        product.setP_price(p_price);
        product.setProduct_type(productType);
        productService.updateProduct(product, p_id, p_img);
        return ResponseEntity.ok("Update product success");
    }

    @SneakyThrows
    @PutMapping("/active/{p_id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long p_id) {
        productService.deleteProduct(p_id);
        return ResponseEntity.ok("Delete product successful");
    }

    @GetMapping("/findProductListByNameAndProductTypeId")
    public ResponseEntity<?> findProductListByNameAndProductTypeId(@RequestParam String p_name, @RequestParam Long pt_id) {
        return ResponseEntity.ok(productService.findProductListByNameAndProductTypeId(p_name, pt_id));
    }


}
