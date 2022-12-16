package group.artifact.entity.Product;

import jakarta.annotation.Nullable;
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
@Table(name = "ProductImages")
public class ProductImages {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String link;

    @Nullable
    @ManyToOne
    @JoinColumn(name="colorId")
    private Color color;

    @ManyToOne
    @JoinColumn(name="productId")
    private Product product;
}
