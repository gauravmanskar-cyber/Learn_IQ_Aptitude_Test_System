package com.example.demo.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ScheduleRequestDto;
import com.example.demo.dto.TestRequestDto;

import com.example.demo.service.TestRequestService;

@RestController
@RequestMapping(value ="/request-test")
@CrossOrigin("*")
public class TestRequestController {
	
	private final TestRequestService testRequestService;
	
	
	public TestRequestController(TestRequestService testRequestService){
		this.testRequestService = testRequestService;
	}
	

    @PostMapping("/send")
    public ResponseEntity<?> sendRequest( @RequestBody TestRequestDto dto) {

          testRequestService.sendRequest(dto);

        return ResponseEntity.ok("Request Sent Successfully");

}
    @GetMapping("/my-requests")
    public ResponseEntity<?> getMyRequest(){  
    	
    	return ResponseEntity.ok(testRequestService.getMyRequest());
    }
    
    
    @GetMapping("/getall")
    public ResponseEntity<?> getallRequest(){ 
    	return ResponseEntity.ok(testRequestService.getAllRequest());
    }
    
    
    // Approve
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveRequest(@PathVariable Long id) {

        return ResponseEntity.ok(testRequestService.approveRequest(id));
    }

    // Reject
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectRequest(
            @PathVariable Long id) {

        return ResponseEntity.ok(
        		testRequestService.rejectRequest(id)
        );
    }
    
    @PutMapping("/{id}/schedule")
    public ResponseEntity<?> scheduleRequest(@PathVariable Long id, @RequestBody ScheduleRequestDto dto) {

        return ResponseEntity.ok(testRequestService.scheduleRequest(id, dto)
        		);
    }
}
