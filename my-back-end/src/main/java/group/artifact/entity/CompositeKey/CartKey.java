package group.artifact.entity.CompositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
public class CartKey implements Serializable {
    @Column(name="accountId", insertable=false, updatable=false)
    private UUID accountId;
    @Column(name="productId", insertable=false, updatable=false)
    private UUID productId;
}
