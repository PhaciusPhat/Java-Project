package com.example.javaschoolproject.Controllers.manage;

import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "admin/product-type")
public class ProductTypeManageController {

    @Autowired
    private ProductTypeService productTypeService;

    // list
    @GetMapping("/")
    public ResponseEntity<?> getProductTypeList() {
        return ResponseEntity.ok(productTypeService.getProductTypeList());
    }

    //  find by name
    @GetMapping("/find")
    public ResponseEntity<?> getProductTypeListByName(@RequestParam String pt_name) {
        return ResponseEntity.ok(productTypeService.getProductTypeListByName(pt_name));
    }

    // find by id
    @SneakyThrows
    @GetMapping("/{pt_id}")
    public ResponseEntity<?> getProductTypeById(@PathVariable Long pt_id) {
//        System.out.println(productTypeService.getProductTypeById(pt_id));
        return ResponseEntity.ok(productTypeService.getProductTypeById(pt_id));
    }

    // create
    @PostMapping("/")
    public ResponseEntity<?> createProductType(@RequestBody @Valid ProductType productType) {
        productTypeService.createProductType(productType);
        return ResponseEntity.ok("Create product type success");
    }

    //  update
    @SneakyThrows
    @PutMapping("/{pt_id}")
    public ResponseEntity<?> updateProductType(@RequestBody @Valid ProductType productType, @PathVariable Long pt_id) {
        productTypeService.updateProductType(productType, pt_id);
        return ResponseEntity.ok("Update product type success");
    }

    // delete
    @SneakyThrows
    @DeleteMapping("/{pt_id}")
    public ResponseEntity<?> deleteProductType(@PathVariable Long pt_id) {
        productTypeService.deleteProductType(pt_id);
        return ResponseEntity.ok("Delete product type success");
    }

}
