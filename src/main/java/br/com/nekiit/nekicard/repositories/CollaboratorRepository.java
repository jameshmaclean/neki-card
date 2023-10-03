package br.com.nekiit.nekicard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nekiit.nekicard.domain.Collaborator;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {

}
