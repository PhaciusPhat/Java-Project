package group.artifact.entity.Invoice;
import group.artifact.entity.CompositeKey.InvoiceDetailKey;
import group.artifact.entity.Product.Product;
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
@Table(name = "InvoiceDetail")
public class InvoiceDetail {
    @EmbeddedId
    private InvoiceDetailKey invoiceDetailKey;
    private Long number;
    private Long oldPrice;
    private Long newPrice;
    private String thumbnail;
    private String color;
    private String size;

    @ManyToOne
    @MapsId("invoiceId")
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "productId")
    private Product product;
}
