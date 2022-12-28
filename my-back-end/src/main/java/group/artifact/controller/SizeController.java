package group.artifact.controller;

import group.artifact.entity.Product.Size;
import group.artifact.service.SizeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/size")
public class SizeController {
    private final SizeService sizeService;

    public SizeController(SizeService sizeService) {
        this.sizeService = sizeService;
    }
    @GetMapping
    public ResponseEntity<?> getSizeList(){
        List<Size> sizeList = sizeService.getSizeList();
        return ResponseEntity.ok(sizeList);
    }

    @PostMapping
    public ResponseEntity<?> createSize(@RequestBody Size size){
        Size newSize = sizeService.createSize(size);
        return ResponseEntity.ok(newSize);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSize(@PathVariable UUID id){
        sizeService.deleteSize(id);
        return ResponseEntity.noContent().build();
    }
}
