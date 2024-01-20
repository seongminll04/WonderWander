package com.adventure.wonderwander.domain.user.service;


import com.adventure.wonderwander.domain.user.dto.response.GetUserProfileResponseDto;
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


import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

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
                .intro("")
                .password("social")
                .build();

        user.passwordEncode(passwordEncoder);
        User saveUser = userRepository.save(user);

        // 생성한 계정의 Idx 번호 리턴
        return saveUser.getId();
    }

    /**
     * 닉네임 등록 (첫 로그인 시)
     */
    @Transactional
    @Override
    public String registerNickname(String nickname, UserDetails userDetails) throws Exception {
        // 내 계정정보 불러오기
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        // 닉네임 유효성 검사  (영문,숫자 2자 ~ 8자 이내)
        if (!Pattern.matches("^[a-zA-Z0-9_가-힣\\s]{2,8}$", nickname)) {
            return "error_1";
        }
        // 닉네임 중복 체크
        else if(userRepository.findByNickname(nickname).isPresent())
            return "error_2";
        else {
            // 닉네임 등록
            user.updateNickname(nickname);
            // 그리고 저장
            userRepository.save(user);
            return "닉네임 등록 완료";
        }
    }
    /**
     * 유저 정보 조회
     */
    @Override
    public GetUserProfileResponseDto getProfile(Long userIdx, UserDetails userDetails) throws Exception {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        User findUser = userRepository.findById(userIdx)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        return GetUserProfileResponseDto.builder()
                .nickname(findUser.getNickname())
                .image(findUser.getImgUrl())
                .intro(findUser.getIntro())
                .follower(friendshipRepository.findAllByFriendIdx(userIdx).size())
                .following(friendshipRepository.findAllByUser(findUser).size())
                .build();
    }
    /**
     * 내 정보 수정
     */
    @Transactional
    @Override
    public String changeProfile(MultipartFile image, String intro,
                                                  UserDetails userDetails) throws Exception {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        if (intro != null) {
            user.updateIntro(intro);
        }

        if (image != null) {
            String fileName =  s3Service.generateImgFileName(image, user.getUserid());
            byte[] fileBytes = image.getBytes();
            String img = s3Service.uploadToS3(fileName,fileBytes, image.getContentType());
            user.updateProfileImg(img);

            return img;
        }

        return null;
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
