package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AssignQuestionDTO;
import com.example.demo.entity.Question;
import com.example.demo.entity.Test;
import com.example.demo.entity.TestQuestion;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.repository.TestQuestionRepository;
import com.example.demo.repository.TestRepository;

@RestController
@CrossOrigin("*")
@RequestMapping(value="/test-question")
public class TestQuestionController {
	
     private final TestQuestionRepository testQuestionRepository;
     private final TestRepository testRepository;
     private final QuestionRepository questionRepository;
     
     
     
     public TestQuestionController(TestQuestionRepository testQuestionRepository,TestRepository testRepository,QuestionRepository questionRepository) {
    	 this.testQuestionRepository = testQuestionRepository;
    	 this.questionRepository = questionRepository;
    	 this.testRepository = testRepository;
     }
     

	
	@PostMapping("/assign")
	public ResponseEntity<String> assignQuestions(@RequestBody AssignQuestionDTO dto){

	    Test test = testRepository.findById(dto.getTestId()).orElseThrow();

	    for(Long questionId : dto.getQuestionIds()){

	        Question question = questionRepository.findById(questionId).orElseThrow();

	        TestQuestion tq = new TestQuestion();

	        tq.setTest(test);

	        tq.setQuestion(question);

	        testQuestionRepository.save(tq);
	    }

	    return ResponseEntity.ok("Questions Assigned Successfully");

	}

}
