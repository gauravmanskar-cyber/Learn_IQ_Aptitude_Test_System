package com.example.demo.dto;

public class RankingDTO {

    private Long userId;
    private String studentName;
    private int score;

    public RankingDTO(Long userId, String studentName, int score) {
        this.userId = userId;
        this.studentName = studentName;
        this.score = score;
    }

    public Long getUserId() {
        return userId;
    }

    public String getStudentName() {
        return studentName;
    }

    public int getScore() {
        return score;
    }
}