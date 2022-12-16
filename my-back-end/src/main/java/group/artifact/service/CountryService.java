package group.artifact.service;

import group.artifact.entity.Location.Country;
import group.artifact.repository.CountryRepository;
import org.springframework.stereotype.Service;

@Service
public class CountryService {
    private final CountryRepository countryRepository;


    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public void save(){
        Country test = new Country();
        test.setName("Việt Nam");
        test.setAreaCode("+84");
        countryRepository.save(test);
    }

}
