package br.com.nekiit.nekicard.dtos;

import java.util.Date;

import br.com.nekiit.nekicard.domain.Collaborator;

public record CollaboratorDetailsDTO(
    String fullName,
    String socialName,
    Date birthDate,
    String photo,
    String telephone,
    String linkedin,
    String gitHub,
    String instagram,
    String facebook) {
  public CollaboratorDetailsDTO(Collaborator collaborator) {
    this(collaborator.getFullName(), collaborator.getSocialName(), collaborator.getBirthDate(), collaborator.getPhoto(),
        collaborator.getTelephone(), collaborator.getLinkedin(), collaborator.getGitHub(), collaborator.getInstagram(),
        collaborator.getFacebook());
  }

}
