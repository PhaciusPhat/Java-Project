package group.artifact.service;

import group.artifact.entity.Product.Category;
import group.artifact.entity.Product.Product;
import group.artifact.exception.BadRequestException;
import group.artifact.exception.NotFoundException;
import group.artifact.repository.ProductRepository;
import group.artifact.viewmodel.RequestProductVm;
import group.artifact.viewmodel.ResponseProductVm;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    private Product getProductByIdWithDisable(UUID id, Boolean disable) {
        Product product = productRepository.findByDisableAndId(disable, id);
        if (product == null) throw new NotFoundException("Not found this product");
        else return product;
    }

    private void saveProduct(Product product, RequestProductVm requestProductVm,
                             Category category){
        product.setName(requestProductVm.name());
        product.setSlug(requestProductVm.slug());
        product.setSKU(requestProductVm.SKU());
        product.setThumbnail(requestProductVm.thumbnail()); //get link image
        product.setDescription(requestProductVm.description());
        product.setWeight(requestProductVm.weight());
        product.setAmount(requestProductVm.amount());
        product.setCategory(category);
        productRepository.save(product);
    }

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public List<ResponseProductVm> getProductList(Boolean disable) {
        return productRepository.findAllByDisable(disable)
                .stream().map(ResponseProductVm::fromModel).toList();
    }

    public Product getProductById(UUID id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()) throw new NotFoundException("Not found this product");
        else return product.get();
    }

    public ResponseProductVm getProduct(UUID id, Boolean disable) {
        return ResponseProductVm.fromModel(getProductByIdWithDisable(id, disable));
    }

    public ResponseProductVm getProductBySlug(String slug) {
        Product product = productRepository.findByDisableFalseAndSlug(slug);
        if(product == null){
            throw new NotFoundException("Not found product");
        } else {
            return ResponseProductVm.fromModel(product);
        }
    }

    public void createProduct(RequestProductVm requestProductVm) {
        Category category = categoryService.getCategoryById(requestProductVm.categoryId());
        if (productRepository.findByNameOrSlugOrSKU(requestProductVm.name(), requestProductVm.slug(), requestProductVm.SKU()) != null) {
            throw new BadRequestException("This product has already exists");
        } else {
            //need upload image here
            Product product = new Product();
            saveProduct(product, requestProductVm, category);
        }
    }

    public void editProduct(UUID id, RequestProductVm requestProductVm) {
        Category category = categoryService.getCategoryById(requestProductVm.categoryId());
        Product product = getProductById(id);
        if (productRepository.findByNameOrSlugOrSKUAndIdIsNot(requestProductVm.name(), requestProductVm.slug(), requestProductVm.SKU(), id) != null) {
            throw new BadRequestException("This product has already exists");
        } else {
            //need upload image here
            saveProduct(product, requestProductVm, category);
        }
    }

    public void disableProduct(UUID id){
        Product product = getProductById(id);
        product.setDisable(!product.getDisable());
        productRepository.save(product);
    }
}
