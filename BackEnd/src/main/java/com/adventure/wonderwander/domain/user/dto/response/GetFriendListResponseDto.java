package com.adventure.wonderwander.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
public class GetFriendListResponseDto {
    private Long userIdx;
    private String nickname;
    private String userImage;
    @Builder
    public GetFriendListResponseDto(Long userIdx, String nickname, String userImage){
        this.userIdx = userIdx;
        this.nickname = nickname;
        this.userImage = userImage;
    }
}
