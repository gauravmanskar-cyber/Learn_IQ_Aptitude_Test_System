package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Attempt;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt,Long>{
	
	List<Attempt> findByUserId(Long userId);
	
	 List<Attempt> findByStatusOrderByScoreDesc(String status);

}
