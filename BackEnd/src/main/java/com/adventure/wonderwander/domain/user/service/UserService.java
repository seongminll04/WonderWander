package com.adventure.wonderwander.domain.user.service;

import com.adventure.wonderwander.domain.user.dto.response.GetUserProfileResponseDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    Long login(String id, String ImgUrl) throws Exception;
    String registerNickname(String nickname, UserDetails userDetails) throws Exception;

    GetUserProfileResponseDto getProfile(Long userIdx, UserDetails userDetails) throws Exception;
    String changeProfile(MultipartFile image, String intro, UserDetails userDetails) throws Exception;
    Long logout(String accessToken, UserDetails userDetails);
    Long withdraw(String accessToken, UserDetails userDetails);

}
