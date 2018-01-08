package com.trendyol.dynoconfigdemo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Murat Duzgun
 * <p>
 * Class description here
 */
@Repository
public interface ConfigurationRecordRepository extends CrudRepository<ConfigurationRecord, Integer> {
}
