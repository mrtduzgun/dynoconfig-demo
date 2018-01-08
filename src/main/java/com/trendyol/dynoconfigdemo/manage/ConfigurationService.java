package com.trendyol.dynoconfigdemo.manage;

import java.util.List;

/**
 * @author Murat Duzgun
 * <p>
 * Class description here
 */
public interface ConfigurationService {

    ConfigurationRecordDTO createRecord(ConfigurationRecordDTO configurationRecordDTO);

    ConfigurationRecordDTO updateRecord(ConfigurationRecordDTO configurationRecordDTO);

    List<ConfigurationRecordDTO> getAllRecords();

    ConfigurationRecordDTO getRecord(Integer recordId);
}
