package com.example.demo.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.demo.dto.ScheduleRequestDto;
import com.example.demo.dto.TestRequestDto;
import com.example.demo.entity.TestRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.TestRequestRepository;
import com.example.demo.repository.UserRepository;

@Service
public class TestRequestService {

   

	    private final TestRequestRepository testRequestRepository;
	    private final UserRepository userRepository;
	    
	    public TestRequestService(TestRequestRepository testRequestRepository,UserRepository userRepository) {
	    	this.testRequestRepository = testRequestRepository;
	    	this.userRepository = userRepository;
	    
	    }


	    public TestRequest sendRequest(TestRequestDto dto) {

	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	        String email = authentication.getName();

	        User user = userRepository.findByEmail(email);

	        TestRequest request = new TestRequest();

	        request.setStudentId(
	                user.getId());

	        request.setTestName(
	                dto.getTestName());

	        request.setDescription(
	                dto.getDescription());

	        request.setPreferredDate(
	                dto.getPreferredDate());

	        request.setPreferredTime(
	                dto.getPreferredTime());

	        request.setStatus("PENDING");

	        return testRequestRepository
	                .save(request);
	    }
	    
	    public List<TestRequest> getMyRequest(){
	    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    	
	    	String email = authentication.getName();
	    	System.out.println(email);
	    	
	    	User user = userRepository.findByEmail(email);
	    
	    	return testRequestRepository.findByStudentId(user.getId());
	    }
	    
	    public List<TestRequest> getAllRequest(){
	    	return testRequestRepository.findAll();
	    }
	    
	 // Approve Request
	    public TestRequest approveRequest(Long requestId) {

	        TestRequest request = testRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request Not Found"));

	        request.setStatus("APPROVED");

	        return testRequestRepository.save(request);
	    }

	    // Reject Request
	    public TestRequest rejectRequest(Long requestId) {

	        TestRequest request = testRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request Not Found"));

	        request.setStatus("REJECTED");

	        return testRequestRepository.save(request);
	    }



public TestRequest scheduleRequest( Long requestId, ScheduleRequestDto dto) {

    TestRequest request = testRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request Not Found"));
    request.setTestId(dto.getTestId());

    request.setScheduledDate(
            dto.getScheduledDate());

    request.setScheduledTime(
            dto.getScheduledTime());

    request.setDuration(
            dto.getDuration());

    request.setAdminRemark(
            dto.getAdminRemark());

    request.setStatus("APPROVED");

    return testRequestRepository.save(request);
}


}


