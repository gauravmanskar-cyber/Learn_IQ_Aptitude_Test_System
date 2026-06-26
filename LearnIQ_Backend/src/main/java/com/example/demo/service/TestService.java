package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Test;
import com.example.demo.repository.TestRepository;

@Service
public class TestService {
	
	private final TestRepository  testRepository;
	
	public TestService(TestRepository  testRepository) {
		this.testRepository = testRepository;
	}

	public void add(Test test) {
		testRepository.save(test);
	}
	
	
	
	public Test getById(Long id) {
			return testRepository.findById(id).orElseThrow();
	}
	
	public void update(Test test, Long id) {
		Test existing = testRepository.findById(id).orElseThrow(()->new RuntimeException("Product not Found"));
		  existing.setTitle(test.getTitle());
		  existing.setDescription(test.getDescription());
		  existing.setDuration(test.getDuration());
		  existing.setStartTime(test.getStartTime());
		  existing.setEndTime(test.getEndTime());
		  existing.setTotalMarks(test.getTotalMarks());
		  
		  testRepository.save(existing);
	
	}
	
	public List<Test> getall(){
		return testRepository.findAll();
	}
	
	public void deleteTest(Long id) {
		testRepository.deleteById(id);
		 
	}

}
