package com.trendyol.dynoconfigdemo;

import com.trendyol.dynoconfig.ConfigurationReader;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Random;

/**
 * @author Murat Duzgun
 * <p>
 * Integration test for library
 * TODO we can use temporary database solution for testing purpose
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class DynoconfigIntegrationTest {

    @Autowired
    private ConfigurationRecordRepository configurationRecordRepository;

    @Autowired
    private ConfigurationReader configurationReader;

    @Autowired
    private Environment environment;

    private final static String updaterRunIntervalPropertyName = "dynoconfig.updaterRunIntervalInMs";

    @Test
    public void getConfigValueCorrectly() throws InterruptedException {

        int randomPort = new Random().nextInt();
        String testedKey = "app.port_" + randomPort;

        Assert.assertNull(configurationReader.getValue(testedKey));

        ConfigurationRecord configurationRecord = new ConfigurationRecord();
        configurationRecord.setAppName("SERVICE-A");
        configurationRecord.setName(testedKey);
        configurationRecord.setType(ConfigurationRecord.Type.INTEGER);
        configurationRecord.setValue(Integer.toString(randomPort));
        configurationRecord.setActive(true);
        configurationRecordRepository.save(configurationRecord);

        Thread.sleep(Long.valueOf(environment.getProperty(updaterRunIntervalPropertyName)) + 1000L);

        int expectedValue = configurationReader.getValue(testedKey);
        Assert.assertEquals(randomPort, expectedValue);
    }

    @TestConfiguration
    static class DynoconfigConfig {

        @Value("${spring.datasource.url}")
        private String dbConnectionString;

        @Bean
        public ConfigurationReader configurationReader() {
            System.setProperty(updaterRunIntervalPropertyName, "30000");
            return new ConfigurationReader("SERVICE-A", dbConnectionString);
        }
    }
}
