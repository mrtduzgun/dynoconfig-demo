package com.trendyol.dynoconfigdemo.manage;

import com.trendyol.dynoconfigdemo.ConfigurationRecord;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

/**
 * @author Murat Duzgun
 * <p>
 * Class description here
 */
@Data
public class ConfigurationRecordDTO {

    private Integer id;

    @NotEmpty
    private String name;

    @NotNull
    private ConfigurationRecord.Type type;

    @NotEmpty
    private String appName;

    @NotEmpty
    private String value;

    @NotNull
    private boolean isActive;

    public static boolean isValidConfigurationType(String type) {
        try {
            Enum.valueOf(ConfigurationRecord.Type.class, type);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
