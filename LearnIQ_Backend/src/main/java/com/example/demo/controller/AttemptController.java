package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RankingDTO;
import com.example.demo.dto.SubmitTestRequestDTO;
import com.example.demo.dto.SubmitTestResponseDTO;
import com.example.demo.service.AttemptService;

@RestController
@RequestMapping(value="/attempt")
@CrossOrigin("*")
public class AttemptController {

    
	
	private final AttemptService attemptService;
	
	
	public AttemptController(AttemptService attemptService) {
		this.attemptService = attemptService;
	}
	
	
	@PostMapping("/submit-test")
	public ResponseEntity<SubmitTestResponseDTO> submitTest(@RequestBody SubmitTestRequestDTO request){

	    return ResponseEntity.ok(attemptService.submitTest(request));
	}
	
    @GetMapping("/history")
    public ResponseEntity<?> getHistory(Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                attemptService.getHistory(email)
        );
    }
    
    @GetMapping("/rankings")
    public List<RankingDTO> getRankings() {

        return attemptService.getRankings();
    }

	

}
