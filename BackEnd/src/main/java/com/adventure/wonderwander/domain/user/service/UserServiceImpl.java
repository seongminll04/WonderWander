package com.adventure.wonderwander.domain.user.service;


import com.adventure.wonderwander.domain.user.dto.request.ChangeProfileRequestDto;
import com.adventure.wonderwander.domain.user.dto.response.GetFriendListResponseDto;
import com.adventure.wonderwander.domain.user.entity.Friendship;
import com.adventure.wonderwander.domain.user.entity.User;
import com.adventure.wonderwander.domain.user.repository.FriendshipRepository;
import com.adventure.wonderwander.domain.user.repository.UserRepository;
import com.adventure.wonderwander.global.s3service.S3Service;
import com.adventure.wonderwander.global.security.redis.RedisAccessTokenService;
import com.adventure.wonderwander.global.security.redis.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final FriendshipRepository friendshipRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final RedisAccessTokenService redisAccessTokenService;

    private final S3Service s3Service;

    /**
     * 로그인 & 회원 가입
     */
    @Override
    @Transactional
    public Long login(String id, String ImgUrl) throws Exception {

        User user = User.builder()
                .userid(id)
                .imgUrl(ImgUrl)
                .build();

        User saveUser = userRepository.save(user);

        // 생성한 계정의 Idx 번호 리턴
        return saveUser.getId();
    }

    /**
     * 닉네임 중복 확인
     */
    @Override
    public String nicknameUsefulCheck(String nickname) throws Exception {

        if(userRepository.findByNickname(nickname).isPresent())
            throw new Exception("이미 존재하는 닉네임입니다.");
        else
            return "사용 가능한 닉네임입니다.";
    }

    /**
     * 닉네임 등록 (첫 로그인 시)
     */
    @Transactional
    @Override
    public String changeNickname(String nickname, UserDetails userDetails) throws Exception {
        // 내 계정정보 불러오기
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (user.getNickname() != null)
            throw new Exception("닉네임이 이미 존재합니다.");

        // 닉네임 중복 체크
        nicknameUsefulCheck(nickname);
        // 닉네임 업데이트
        user.updateNickname(nickname);
        // 그리고 저장
        userRepository.save(user);
        return "닉네임 등록 완료";
    }

    /**
     * 내 정보 수정
     */
    @Transactional
    @Override
    public String changeProfile(ChangeProfileRequestDto changeProfileRequestDto,
                                MultipartFile image, UserDetails userDetails) throws Exception {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (!image.isEmpty()) {
            String fileName =  s3Service.generateImgFileName(image, user.getUserid());
            byte[] fileBytes = image.getBytes();
            String img = s3Service.uploadToS3(fileName,fileBytes, image.getContentType());
            user.updateProfileImg(img);
        }

        if (!changeProfileRequestDto.getNickname().equals(user.getNickname()))
            user.updateNickname(changeProfileRequestDto.getNickname());

        if (!changeProfileRequestDto.getUserIntro().equals(user.getIntro()))
            user.updateIntro(changeProfileRequestDto.getUserIntro());

        return "내 정보 수정 완료";
    }

    /**
     * 로그아웃
     */
    @Override
    public Long logout(String accessToken, UserDetails userDetails) {

        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        redisRefreshTokenService.deleteRefreshToken(user.getUserid());
        redisAccessTokenService.setRedisAccessToken(accessToken.replace("Bearer ", ""), "LOGOUT");

        return user.getId();
    }

    /**
     * 회원탈퇴 등록 (n일 후 삭제 처리)
     */
    @Override
    @Transactional
    public Long withdraw(String accessToken, UserDetails userDetails) {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        user.updateDeletedDate();
        userRepository.save(user);

        redisRefreshTokenService.deleteRefreshToken(user.getUserid());
        redisAccessTokenService.setRedisAccessToken(accessToken.replace("Bearer ", ""), "QUIT");

        return user.getId();
    }

}
