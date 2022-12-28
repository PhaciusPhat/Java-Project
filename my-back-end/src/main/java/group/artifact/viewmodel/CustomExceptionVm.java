package group.artifact.viewmodel;

import org.springframework.http.HttpStatus;

public record CustomExceptionVm(String message, HttpStatus httpStatus, Long timestamp) {
}
