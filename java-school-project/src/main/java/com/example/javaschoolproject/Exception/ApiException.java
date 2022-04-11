package com.example.javaschoolproject.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

//@Data
//@AllArgsConstructor
public record ApiException(String message, HttpStatus httpStatus,
                           ZonedDateTime zonedDateTime) {
}
