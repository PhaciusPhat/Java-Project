package group.artifact.service;

import group.artifact.entity.Product.Size;
import group.artifact.exception.BadRequestException;
import group.artifact.exception.NotFoundException;
import group.artifact.repository.SizeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SizeService {
    private final SizeRepository sizeRepository;

    public SizeService(SizeRepository sizeRepository) {
        this.sizeRepository = sizeRepository;
    }

    public List<Size> getSizeList() {
        return sizeRepository.findAll();
    }

    public Size createSize(Size size) {
        if (sizeRepository.findBySize(size.getSize()) != null) {
            throw new BadRequestException("This size has already exists");
        } else {
            return sizeRepository.save(size);
        }
    }

    public void deleteSize(UUID id) {
        Optional<Size> size = sizeRepository.findById(id);
        if(size.isEmpty()){
            throw new NotFoundException("This size isn't exists");
        } else{
            if(size.get().getProductSizes().size() > 0 ){
                throw new BadRequestException("Can't delete this size");
            } else{
                sizeRepository.deleteById(id);
            }
        }
    }
}
