package group.artifact.exception;

import group.artifact.viewmodel.CustomExceptionVm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> ExceptionHandler(BadRequestException exception) {
        HttpStatus code = HttpStatus.BAD_REQUEST;
        CustomExceptionVm customException =
                new CustomExceptionVm(exception.getMessage(), code, ZonedDateTime.now().toInstant().toEpochMilli());
        return ResponseEntity.status(code).body(customException);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> ExceptionHandler(NotFoundException exception) {
        HttpStatus code = HttpStatus.BAD_REQUEST;
        CustomExceptionVm customException =
                new CustomExceptionVm(exception.getMessage(), code, ZonedDateTime.now().toInstant().toEpochMilli());
        return ResponseEntity.status(code).body(customException);
    }

}
