package group.artifact.entity.Account;

import group.artifact.entity.AuditEntity;
import group.artifact.entity.Cart.Cart;
import group.artifact.entity.Comment.Comment;
import group.artifact.entity.Invoice.Invoice;
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
@Table(name = "Account")
public class Account extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String avatar;
    private String nickname;
    private Boolean active;
    private Boolean disable;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Address> addresses;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Comment> comments;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Invoice> invoices;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Cart> cartItems;
    @ManyToOne
    @JoinColumn(name = "roleId")
    private Role role;
}
