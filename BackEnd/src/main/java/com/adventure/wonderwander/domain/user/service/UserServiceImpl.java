package com.adventure.wonderwander.domain.user.service;


import com.adventure.wonderwander.domain.user.entity.User;
import com.adventure.wonderwander.domain.user.repository.UserRepository;
import com.adventure.wonderwander.global.s3service.S3Service;
import com.adventure.wonderwander.global.security.redis.RedisAccessTokenService;
import com.adventure.wonderwander.global.security.redis.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final RedisAccessTokenService redisAccessTokenService;

    private final S3Service s3Service;

//    private final DateTimeFormatter dateTimeFormatter;


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


}
