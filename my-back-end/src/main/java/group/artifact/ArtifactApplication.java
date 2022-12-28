package group.artifact;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ArtifactApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArtifactApplication.class, args);
    }

    @Bean
    InitializingBean InitializingDatabase() {
        return () -> {
            System.out.println("initial data in here");

        };
    }
}