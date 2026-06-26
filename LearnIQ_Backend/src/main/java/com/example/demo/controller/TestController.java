package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Test;
import com.example.demo.service.TestService;

@RestController
@RequestMapping(value="/tests")
@CrossOrigin("*")
public class TestController {
	
	private final TestService testService;
	
	public TestController(TestService testService) {
		this.testService = testService;
	}
	
	@PostMapping("/add")
	ResponseEntity<String> addTest(@RequestBody Test test){
		testService.add(test);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Test Inserted Successfully..");
	}
	
	
	
	@GetMapping("/{id}")
	ResponseEntity<Test>  getById(@PathVariable Long id){
		Test test = testService.getById(id);
		return ResponseEntity.ok(test);
	}
	
	@PutMapping("/update/{id}")
	ResponseEntity<String> updateTest(@RequestBody Test test, @PathVariable Long id){
		 testService.update(test, id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Test Updated Successfully..");
	}
	
	@GetMapping("/getall")
	ResponseEntity<List<Test>> getall(){
		  List<Test> test = testService.getall();
		return ResponseEntity.ok(test);
		
	}
	
	@DeleteMapping("/delete/{id}")
	ResponseEntity<String> deleteTest(@PathVariable Long id){
		 testService.deleteTest(id);
	return ResponseEntity.status(HttpStatus.ACCEPTED).body("Test Deleted Successfully..");
	}
       
	}
