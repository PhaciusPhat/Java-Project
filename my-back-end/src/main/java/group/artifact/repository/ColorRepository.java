package group.artifact.repository;

import group.artifact.entity.Product.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ColorRepository extends JpaRepository<Color, UUID> {
    Color findColorByColorOrCode(String color, String code);
}
