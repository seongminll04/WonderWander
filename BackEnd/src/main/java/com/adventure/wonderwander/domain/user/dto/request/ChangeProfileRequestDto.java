package com.adventure.wonderwander.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChangeProfileRequestDto {
    @NotBlank(message = "nickname은 빈값이 올 수 없습니다")
    protected String nickname;
    @NotBlank(message = "자기소개 문구는 빈값이 올 수 없습니다")
    protected String userIntro;
}
