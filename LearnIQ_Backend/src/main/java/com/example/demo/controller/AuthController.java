package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.JwtService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	
  private final AuthService authservice;
  
  private final AuthenticationManager authManager;
  
  private final JwtService jwtService;
  
  private final UserRepository userRepository;

  
 public AuthController(AuthService authservice,AuthenticationManager authManager,JwtService jwtService,UserRepository userRepository){
	  this.authservice = authservice;
	  this.authManager = authManager;
	  this.jwtService = jwtService;
	  this.userRepository = userRepository;
  }
  
  @PostMapping("/registration")
  ResponseEntity<String> registration(@RequestBody User user){
	  authservice.registration(user);
	  return ResponseEntity.status(HttpStatus.ACCEPTED).body("Registration Suceessfully");
  }
  
  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(
          @RequestBody LoginRequest request) {

      Authentication authentication =
              authManager.authenticate(
                      new UsernamePasswordAuthenticationToken(
                              request.getEmail(),
                              request.getPassword()
                      )
              );
      
      if (!authentication.isAuthenticated()) {
          throw new RuntimeException("Invalid credentials");
      }

      String token =
              jwtService.generateToken(request.getEmail());

      User user =
              userRepository.findByEmail(request.getEmail());

      AuthResponse response =
              new AuthResponse(token, user.getRole(),user.getId());

      return ResponseEntity.ok(response);
  }

  

}
