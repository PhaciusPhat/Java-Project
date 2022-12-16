package group.artifact.entity.Location;

import group.artifact.entity.Account.Account;
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
@Table(name = "Address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String detail;
    @ManyToOne
    @JoinColumn(name = "districtId")
    private District district;
    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;
}
