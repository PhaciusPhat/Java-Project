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
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String slug;
    private boolean disabled;
    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    List<Category> subCategories;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    List<Product> products;
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category parentCategory;
}
