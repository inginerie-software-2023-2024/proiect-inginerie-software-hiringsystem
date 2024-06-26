package ro.hiringsystem.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ro.hiringsystem.exceptions.ApiError;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ApiError getBasicError(String customMessage, HttpServletRequest request, HttpStatus status){
        return new ApiError(
                customMessage,
                request.getRequestURI(),
                status.value(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request){
        return new ResponseEntity<>(getBasicError("Invalid password!", request, HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<Object> handleInternalAuthentication(InternalAuthenticationServiceException ex, HttpServletRequest request){
        return new ResponseEntity<>(getBasicError(ex.getMessage(), request, HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request){
        return new ResponseEntity<>(getBasicError(ex.getMessage(), request, HttpStatus.FORBIDDEN), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex, HttpServletRequest request){
        return new ResponseEntity<>(getBasicError(ex.getMessage(), request, HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

}
