package group.artifact.entity.Invoice;

import group.artifact.entity.Account.Account;
import group.artifact.entity.AuditEntity;
import group.artifact.enums.OrderStatus;
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
@Table(name = "Invoice")
public class Invoice extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String address;
    private String phone;
    private String SKU;
    private String slug;
    private Long totalPrice;
    private OrderStatus status;
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<InvoiceDetail> invoiceDetails;

    @ManyToOne
    @JoinColumn(name="invoiceDiscountId")
    private InvoiceDiscount invoiceDiscount;
    @ManyToOne
    @JoinColumn(name="accountId")
    private Account account;
}
