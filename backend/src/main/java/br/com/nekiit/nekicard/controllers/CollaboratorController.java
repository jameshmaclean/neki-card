package br.com.nekiit.nekicard.controllers;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.nekiit.nekicard.dtos.CollaboratorDetailsDTO;
import br.com.nekiit.nekicard.dtos.CollaboratorResponseDTO;
import br.com.nekiit.nekicard.dtos.CollaboratorSignUpData;
import br.com.nekiit.nekicard.dtos.CollaboratorUpdateData;
import br.com.nekiit.nekicard.security.dtos.JwtResponseDTO;
import br.com.nekiit.nekicard.security.dtos.LoginRequestDTO;
import br.com.nekiit.nekicard.services.CollaboratorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController()
@RequestMapping("/collaborators")
@Valid
public class CollaboratorController {
	@Autowired
	CollaboratorService collaboratorService;

	@PostMapping(value = "/register")
	@SecurityRequirement(name = "Bearer Auth")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> signUp(@RequestBody CollaboratorSignUpData collaborator, UriComponentsBuilder uri) {
		CollaboratorResponseDTO collaboratorSaved = collaboratorService.signUp(collaborator);
		URI resourcePath = uri.path("/collaborators/{id}").buildAndExpand(collaboratorSaved.id()).toUri();
		return ResponseEntity.created(resourcePath).body(collaboratorSaved);
	}

	@PostMapping(value = "/registerAvatar/{email}")
	@SecurityRequirement(name = "Bearer Auth")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> signUp(@RequestBody MultipartFile photo, @PathVariable String email)
			throws IOException {
		String resultado = collaboratorService.registerAvatar(photo, email);
		return ResponseEntity.ok(resultado);
	}

	@SecurityRequirement(name = "Bearer Auth")
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<List<CollaboratorDetailsDTO>> listAllColaborators() {
		List<CollaboratorDetailsDTO> collaborators = collaboratorService.listAllColaborators();
		return ResponseEntity.ok(collaborators);
	}

	@GetMapping("/collaborator/{id}")
	public ResponseEntity<CollaboratorDetailsDTO> getCollaboratorDetails(@PathVariable Long id) {
		CollaboratorDetailsDTO collaboratorDetails = collaboratorService.getCollaboratorDetails(id);
		return ResponseEntity.ok(collaboratorDetails);
	}

	@PutMapping("/collaborator/{id}")
	@SecurityRequirement(name = "Bearer Auth")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<CollaboratorDetailsDTO> collaboratorDataUpdate(@PathVariable Long id,
			@RequestBody CollaboratorUpdateData collaborator) throws IOException {
		CollaboratorDetailsDTO collaboratorUpdated = collaboratorService.updateCollaborator(id, collaborator);
		return ResponseEntity.ok(collaboratorUpdated);
	}

	@PutMapping(value = "/updateAvatar/{email}")
	@SecurityRequirement(name = "Bearer Auth")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> updateAvatar(@RequestBody MultipartFile photo, @PathVariable String email)
			throws IOException {
		String resultado = collaboratorService.updateCollaboratorAvatar(photo, email);
		return ResponseEntity.ok(resultado);
	}

	@GetMapping("/avatar/{avatar}")
	public ResponseEntity<byte[]> getAvatar(@PathVariable String avatar) {
		byte[] data = collaboratorService.getCollaboratorAvatar(avatar);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(data);
	}

	@DeleteMapping("/collaborator/{id}")
	@SecurityRequirement(name = "Bearer Auth")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteCollaborator(@PathVariable Long id) {
		collaboratorService.deleteCollaborator(id);
		return ResponseEntity.ok("Deletado com sucesso");
	}
}
