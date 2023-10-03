package br.com.nekiit.nekicard.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import br.com.nekiit.nekicard.exceptions.EmailAlreadyExistsException;
import br.com.nekiit.nekicard.repositories.CollaboratorRepository;
import br.com.nekiit.nekicard.security.domains.Role;
import br.com.nekiit.nekicard.security.domains.User;
import br.com.nekiit.nekicard.security.dtos.JwtResponseDTO;
import br.com.nekiit.nekicard.security.dtos.LoginRequestDTO;
import br.com.nekiit.nekicard.security.enums.RoleEnum;
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

  public CollaboratorResponseDTO signUp(CollaboratorSignUpData collaborator, MultipartFile photo) {
    Collaborator collaboratorToSave = new Collaborator(collaborator);
    try {
      if (userRepository.existsByUsername(collaborator.email())) {
        throw new EmailAlreadyExistsException("Esse e-mail já foi cadastrado");
      }
      User user = new User(collaborator.email(), collaborator.email(), encoder.encode(collaborator.password()));
      Set<String> strRoles = new HashSet<String>();
      strRoles.add("user");
      Set<Role> roles = new HashSet<>();
      Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Erro: Role não encontrada."));
      roles.add(userRole);
      user.setRoles(roles);
      String originalFileName = photo.getOriginalFilename();
      String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);

      String regex = "^(.+)@.*$";
      Pattern pattern = Pattern.compile(regex);
      Matcher matcher = pattern.matcher(collaborator.email());
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
      collaboratorToSave.setPhoto(fileNameToSave);
      userRepository.save(user);
      collaboratorToSave.setUser(user);
      collaboratorRepository.save(collaboratorToSave);
      CollaboratorResponseDTO response = new CollaboratorResponseDTO(collaboratorToSave);
      return response;
    } catch (IOException error) {
      throw new RuntimeException(error);
    }
  }

  public JwtResponseDTO signIn(LoginRequestDTO userData) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(userData.getUsername(), userData.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());
    return new JwtResponseDTO(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles);
  }

  public Page<CollaboratorDetailsDTO> listAllColaborators(Pageable pageable) {
    return collaboratorRepository.findAll(pageable).map(CollaboratorDetailsDTO::new);
  }

  public CollaboratorDetailsDTO getCollaboratorDetails(Long id) {
    CollaboratorDetailsDTO collaboratorDTO = new CollaboratorDetailsDTO(collaboratorRepository.findById(id)
        .orElseThrow(() -> new CollaboratorNotFoundException("Colaborator not found with id: " + id)));
    return collaboratorDTO;
  }

  public CollaboratorDetailsDTO updateCollaborator(Long id, CollaboratorUpdateData userData) {
    Collaborator collaborator = collaboratorRepository.findById(id)
        .orElseThrow(() -> new CollaboratorNotFoundException("Collaborator not found with id " + id));
    collaborator.updateData(userData);
    collaboratorRepository.save(collaborator);
    return new CollaboratorDetailsDTO(collaborator);
  }

  public byte[] getCollaboratorAvatar(String path) {
    Path photoPath = Paths.get(UPLOAD_FOLDER).resolve(path);
    try {
      byte[] photoBytes = Files.readAllBytes(photoPath);
      return photoBytes;
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
}
