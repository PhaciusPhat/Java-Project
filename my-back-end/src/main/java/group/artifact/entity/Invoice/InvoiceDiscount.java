package group.artifact.entity.Invoice;

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
@Table(name = "InvoiceDiscount")
public class InvoiceDiscount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Long discount;
    private String condition;
    private String content;
    private Long StartDate;
    private Long EndDate;
    @OneToMany(mappedBy = "invoiceDiscount", cascade = CascadeType.ALL)
    private List<Invoice> invoices;
}
