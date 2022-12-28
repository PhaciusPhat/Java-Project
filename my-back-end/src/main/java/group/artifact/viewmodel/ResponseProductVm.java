package group.artifact.viewmodel;

import group.artifact.entity.Product.Product;

import java.util.UUID;

public record ResponseProductVm(UUID id, String name, String slug,
                                String description, String thumbnail,
                                String SKU, Long amount, Long weight,
                                ResponseCategoryVm category) {
    public static ResponseProductVm fromModel(Product product) {
        return new ResponseProductVm(
                product.getId(), product.getName(), product.getSlug(),
                product.getDescription(), product.getThumbnail(), product.getSKU(),
                product.getAmount(), product.getWeight(),
                ResponseCategoryVm.fromModel(product.getCategory())
        );
    }
}
