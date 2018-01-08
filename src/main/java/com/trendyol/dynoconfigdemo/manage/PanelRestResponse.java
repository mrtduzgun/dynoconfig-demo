package com.trendyol.dynoconfigdemo.manage;

import lombok.Builder;
import lombok.Data;

/**
 * @author Murat Duzgun
 * <p>
 * Class description here
 */
@Data
@Builder
public class PanelRestResponse<T> {

    private String message;

    private T data;
}
