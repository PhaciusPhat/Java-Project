package group.artifact.viewmodel;

import group.artifact.entity.Product.Category;

import java.util.UUID;

public record ResponseCategoryVm(UUID id, UUID parentId, String name, String slug) {
    public static ResponseCategoryVm fromModel(Category category) {
        Category parentCategory = category.getParentCategory();
        return new ResponseCategoryVm(category.getId(), parentCategory == null ? null : parentCategory.getId()
                , category.getName(), category.getSlug());
    }
}
