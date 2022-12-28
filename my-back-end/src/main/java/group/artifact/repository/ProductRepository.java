package group.artifact.repository;

import group.artifact.entity.Product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    Product findByDisableFalseAndSlug(String slug);
    List<Product> findAllByDisable(Boolean disable);
    Product findByDisableAndId(Boolean disable, UUID id);
    Product findByNameOrSlugOrSKU(String name, String slug, String SKU);
    Product findByNameOrSlugOrSKUAndIdIsNot(String name, String slug, String SKU, UUID id);
    List<Product> findAllByDisableAndNameContainingIgnoreCase(Boolean disable, String name);
}
