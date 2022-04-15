package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Repository.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductTypeService {
    @Autowired
    private ProductTypeRepository productTypeRepository;

    //    all
    public List<ProductType> getProductTypeList() {
        return productTypeRepository.findAll();
    }

    //    name list
    public List<ProductType> getProductTypeListByName(String name) {
        return productTypeRepository.findProductTypeListByName(name);
    }

    //    name
    public ProductType getProductTypeByName(String name) {
        return productTypeRepository.findProductTypeByName(name);
    }

    //      id
    public ProductType getProductTypeById(Long id) throws NotFoundException {
        return productTypeRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found"));
    }

    //    crud func
    public void createProductType(ProductType productType) {
        ProductType checkProductType = getProductTypeByName(productType.getPt_name());
        if (checkProductType != null) {
            throw new BadRequestException("Already exists product type have this name");
        }
        productTypeRepository.save(productType);
    }

    public void updateProductType(ProductType productType, Long pt_id) throws NotFoundException, StackOverflowError {
        ProductType checkProductType = getProductTypeByName(productType.getPt_name());
        if (checkProductType != null && checkProductType.getPt_id() != pt_id) {
            throw new BadRequestException("Already exists product type have this name");
        }
        checkProductType = getProductTypeById(pt_id);
        checkProductType.setPt_name(productType.getPt_name());
        productTypeRepository.save(checkProductType);
    }

    public void deleteProductType(Long id) throws NotFoundException {
        ProductType productType = getProductTypeById(id);
        if (productType.getProducts().size() > 0) {
            throw new BadRequestException("Can not delete this product type");
        }
        productTypeRepository.delete(productType);
    }
}

