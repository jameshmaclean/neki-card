package br.com.nekiit.nekicard.dtos;

import java.util.Date;

import br.com.nekiit.nekicard.domain.Collaborator;

public record CollaboratorUpdateData(String fullName, String socialName, Date birthDate, String email, String photo,
		String telephone, String linkedin, String gitHub, String instagram, String facebook) {
	public CollaboratorUpdateData(Collaborator collaborator) {
		this(collaborator.getFullName(), collaborator.getSocialName(), collaborator.getBirthDate(),
				collaborator.getEmail(), collaborator.getPhoto(), collaborator.getTelephone(),
				collaborator.getLinkedin(), collaborator.getGitHub(), collaborator.getInstagram(),
				collaborator.getFacebook());
	}
}
