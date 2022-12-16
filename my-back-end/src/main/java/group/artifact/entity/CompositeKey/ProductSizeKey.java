package group.artifact.entity.CompositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
public class ProductSizeKey implements Serializable {
    @Column(name="productId", insertable=false, updatable=false)
    private UUID productId;
    @Column(name="sizeId", insertable=false, updatable=false)
    private UUID sizeId;
}
