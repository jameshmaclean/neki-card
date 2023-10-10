package br.com.nekiit.nekicard.dtos;

import java.util.Date;

import br.com.nekiit.nekicard.domain.Collaborator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CollaboratorSignUpData(
		@Pattern(regexp = ".*@(neki(-it)?\\.com\\.br)$", message = "O e-mail deve pertencer a @neki.com.br ou @neki-it.com.br") String email,
		@NotBlank String fullName, String socialName, @NotBlank Date birthDate, @NotBlank String photo,
		String telephone, String linkedin, String gitHub, String instagram, String facebook) {
	public CollaboratorSignUpData(Collaborator collaborator) {
		this(collaborator.getEmail(), collaborator.getFullName(), collaborator.getSocialName(),
				collaborator.getBirthDate(), collaborator.getPhoto(), collaborator.getTelephone(),
				collaborator.getLinkedin(), collaborator.getGitHub(), collaborator.getInstagram(),
				collaborator.getFacebook());
	}
}
