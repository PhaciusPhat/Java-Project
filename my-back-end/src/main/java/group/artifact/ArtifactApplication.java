package group.artifact;
import group.artifact.service.CountryService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ArtifactApplication {
	@Autowired
	 CountryService x;
	public static void main(String[] args) {
		SpringApplication.run(ArtifactApplication.class, args);

	}

	@Bean
	InitializingBean InitializingDatabase() {
		return () -> {
			x.save();
		};
	}
}