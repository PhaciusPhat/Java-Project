package group.artifact.controller;

import group.artifact.service.CategoryService;
import group.artifact.viewmodel.RequestCategoryVm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<?> getCategoryList(@RequestParam(required = false, defaultValue = "false") Boolean isDisabled) {
        return ResponseEntity.ok(categoryService.getCategoryList(isDisabled));
    }

    @GetMapping("/find")
    public ResponseEntity<?> getCategoryListByName(@RequestParam(required = false, defaultValue = "") String name){
        return ResponseEntity.ok(categoryService.getCategoryListByName(name, false));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<?> getCategoryBySlug(@PathVariable String slug){
        return ResponseEntity.ok(categoryService.getCategoryBySlug(slug));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable UUID id) {
        return ResponseEntity.ok(categoryService.getCategory(id));
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody RequestCategoryVm requestCategoryVm){
        categoryService.createCategory(requestCategoryVm);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editCategory(@PathVariable UUID id, @RequestBody RequestCategoryVm requestCategoryVm){
        categoryService.editCategory(id, requestCategoryVm);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> disableCategory(@PathVariable UUID id){
        categoryService.disableCategory(id);
        return ResponseEntity.noContent().build();
    }
}
