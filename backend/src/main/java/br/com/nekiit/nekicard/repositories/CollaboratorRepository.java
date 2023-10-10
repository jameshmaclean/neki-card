package br.com.nekiit.nekicard.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.nekiit.nekicard.domain.Collaborator;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {
	public List<Collaborator> findByActive(boolean active);

	public Collaborator findByEmail(String email);;
}
