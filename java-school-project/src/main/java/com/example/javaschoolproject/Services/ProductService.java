package com.example.javaschoolproject.Services;

import com.example.javaschoolproject.Exception.BadRequestException;
import com.example.javaschoolproject.Exception.NotFoundException;
import com.example.javaschoolproject.Models.Product;
import com.example.javaschoolproject.Models.ProductType;
import com.example.javaschoolproject.Repository.ProductRepository;
import com.example.javaschoolproject.Storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductTypeService productTypeService;
    private final StorageService storageService;
    private final
    Timestamp timestamp = new Timestamp(System.currentTimeMillis());

    public List<Product> getProductList() {
        return productRepository.findAll();
    }

    public Product getProductById(long p_id) throws NotFoundException {
        return productRepository.findById(p_id).orElseThrow(() -> new NotFoundException("Product not found"));
    }


    public Product getProductByName(String p_name) {
        return productRepository.findProductByName(p_name);
    }

    public List<Product> getProductListByName(String p_name) {
        return productRepository.findProductListByName(p_name);
    }

    public List<Product> getProductListByProductTypeId(long pt_id) {
        return productRepository.findProductListByProductTypeId(pt_id);
    }

    private boolean validateProduct(Product p, boolean create, Product check) {
//        find by name depend on name of new product
        Product product = getProductByName(p.getP_name());
        if (product != null && create) {
            throw new BadRequestException("Already exists product have this name");
        }
        if(product != null){
//            check name of found product with product want to update
            if(!product.getP_name().equals(check.getP_name())){
                throw new BadRequestException("Already exists product have this name");
            }
        }
        if (p.getP_number() <= 0 || p.getP_price() <= 0) {
            throw new BadRequestException("Product's illegal");
        }
        return true;
    }

    public void CreateProduct(Product product, long pt_id, MultipartFile p_img) throws NotFoundException {
//        "http://localhost:2222/"
        ProductType productType = productTypeService.getProductTypeById(pt_id);
        if (validateProduct(product, true, null)) {
            String filename = timestamp.getTime() + "_" + p_img.getOriginalFilename();
            storageService.store(p_img, filename);
            filename = "http://localhost:2222/" + filename;
            product.setP_img(filename);
            product.setProduct_type(productType);
            productRepository.save(product);
        }
    }

    public void updateProduct(Product product, long p_id, MultipartFile p_img) throws NotFoundException {
        Product p = getProductById(p_id);
        if(validateProduct(product, false, p)){
//            check file and upload file
            if (p_img.getSize() > 0) {
                String filename = timestamp.getTime() + "_" + p_img.getOriginalFilename();
                storageService.store(p_img, filename);
                filename = "http://localhost:2222/" + filename;
                p.setP_img(filename);
            }
            p.setP_name(product.getP_name());
            p.setP_des(product.getP_des());
            p.setP_number(product.getP_number());
            p.setP_price(product.getP_price());
            productRepository.save(p);
        }


    }

    public void deleteProduct(long p_id) throws NotFoundException {
        Product product = getProductById(p_id);
        if (product.getCartUserList().size() > 0 || product.getInvoiceDetailList().size() > 0) {
            throw new BadRequestException("Can not delete this product");
        }
        productRepository.deleteById(p_id);
    }


}
