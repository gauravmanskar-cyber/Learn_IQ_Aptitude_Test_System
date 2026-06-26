package com.example.demo.dto;

import java.time.LocalDateTime;

public class AttemptHistoryDto {

    private Long attemptId;
    private String testTitle;
    private int score;
    private String status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public AttemptHistoryDto(
            Long attemptId,
            String testTitle,
            int score,
            String status,
            LocalDateTime startTime,
            LocalDateTime endTime) {

        this.attemptId = attemptId;
        this.testTitle = testTitle;
        this.score = score;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getAttemptId() {
        return attemptId;
    }

    public String getTestTitle() {
        return testTitle;
    }

    public int getScore() {
        return score;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }
}
