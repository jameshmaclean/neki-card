package br.com.nekiit.nekicard.exceptions;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class Exceptions {

	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<ErrorData> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
		ErrorData errorData = new ErrorData(ex.getMessage(), "Esse email já existe");
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorData);
	}

	@ExceptionHandler(CollaboratorNotFoundException.class)
	public ResponseEntity<ErrorData> handleCollaboratorNotFound(CollaboratorNotFoundException ex) {
		ErrorData errorData = new ErrorData("Collaborator not found", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorData);
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException ex) {
		return ResponseEntity.notFound().build();
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException exception) {
		String errorMessage = exception.getConstraintViolations().stream()
				.map(constraintViolation -> constraintViolation.getMessage()).findFirst().orElse("Erro de validação");

		String fields = exception.getConstraintViolations().stream()
				.map(constraintViolation -> constraintViolation.getPropertyPath().toString()).findFirst().orElse("N/A");

		ErrorData error = new ErrorData(fields, errorMessage);
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<?> handleSqlConstraint(DataIntegrityViolationException exception) {
		String errorMessage = "Colaborador já cadastrado";
		;

		return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
		List<ErrorData> errors = exception.getFieldErrors().stream().map(ErrorData::new).collect(Collectors.toList());
		return ResponseEntity.badRequest().body(errors);
	}

	@ExceptionHandler(MissingServletRequestPartException.class)
	public ResponseEntity<?> handleMissingServletRequestPartException(MissingServletRequestPartException exception) {
		ErrorData errorData = new ErrorData(exception.getMessage(), "Preencha todos os campos");
		return new ResponseEntity<>(errorData, HttpStatus.BAD_REQUEST);
	}

	private record ErrorData(String field, String message) {
		public ErrorData(FieldError error) {
			this(error.getField(), error.getDefaultMessage());
		}
	}
}
