package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;

    public List<ProductType> getProductTypeList() {
        return productTypeRepository.findAll();
    }

    public List<ProductType> getProductTypeListByName(String name) {
        return productTypeRepository.findProductTypeListByName(name);
    }

    public ProductType getProductTypeByName(String name) {
        return productTypeRepository.findProductTypeByName(name);
    }

    public ProductType getProductTypeById(Long id) throws NotFoundException {
        return productTypeRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found"));
    }

    public void updateProductType(ProductType productType, Long pt_id) throws NotFoundException{
        ProductType checkProductType = getProductTypeByName(productType.getPt_name());
        if (checkProductType != null) {
            throw new BadRequestException("Already exists product type have this name");
        }
        checkProductType = getProductTypeById(pt_id);
        checkProductType.setPt_name(productType.getPt_name());
        productTypeRepository.save(checkProductType);
    }

    public void deleteProductType(Long id) throws NotFoundException {
        ProductType productType = getProductTypeById(id);
        if(productType.getProducts().size() > 0){
            throw new BadRequestException("Can not delete this product type");
        }
        productTypeRepository.delete(productType);
    }

    public void createProductType(ProductType productType) {
        ProductType checkProductType = getProductTypeByName(productType.getPt_name());
        if (checkProductType != null) {
            throw new BadRequestException("Already exists product type have this name");
        }
        productTypeRepository.save(productType);
    }


}

