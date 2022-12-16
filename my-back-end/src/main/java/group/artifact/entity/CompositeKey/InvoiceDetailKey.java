package group.artifact.entity.CompositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
public class InvoiceDetailKey implements Serializable {
    @Column(name="invoiceId", insertable=false, updatable=false)
    private UUID invoiceId;
    @Column(name="productId", insertable=false, updatable=false)
    private UUID productId;
}

