package com.example.demo.service;


import org.springframework.stereotype.Service;

import com.example.demo.entity.Test;
import com.example.demo.repository.TestRepository;

@Service
public class AdminService {
	
	
	private final TestRepository testrepo;
	
	AdminService(TestRepository testrepo){
		this.testrepo = testrepo;
	}
	
	
	
	
	public void registration(Test t) {
		  testrepo.save(t);
	}
	
	public Test update(Test test, Long id) {
		Test existing = testrepo.findById(id).orElseThrow(()->new RuntimeException("Test not found"));
		existing.setTitle(test.getTitle());
		
		return testrepo.save(existing);
    }
}
