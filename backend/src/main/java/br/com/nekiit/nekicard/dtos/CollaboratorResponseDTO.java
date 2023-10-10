package br.com.nekiit.nekicard.dtos;

import br.com.nekiit.nekicard.domain.Collaborator;

public record CollaboratorResponseDTO(String email, Long id) {
	public CollaboratorResponseDTO(Collaborator collaborator) {
		this(collaborator.getEmail(), collaborator.getId());
	}
}
