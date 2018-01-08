package com.trendyol.dynoconfigdemo.manage;

/**
 * @author Murat Duzgun
 * <p>
 * Class description here
 */
public class PanelException extends RuntimeException {

    public PanelException() {
    }

    public PanelException(String message) {
        super(message);
    }

    public PanelException(String message, Throwable cause) {
        super(message, cause);
    }
}
