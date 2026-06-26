package com.example.demo.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Test;
import com.example.demo.service.AdminService;

@RestController
@RequestMapping(value="/Admin")
@CrossOrigin("*")
public class AdminController {
	
	
	private final AdminService adminservice;
	
	AdminController(AdminService adminservice){
		this.adminservice = adminservice;
	}
	
	
	@PostMapping("/test")
	public ResponseEntity<String> registration(@RequestBody Test t) {
		 
		try {
			adminservice.registration(t);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Test Sheduling conform");
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Test Not Sechuled");
		}
	}
	
	
	@PostMapping("/update/{id}")
	public ResponseEntity<String> update(@RequestBody Test test, @PathVariable Long id){
		try {
			Test update = adminservice.update(test, id);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("updatation succesfully...");
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("not updated...");

		}
	}

}
