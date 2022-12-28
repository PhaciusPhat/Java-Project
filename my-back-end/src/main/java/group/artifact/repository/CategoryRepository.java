package group.artifact.repository;

import group.artifact.entity.Product.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Category findBySlugAndDisabledFalse(String slug);

    Category findByNameOrSlug(String name, String slug);

    List<Category> findAllCategoryByDisabled(Boolean disabled);

    Category findByNameOrSlugAndIdIsNot(String name, String slug, UUID id);

    List<Category> findAllCategoryByDisabledAndNameIsContainingIgnoreCase(Boolean disabled, String name);
}
