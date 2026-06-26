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

import com.example.demo.entity.Question;
import com.example.demo.service.QuestionService;

@RestController
@RequestMapping(value="/questions")
@CrossOrigin("*")
public class QuestionController {
	
	private final QuestionService questionService;
	
	public QuestionController(QuestionService questionService) {
		this.questionService = questionService;
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> add(@RequestBody Question question){
			questionService.add(question);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Question added successfully..");
	}
	
	@GetMapping("/getall")
	public ResponseEntity<List<Question>> fetchall(){
		 List<Question> question = questionService.fetchall();
		return ResponseEntity.ok(question);
	}
  
	 @PutMapping("/update/{id}")
	 public ResponseEntity<String> update(@RequestBody Question question, @PathVariable Long id){
		    questionService.update(question, id);
		 return ResponseEntity.status(HttpStatus.ACCEPTED).body("Question updated Successfully..");
	 }
	 
	 @DeleteMapping("/delete/{id}")
	 public ResponseEntity<String> delete(@PathVariable Long id){
		  questionService.delete(id);
		 return ResponseEntity.status(HttpStatus.ACCEPTED).body("Question deleted successfully..");
	 }
}
