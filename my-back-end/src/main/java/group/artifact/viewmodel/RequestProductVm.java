package group.artifact.viewmodel;

import java.util.UUID;

public record RequestProductVm(String name, String slug,
                               String SKU, String thumbnail,
                               String description, Long amount,
                               Long weight, UUID categoryId
) {
}
