package com.example.demo.dto;

import java.util.List;

public class SubmitTestResponseDTO {

    private int score;

    private List<QuestionResultDTO> results;

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<QuestionResultDTO> getResults() {
        return results;
    }

    public void setResults(List<QuestionResultDTO> results) {
        this.results = results;
    }
}