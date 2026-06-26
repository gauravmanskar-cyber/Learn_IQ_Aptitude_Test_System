package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Answer {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	 

	    @ManyToOne
	    @JoinColumn(name = "attempt_id")
	    private Attempt attempt;

	    @ManyToOne
	    @JoinColumn(name = "question_id")
	    private Question question;

	    private String selectedOption;
	    private boolean isCorrect;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Attempt getAttempt() {
			return attempt;
		}
		public void setAttempt(Attempt attempt) {
			this.attempt = attempt;
		}
		public Question getQuestion() {
			return question;
		}
		public void setQuestion(Question question) {
			this.question = question;
		}
		public String getSelectedOption() {
			return selectedOption;
		}
		public void setSelectedOption(String selectedOption) {
			this.selectedOption = selectedOption;
		}
		public boolean isCorrect() {
			return isCorrect;
		}
		public void setCorrect(boolean isCorrect) {
			this.isCorrect = isCorrect;
		}
	    
	    
	    

}
