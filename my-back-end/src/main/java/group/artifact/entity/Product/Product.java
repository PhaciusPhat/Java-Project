package group.artifact.entity.Product;

import group.artifact.entity.AuditEntity;
import group.artifact.entity.Cart.Cart;
import group.artifact.entity.Invoice.InvoiceDetail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Product")
public class Product extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String slug;
    private String SKU;
    private String thumbnail;
    private String description;
    private Long amount;
    private Long weight;
    private Boolean disable;
    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL)
    private ProductPrice productPrice;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImages> productImages;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductSize> productSizes;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<InvoiceDetail> invoiceDetails;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Cart> cartItems;
    @ManyToOne
    @JoinColumn(name="categoryId")
    private Category category;
}
