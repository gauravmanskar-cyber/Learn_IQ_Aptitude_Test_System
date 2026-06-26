package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.TestRequest;

@Repository
public interface TestRequestRepository extends JpaRepository<TestRequest,Long>{
	
	List<TestRequest> findByStudentId(Long studentId);

	
}
