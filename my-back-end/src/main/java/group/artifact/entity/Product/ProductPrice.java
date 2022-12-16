package group.artifact.entity.Product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ProductPrice")
public class ProductPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Long oldPrice;
    private Long newPrice;
    private Long startDate;
    private Long endDate;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="productId")
    private Product product;
}
