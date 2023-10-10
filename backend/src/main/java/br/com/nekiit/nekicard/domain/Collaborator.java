package br.com.nekiit.nekicard.domain;

import java.util.Date;

import br.com.nekiit.nekicard.dtos.CollaboratorSignUpData;
import br.com.nekiit.nekicard.dtos.CollaboratorUpdateData;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "colaboradores")
public class Collaborator {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "col_cd_id")
	private Long id;

	@Column(name = "col_tx_email", unique = true)
	@NotNull(message = "O Email não pode ser nulo")
	@Pattern(regexp = ".*@(neki(-it)?\\.com\\.br)$", message = "O e-mail deve pertencer a @neki.com.br ou @neki-it.com.br")
	private String email;

	@NotNull(message = "O Nome não pode ser nulo")
	@Column(name = "col_tx_nome_completo")
	private String fullName;

	@Column(name = "col_tx_nome_social")
	private String socialName = "Não informado";

	@Column(name = "col_tx_telefone")
	private String telephone = "Não informado";

	@Column(name = "col_tx_linkedin")
	private String linkedin = "Não informado";

	@Column(name = "col_tx_github")
	private String gitHub = "Não informado";

	@Column(name = "col_tx_instagram")
	private String instagram = "Não informado";

	@Column(name = "col_tx_facebook")
	private String facebook = "Não informado";

	@Temporal(TemporalType.DATE)
	@NotNull(message = "A data de nascimento não pode ser nulo")
	@Column(name = "col_dt_data_nascimento")
	private Date birthDate;

	@Column(name = "col_tx_foto")
	@NotNull
	private String photo;

	@Column(name = "col_bl_ativo")
	private Boolean active = true;

	public Collaborator() {
	}

	public Collaborator(CollaboratorSignUpData collaborator) {
		this.birthDate = collaborator.birthDate();
		this.fullName = collaborator.fullName();
		this.email = collaborator.email();
		this.facebook = collaborator.facebook();
		this.instagram = collaborator.instagram();
		this.linkedin = collaborator.linkedin();
		this.gitHub = collaborator.gitHub();
		this.socialName = collaborator.socialName();
		this.telephone = collaborator.telephone();
		this.active = true;
	}

	public void updateData(CollaboratorUpdateData collaborator) {
		this.fullName = collaborator.fullName();
		this.socialName = collaborator.socialName();
		this.facebook = collaborator.facebook();
		this.instagram = collaborator.instagram();
		this.linkedin = collaborator.linkedin();
		this.gitHub = collaborator.gitHub();
		this.telephone = collaborator.telephone();
		this.birthDate = collaborator.birthDate();
		this.email = collaborator.email();
	}

	public void updatePhoto(String photo) {
		this.photo = photo;
	}

	public void desactivateCollaborator() {
		this.active = false;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getSocialName() {
		return socialName;
	}

	public void setSocialName(String socialName) {
		this.socialName = socialName;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getLinkedin() {
		return linkedin;
	}

	public void setLinkedin(String linkedin) {
		this.linkedin = linkedin;
	}

	public String getGitHub() {
		return gitHub;
	}

	public void setGitHub(String gitHub) {
		this.gitHub = gitHub;
	}

	public String getInstagram() {
		return instagram;
	}

	public void setInstagram(String instagram) {
		this.instagram = instagram;
	}

	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

}
