package group.artifact.service;

import group.artifact.entity.Product.Color;
import group.artifact.exception.BadRequestException;
import group.artifact.exception.NotFoundException;
import group.artifact.repository.ColorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ColorService {
    private final ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    public List<Color> getColorList() {
        return colorRepository.findAll();
    }

    public Color createColor(Color color){
        if(colorRepository.findColorByColorOrCode(color.getColor(), color.getCode()) != null){
            throw new BadRequestException("This color has already exists");
        } else{
            return colorRepository.save(color);
        }
    }

    public void deleteColor(UUID id) {
        Optional<Color> color = colorRepository.findById(id);
        if(color.isEmpty()){
            throw new NotFoundException("This color isn't exists");
        } else{
            if(color.get().getProductImages().size() > 0){
                throw new BadRequestException("Can't delete this color");
            } else{
                colorRepository.deleteById(id);
            }
        }
    }

}
