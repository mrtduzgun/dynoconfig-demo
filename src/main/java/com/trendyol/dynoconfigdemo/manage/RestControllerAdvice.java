package com.trendyol.dynoconfigdemo.manage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@org.springframework.web.bind.annotation.RestControllerAdvice
@Slf4j
public class RestControllerAdvice implements ResponseBodyAdvice {

    @ExceptionHandler(PanelException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public PanelRestResponse<Object> handlerException(PanelException e) {

        log.error("An panel error is occured!", e);

        return PanelRestResponse
                .builder()
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public PanelRestResponse<Object> handlerException(Exception e) {

        log.error("Unhandled error is occured!", e);

        return PanelRestResponse
                .builder()
                .message("System error is occured!")
                .build();
    }

    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass,
                                  ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {

        if (o instanceof PanelRestResponse)
            return o;

        return PanelRestResponse.builder().data(o).build();
    }
}