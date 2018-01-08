package com.trendyol.dynoconfigdemo;

import com.trendyol.dynoconfig.ConfigurationReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${spring.datasource.url}")
    private String dbConnectionString;

    @Bean
    public ConfigurationReader configurationReader() {
        return new ConfigurationReader("SERVICE-A", dbConnectionString);
    }
}
