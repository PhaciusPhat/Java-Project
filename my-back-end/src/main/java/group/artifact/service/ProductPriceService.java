package group.artifact.service;

import group.artifact.entity.Product.ProductPrice;
import group.artifact.exception.BadRequestException;
import group.artifact.exception.NotFoundException;
import group.artifact.repository.ProductPriceRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProductPriceService {
    private final ProductPriceRepository productPriceRepository;

    public ProductPriceService(ProductPriceRepository productPriceRepository) {
        this.productPriceRepository = productPriceRepository;
    }

    public ProductPrice getProductPrice(UUID id){
        Optional<ProductPrice> productPrice = productPriceRepository.findById(id);
        if(productPrice.isEmpty()) throw new NotFoundException("Not found product price");
        return productPrice.get();
    }

    public void createProductPrice(ProductPrice productPrice){
        if(productPrice.getStartDate() != null &&
                productPrice.getEndDate() != null &&
                productPrice.getStartDate() > productPrice.getEndDate()){
            throw new BadRequestException("Invalid date for this sale");
        }
        if(productPrice.getCurrentPrice() < 0 ||
            productPrice.getSalePrice() < 0
        ){
            throw new BadRequestException("Invalid price");
        }
        productPriceRepository.save(productPrice);
    }

    public void editProductPrice(UUID id, ProductPrice newProductPrice){
        ProductPrice productPrice = getProductPrice(id);

    }
}
