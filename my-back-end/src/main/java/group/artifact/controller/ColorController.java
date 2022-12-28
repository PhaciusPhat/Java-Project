
package group.artifact.controller;

import group.artifact.entity.Product.Color;
import group.artifact.service.ColorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/color")
public class ColorController {
    ColorService colorService;

    public ColorController(ColorService colorService){
        this.colorService = colorService;
    }

    @GetMapping
    public ResponseEntity<?> getColorList(){
        List<Color> colorList = colorService.getColorList();
        return ResponseEntity.ok(colorList);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> getColorDetail(@PathVariable UUID id){
        colorService.deleteColor(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> createColor(@RequestBody Color color) {
        Color newColor = colorService.createColor(color);
        return ResponseEntity.ok(newColor);
    }
}
