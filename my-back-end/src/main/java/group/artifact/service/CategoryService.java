package group.artifact.service;

import group.artifact.entity.Product.Category;
import group.artifact.exception.BadRequestException;
import group.artifact.exception.NotFoundException;
import group.artifact.repository.CategoryRepository;
import group.artifact.viewmodel.RequestCategoryVm;
import group.artifact.viewmodel.ResponseCategoryVm;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    private void disableSubCategories(List<Category> subCategories){
        if(subCategories.size() < 1) return;
        for(Category c : subCategories){
            c.setDisabled(!c.isDisabled());
            disableSubCategories(c.getSubCategories());
        }
    }

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<ResponseCategoryVm> getCategoryList(Boolean isDisabled) {
        return categoryRepository.findAllCategoryByDisabled(isDisabled)
                .stream().map(ResponseCategoryVm::fromModel).toList();
    }

    public List<ResponseCategoryVm> getCategoryListByName(String name, Boolean disabled){
        return categoryRepository.findAllCategoryByDisabledAndNameIsContainingIgnoreCase(disabled, name)
                .stream().map(ResponseCategoryVm::fromModel).toList();
    }



    public Category getCategoryById(UUID id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isEmpty()) {
            throw new NotFoundException("Not found this category");
        } else {
            return category.get();
        }
    }

    public ResponseCategoryVm getCategory(UUID id) {
        return ResponseCategoryVm.fromModel(getCategoryById(id));
    }

    public ResponseCategoryVm getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlugAndDisabledFalse(slug);
        if(category == null){
            throw new NotFoundException("Not found this category");
        } else{
            return ResponseCategoryVm.fromModel(category);
        }
    }

    public void createCategory(RequestCategoryVm requestCategoryVm) {
        Category parentCategory = getCategoryById(requestCategoryVm.parentId());
        if (categoryRepository.findByNameOrSlug(requestCategoryVm.name(), requestCategoryVm.slug()) != null) {
            throw new BadRequestException("This category has already exists");
        } else {
            Category category = new Category();
            category.setName(requestCategoryVm.name());
            category.setSlug(requestCategoryVm.slug());
            category.setDisabled(false);
            category.setParentCategory(parentCategory);
            categoryRepository.save(category);
        }
    }

    public void editCategory(UUID id, RequestCategoryVm requestCategoryVm) {
        Category parentCategory = getCategoryById(requestCategoryVm.parentId());
        Category category = getCategoryById(id);
        if (categoryRepository.findByNameOrSlugAndIdIsNot(requestCategoryVm.name(), requestCategoryVm.slug(), id) != null) {
            throw new BadRequestException("Already exists category has this name or slug");
        } else {
            category.setName(requestCategoryVm.name());
            category.setSlug(requestCategoryVm.slug());
            category.setParentCategory(parentCategory);
            categoryRepository.save(category);
        }
    }

    public void disableCategory(UUID id) {
        Category category = getCategoryById(id);
        category.setDisabled(!category.isDisabled());
        disableSubCategories(category.getSubCategories());
        categoryRepository.save(category);
    }

}
