package com.example.demo.dto;

import java.util.List;

public class AssignQuestionDTO {
	
	 private Long testId;

	    private List<Long> questionIds;

	    public Long getTestId() {
	        return testId;
	    }

	    public void setTestId(Long testId) {
	        this.testId = testId;
	    }

	    public List<Long> getQuestionIds() {
	        return questionIds;
	    }

	    public void setQuestionIds(List<Long> questionIds) {
	        this.questionIds = questionIds;
	    }


}
