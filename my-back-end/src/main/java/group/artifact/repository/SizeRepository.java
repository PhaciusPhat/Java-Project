package group.artifact.repository;

import group.artifact.entity.Product.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface SizeRepository extends JpaRepository<Size, UUID> {
    Size findBySize(String size);
}
