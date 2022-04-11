package com.example.javaschoolproject.Controllers;

import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/product-type")
public class ProductTypeController {
    private final ProductTypeService productTypeService;

    @GetMapping("/")
    public ResponseEntity<?> getProductTypeList() {
        List<ProductType> productTypeList = productTypeService.getProductTypeList();
        return ResponseEntity.ok(productTypeList);
    }

    @GetMapping("/find")
    public ResponseEntity<?> getProductTypeListByName(@RequestParam String pt_name){
        List<ProductType> productTypeList = productTypeService.getProductTypeListByName(pt_name);
        return ResponseEntity.ok(productTypeList);
    }

    @SneakyThrows
    @GetMapping("/{pt_id}")
    public ResponseEntity<?> getProductTypeById(@PathVariable Long pt_id) {
        ProductType productType = productTypeService.getProductTypeById(pt_id);
        return ResponseEntity.ok(productType);
    }

    @PostMapping
    public ResponseEntity<?> createProductType(@RequestBody @Valid ProductType productType){
        productTypeService.createProductType(productType);
        return ResponseEntity.ok("Create product type success");
    }

    @SneakyThrows
    @PutMapping("/{pt_id}")
    public ResponseEntity<?> updateProductType(@RequestBody @Valid ProductType productType, @PathVariable Long pt_id) {
        productTypeService.updateProductType(productType, pt_id);
        return ResponseEntity.ok("Update product type success");
    }

    @SneakyThrows
    @DeleteMapping("/{pt_id}")
    public ResponseEntity<?> deleteProductType(@PathVariable Long pt_id) {
        productTypeService.deleteProductType(pt_id);
        return ResponseEntity.ok("Delete product type success");
    }

}
