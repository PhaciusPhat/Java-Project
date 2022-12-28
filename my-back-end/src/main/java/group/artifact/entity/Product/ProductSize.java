package group.artifact.entity.Product;

import group.artifact.entity.CompositeKey.ProductSizeKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ProductSize")
public class ProductSize {
    @EmbeddedId
    private ProductSizeKey productSizeKey;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name="productId")
    private Product product;
    @ManyToOne
    @MapsId("sizeId")
    @JoinColumn(name="sizeId")
    private Size size;
}
