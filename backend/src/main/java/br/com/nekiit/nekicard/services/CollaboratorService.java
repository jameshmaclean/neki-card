package br.com.nekiit.nekicard.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.nekiit.nekicard.domain.Collaborator;
import br.com.nekiit.nekicard.dtos.CollaboratorDetailsDTO;
import br.com.nekiit.nekicard.dtos.CollaboratorResponseDTO;
import br.com.nekiit.nekicard.dtos.CollaboratorSignUpData;
import br.com.nekiit.nekicard.dtos.CollaboratorUpdateData;
import br.com.nekiit.nekicard.exceptions.CollaboratorNotFoundException;
import br.com.nekiit.nekicard.repositories.CollaboratorRepository;
import br.com.nekiit.nekicard.security.dtos.JwtResponseDTO;
import br.com.nekiit.nekicard.security.dtos.LoginRequestDTO;
import br.com.nekiit.nekicard.security.jwt.JwtUtils;
import br.com.nekiit.nekicard.security.repositories.RoleRepository;
import br.com.nekiit.nekicard.security.repositories.UserRepository;
import br.com.nekiit.nekicard.security.services.UserDetailsImpl;

@Service
public class CollaboratorService {
	
  private String UPLOAD_FOLDER = "uploads";

  @Autowired
  AuthenticationManager authenticationManager;
  @Autowired
  JwtUtils jwtUtils;
  @Autowired
  CollaboratorRepository collaboratorRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  PasswordEncoder encoder;
  @Autowired
  RoleRepository roleRepository;

  public CollaboratorResponseDTO signUp(CollaboratorSignUpData collaborator) {
    try {
      Collaborator collaboratorToSave = new Collaborator(collaborator);
      collaboratorToSave.setPhoto("");
      collaboratorRepository.save(collaboratorToSave);
      CollaboratorResponseDTO response = new CollaboratorResponseDTO(collaboratorToSave);
      return response;
    } catch (RuntimeException error) {
      throw new RuntimeException(error);
    }
  }


  public List<CollaboratorDetailsDTO> listAllColaborators() {
    List<Collaborator> collaborators = collaboratorRepository.findByActive(true);
    return collaborators.stream()
        .map(CollaboratorDetailsDTO::new)
        .toList();
  }

  public CollaboratorDetailsDTO getCollaboratorDetails(Long id) {
    return new CollaboratorDetailsDTO(collaboratorRepository.findById(id)
        .orElseThrow(() -> new CollaboratorNotFoundException("Colaborator not found with id: " + id)));
  }

  public CollaboratorDetailsDTO updateCollaborator(Long id, CollaboratorUpdateData userData)
      throws IOException {
    Collaborator collaborator = collaboratorRepository.findById(id)
        .orElseThrow(() -> new CollaboratorNotFoundException("Collaborator not found with id " + id));
    
    if(userData!=null) {
        collaborator.updateData(userData);
    }
    
    collaboratorRepository.save(collaborator);
    return new CollaboratorDetailsDTO(collaborator);
  }
  
  public String updateCollaboratorAvatar(MultipartFile photo, String email) throws IOException {
	  if (photo != null) {
		  Collaborator collaborator = collaboratorRepository.findByEmail(email);
	      String originalFileName = photo.getOriginalFilename();
	      String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
	      String regex = "^(.+)@.*$";
	      Pattern pattern = Pattern.compile(regex);
	      Matcher matcher = pattern.matcher(email);
	      String nameBeforeAt = "";
	      if (matcher.matches()) {
	        nameBeforeAt = matcher.group(1);
	      }
	      String name = nameBeforeAt;
	      String fileNameToSave = name + "_avatar." + fileExtension;

	      Path uploadPath = Paths.get(System.getProperty("user.dir"), UPLOAD_FOLDER);
	      Path fileNameAndPath = uploadPath.resolve(fileNameToSave);
	      Files.createDirectories(uploadPath);
	      Files.delete(fileNameAndPath);
	      Files.write(fileNameAndPath, photo.getBytes());
	      collaborator.updatePhoto(fileNameToSave);
	      collaboratorRepository.save(collaborator);
	    }
      return "UPDATED";

  }

  public byte[] getCollaboratorAvatar(String path) {
    Path photoPath = Paths.get(UPLOAD_FOLDER).resolve(path);
    try {
      return Files.readAllBytes(photoPath);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

  }

  public void deleteCollaborator(Long id) {
    Collaborator collaboratorToDelete = collaboratorRepository.findById(id)
        .orElseThrow(() -> new CollaboratorNotFoundException("Collaborator not found with id " + id));
    collaboratorToDelete.desactivateCollaborator();
    collaboratorRepository.save(collaboratorToDelete);
  }

public String registerAvatar(MultipartFile photo, String email) throws IOException {
	Collaborator collaborator = collaboratorRepository.findByEmail(email);
	String originalFileName = photo.getOriginalFilename();
    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
    String regex = "^(.+)@.*$";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(collaborator.getEmail());
    String nameBeforeAt = "";
    if (matcher.matches()) {
      nameBeforeAt = matcher.group(1);
    }
    String name = nameBeforeAt;
    String fileNameToSave = name + "_avatar." + fileExtension;

    Path uploadPath = Paths.get(System.getProperty("user.dir"), UPLOAD_FOLDER);
    Path fileNameAndPath = uploadPath.resolve(fileNameToSave);
    Files.createDirectories(uploadPath);
    Files.write(fileNameAndPath, photo.getBytes());
    collaborator.setPhoto(fileNameToSave);
    collaboratorRepository.save(collaborator);
	return "OK";
}
}
