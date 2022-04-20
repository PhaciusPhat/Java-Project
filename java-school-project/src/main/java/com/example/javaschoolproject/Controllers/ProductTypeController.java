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

//@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/product-type")
public class ProductTypeController {
    @Autowired
    private ProductTypeService productTypeService;

    // list
    @GetMapping("/")
    public ResponseEntity<?> getProductTypeList() {
        return ResponseEntity.ok(productTypeService.getProductTypeList());
    }

}
