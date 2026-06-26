package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.AttemptHistoryDto;
import com.example.demo.dto.QuestionResultDTO;
import com.example.demo.dto.RankingDTO;
import com.example.demo.dto.SubmitTestRequestDTO;
import com.example.demo.dto.SubmitTestResponseDTO;
import com.example.demo.entity.Attempt;
import com.example.demo.entity.Question;
import com.example.demo.entity.Test;
import com.example.demo.entity.TestQuestion;
import com.example.demo.entity.User;
import com.example.demo.repository.AttemptRepository;
import com.example.demo.repository.TestRepository;
import com.example.demo.repository.UserRepository;

@Service
public class AttemptService {
	
	
	private final AttemptRepository attemptRepository;
	
	 private final TestRepository testRepository;
	 
	 private final UserRepository userRepository;
	 
	 private final EmailService emailService;
	
	public AttemptService(AttemptRepository attemptRepository,TestRepository testRepository,UserRepository userRepository,EmailService emailService) {
		this.attemptRepository = attemptRepository;
		this.testRepository = testRepository;
		this.userRepository = userRepository;
		this.emailService = emailService;
		
	}
	
	public SubmitTestResponseDTO submitTest(SubmitTestRequestDTO request) {

	    Test test = testRepository.findById(request.getTestId())
	            .orElseThrow(() -> new RuntimeException("Test Not Found"));

	    User user = userRepository.findById(request.getUserId())
	            .orElseThrow(() -> new RuntimeException("User Not Found"));
	    

	    int score = 0;

	    List<QuestionResultDTO> results = new ArrayList<>();

	    for (TestQuestion tq : test.getTestQuestion()) {

	        Question question = tq.getQuestion();

	        String correctAnswer = question.getCorrectAnswer();

	        String selectedAnswer =
	                request.getAnswers()
	                        .get(question.getId().toString());

	        boolean isCorrect =
	                correctAnswer != null &&
	                correctAnswer.equals(selectedAnswer);

	        if (isCorrect) {
	            score++;
	        }

	        QuestionResultDTO result =
	                new QuestionResultDTO();

	        result.setQuestionId(question.getId());
	        result.setQuestionText(question.getQuestionText());
	        result.setSelectedAnswer(selectedAnswer);
	        result.setCorrectAnswer(correctAnswer);
	        result.setCorrect(isCorrect);

	        results.add(result);
	    }

	    // Save Attempt
	    Attempt attempt = new Attempt();

	    attempt.setUser(user);
	    attempt.setTest(test);
	    attempt.setScore(score);
	    attempt.setStatus("COMPLETED");
	    attempt.setStartTime(LocalDateTime.now());
	    attempt.setEndTime(LocalDateTime.now());

	    attemptRepository.save(attempt);
	    

        int totalQuestions = test.getTestQuestion().size();

        String result = score >= (totalQuestions * 0.4) ? "PASS": "FAIL";

emailService.sendResultEmail(
        user.getEmail(),
        user.getName(),
        score,
        result
);


	    // Response DTO
	    SubmitTestResponseDTO response =
	            new SubmitTestResponseDTO();

	    response.setScore(score);
	    response.setResults(results);

	    return response;
	}
	
	
	public List<AttemptHistoryDto> getHistory(String email) {

        User user = userRepository.findByEmail(email);

        List<Attempt> attempts =
                attemptRepository.findByUserId(user.getId());

        return attempts.stream()
                .map(a -> new AttemptHistoryDto(
                        a.getId(),
                        a.getTest().getTitle(),
                        a.getScore(),
                        a.getStatus(),
                        a.getStartTime(),
                        a.getEndTime()))
                .collect(Collectors.toList());
    }
	
	
	



public List<RankingDTO> getRankings() {

    List<Attempt> attempts = attemptRepository.findByStatusOrderByScoreDesc("COMPLETED");

    Map<Long, RankingDTO> leaderboard = new LinkedHashMap<>();

    for (Attempt attempt : attempts) {

        Long userId = attempt.getUser().getId();

        if (!leaderboard.containsKey(userId)) {

            leaderboard.put(
                userId,
                new RankingDTO(
                    userId,
                    attempt.getUser().getName(),
                    attempt.getScore()
                )
            );
        }
    }

    return new ArrayList<>(leaderboard.values());
}


}


