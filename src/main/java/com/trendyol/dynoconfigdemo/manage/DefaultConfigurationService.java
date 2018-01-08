package com.trendyol.dynoconfigdemo.manage;

import com.trendyol.dynoconfigdemo.ConfigurationRecord;
import com.trendyol.dynoconfigdemo.ConfigurationRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author Murat Duzgun
 * <p>
 * It does crud operations at configuration records
 * TODO we can use model or bean properties mapper dto and entity mapping
 */
@Service
public class DefaultConfigurationService implements ConfigurationService {

    private final ConfigurationRecordRepository configurationRecordRepository;

    @Autowired
    public DefaultConfigurationService(ConfigurationRecordRepository configurationRecordRepository) {
        this.configurationRecordRepository = configurationRecordRepository;
    }

    @Override
    public ConfigurationRecordDTO createRecord(ConfigurationRecordDTO configurationRecordDTO) {

        ConfigurationRecord configurationRecord = new ConfigurationRecord();
        configurationRecord.setAppName(configurationRecordDTO.getAppName());
        configurationRecord.setName(configurationRecordDTO.getName());
        configurationRecord.setType(configurationRecordDTO.getType());
        configurationRecord.setActive(configurationRecordDTO.isActive());
        configurationRecord.setValue(configurationRecordDTO.getValue());

        configurationRecord = configurationRecordRepository.save(configurationRecord);
        configurationRecordDTO.setId(configurationRecord.getId());

        return configurationRecordDTO;
    }

    @Override
    public ConfigurationRecordDTO updateRecord(ConfigurationRecordDTO configurationRecordDTO) {

        ConfigurationRecord configurationRecord =
                configurationRecordRepository.findOne(configurationRecordDTO.getId());

        if (configurationRecord != null) {

            configurationRecord.setAppName(configurationRecordDTO.getAppName());
            configurationRecord.setName(configurationRecordDTO.getName());
            configurationRecord.setType(configurationRecordDTO.getType());
            configurationRecord.setActive(configurationRecordDTO.isActive());
            configurationRecord.setValue(configurationRecordDTO.getValue());
            configurationRecordRepository.save(configurationRecord);

            return configurationRecordDTO;
        }

        return null;
    }

    @Override
    public List<ConfigurationRecordDTO> getAllRecords() {

        Iterable<ConfigurationRecord> allRecords = configurationRecordRepository.findAll();

        return StreamSupport.stream(allRecords.spliterator(), false)
                .map(record -> {
                    ConfigurationRecordDTO confRecordDTO = new ConfigurationRecordDTO();
                    confRecordDTO.setId(record.getId());
                    confRecordDTO.setAppName(record.getAppName());
                    confRecordDTO.setName(record.getName());
                    confRecordDTO.setType(record.getType());
                    confRecordDTO.setActive(record.isActive());
                    confRecordDTO.setValue(record.getValue());
                    return confRecordDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ConfigurationRecordDTO getRecord(Integer recordId) {

        ConfigurationRecord configurationRecord = configurationRecordRepository.findOne(recordId);

        if (configurationRecord != null) {

            ConfigurationRecordDTO configurationRecordDTO = new ConfigurationRecordDTO();
            configurationRecordDTO.setAppName(configurationRecord.getAppName());
            configurationRecordDTO.setName(configurationRecord.getName());
            configurationRecordDTO.setType(configurationRecord.getType());
            configurationRecordDTO.setActive(configurationRecord.isActive());
            configurationRecordDTO.setValue(configurationRecord.getValue());

            return configurationRecordDTO;
        }

        return null;
    }
}
