package group.artifact.entity.Cart;

import group.artifact.entity.Account.Account;
import group.artifact.entity.CompositeKey.CartKey;
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
@Table(name = "Cart")
public class Cart {
    @EmbeddedId
    private CartKey cartKey;
    private Long number;

    @ManyToOne
    @MapsId("accountId")
    @JoinColumn(name="accountId")
    private Account account;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name="productId")
    private Product product;
}
