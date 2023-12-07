package com.adventure.wonderwander;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class WonderwanderApplication {

	public static void main(String[] args) {
		SpringApplication.run(WonderwanderApplication.class, args);
	}

}
