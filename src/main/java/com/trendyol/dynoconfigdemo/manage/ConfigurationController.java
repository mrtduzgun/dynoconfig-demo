package com.trendyol.dynoconfigdemo.manage;

import com.trendyol.dynoconfigdemo.ConfigurationRecord;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Murat Duzgun
 *
 * Rest controller to manage configuration records
 */
@Slf4j
@RestController
@RequestMapping("/manage")
public class ConfigurationController {

    private final ConfigurationService configurationService;

    @Autowired
    public ConfigurationController(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    /**
     *  Controller method to List all records
     *  @return list of ConfigurationRecordDTO
     * */
    @GetMapping("/list")
    public List<ConfigurationRecordDTO> getConfigurationRecords() {
        return configurationService.getAllRecords();
    }

    /**
     *  Controller method to create a new record
     *  @return created ConfigurationRecordDTO
     * */
    @PostMapping("/add")
    public ConfigurationRecordDTO addConfigurationRecord(
            @RequestBody @Valid ConfigurationRecordDTO configurationRecordDTO) {

        if (!hasValueValidType(configurationRecordDTO.getValue(), configurationRecordDTO.getType())) {
            throw new PanelException("Value does not match with selected type!");
        }

        try {
            return configurationService.createRecord(configurationRecordDTO);
        } catch (DataIntegrityViolationException e) {
            throw new PanelException("You already saved this configuration before!");
        }
    }

    /**
     *  Controller method to update a record
     *  @return updated ConfigurationRecordDTO
     * */
    @PostMapping("/edit/{recordId}")
    public ConfigurationRecordDTO editConfigurationRecord(@PathVariable("recordId") Integer recordId,
            @RequestBody @Valid ConfigurationRecordDTO configurationRecordDTO) {

        if (!hasValueValidType(configurationRecordDTO.getValue(), configurationRecordDTO.getType())) {
            throw new PanelException("Value does not match with selected type!");
        }

        configurationRecordDTO.setId(recordId);

        try {
            configurationRecordDTO = configurationService.updateRecord(configurationRecordDTO);

        } catch (DataIntegrityViolationException e) {
            throw new PanelException("You already saved this configuration before!");
        }

        if (configurationRecordDTO != null) {
            return configurationRecordDTO;
        }

        throw new PanelException("Configuration record could not be found with this id:" + recordId);
    }

    /**
     *  Controller method to get record by id to able to edit record
     *  @return created ConfigurationRecordDTO
     * */
    @GetMapping("/{recordId}")
    public ConfigurationRecordDTO getConfigurationRecordById(@PathVariable("recordId") Integer recordId) {

        ConfigurationRecordDTO configurationRecordDTO = configurationService.getRecord(recordId);

        if (configurationRecordDTO != null) {
            return configurationRecordDTO;
        }

        throw new PanelException("Configuration record could not be found with this id:" + recordId);
    }

    /**
     *  Checks if value and its type matches
     * */
    private boolean hasValueValidType(String value, ConfigurationRecord.Type type) {

        if (ConfigurationRecord.Type.BOOLEAN == type) {
            return "1".equals(value) || "0".equals(value);
        }

        try {
            if (ConfigurationRecord.Type.INTEGER == type) {
                Integer.valueOf(value);
            }

            if (ConfigurationRecord.Type.DOUBLE == type) {
                Double.valueOf(value);
            }

        } catch (NumberFormatException e) {
            return false;
        }

        return true;
    }
}
