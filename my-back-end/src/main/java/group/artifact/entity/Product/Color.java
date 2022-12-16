package group.artifact.entity.Product;

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
@Table(name = "Color")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String color;
    private String code;
    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL)
    private List<ProductImages> productImages;
}
