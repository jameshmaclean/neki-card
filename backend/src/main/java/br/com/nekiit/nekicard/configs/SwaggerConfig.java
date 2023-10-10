package br.com.nekiit.nekicard.configs;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
@SecurityScheme(name = "Bearer Auth", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", scheme = "bearer")

public class SwaggerConfig {
	@Value("${neki-card.swagger.dev-url}")
	private String devUrl;

	@Bean
	OpenAPI myOpenAPI() {
		Server devServer = new Server();
		devServer.setUrl(devUrl);
		devServer.setDescription("Server URL - DEV");

		Contact contact = new Contact();
		contact.setName("NekiCard");
		contact.setUrl("");

		License license = new License().name("Apache license version 2.0")
				.url("https://www.apache.org/licenses/LICENSE-2.0");

		Info info = new Info().title("Documentação API NekiCard").version("1.0.0").contact(contact).license(license)
				.termsOfService("");

		return new OpenAPI().info(info).servers(List.of(devServer));
	}
}
