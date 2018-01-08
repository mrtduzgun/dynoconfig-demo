package com.trendyol.dynoconfigdemo;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Murat Duzgun
 * <p>
 * Entity to store for each record
 */
@Entity
@Data
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames={"name", "appName", "isActive"})
})
public class ConfigurationRecord {

    /**
     *  Available types for values
     * */
    public enum Type {
        INTEGER,
        STRING,
        DOUBLE,
        BOOLEAN
    }

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable = false)
    private String value;

    @Column(nullable = false)
    private boolean isActive = false;

    @Column(nullable = false)
    private String appName;
}
