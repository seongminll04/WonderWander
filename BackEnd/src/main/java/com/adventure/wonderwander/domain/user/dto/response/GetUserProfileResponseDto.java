package com.adventure.wonderwander.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GetUserProfileResponseDto {
    private Long userIdx;
    private String nickname;
    private String image;
    private String intro;
    private int follower;
    private int following;

    @Builder
    public GetUserProfileResponseDto(Long userIdx, String nickname, String image, String intro,
                                     int follower, int following){
        this.userIdx = userIdx;
        this.nickname = nickname;
        this.image = image;
        this.intro = intro;
        this.follower = follower;
        this.following = following;
    }
}
