package group.artifact;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class ArtifactApplication {

    public static void main(String[] args) {
//        SpringApplication.run(ArtifactApplication.class, args);

        ArrayList<String> test = new ArrayList<>();
        test.add("h");
        test.add("c");
        test.add("h");
        test.add("p");
        test.add("p");
        List<String> rs =  test.parallelStream().toList();
        System.out.println(rs);
    }


    @Bean
    InitializingBean InitializingDatabase() {
        return () -> {
            System.out.println("initial data in here");

        };
    }
}