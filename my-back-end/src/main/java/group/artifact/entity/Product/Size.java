package group.artifact.entity.Product;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "Size")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String size;
    @JsonIgnore
    @OneToMany(mappedBy = "size", cascade = CascadeType.ALL)
    private List<ProductSize> productSizes;
}
