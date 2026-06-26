package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Question;
import com.example.demo.repository.QuestionRepository;

@Service
public class QuestionService {
	
	private final QuestionRepository questionRepository;
	
	public QuestionService(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
		
	}
	
	public void add(Question question) {
		questionRepository.save(question);
	}
	
	public List<Question> fetchall(){
		return questionRepository.findAll();
	}
	
	public void update(Question question, Long id) {
		Question exsting = questionRepository.findById(id).orElseThrow(()->new RuntimeException("Product not Found"));
		
		exsting.setQuestionText(question.getQuestionText());
		exsting.setOptionA(question.getOptionA());
		exsting.setOptionB(question.getOptionB());
		exsting.setOptionC(question.getOptionC());
		exsting.setOptionD(question.getOptionD());
		exsting.setCorrectAnswer(question.getCorrectAnswer());
		
		questionRepository.save(exsting);
		
	}
	
	public void delete(Long id) {
		questionRepository.deleteById(id);
	}

}
