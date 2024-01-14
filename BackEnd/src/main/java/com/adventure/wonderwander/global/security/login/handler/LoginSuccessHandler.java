package com.adventure.wonderwander.global.security.login.handler;

import com.adventure.wonderwander.domain.user.entity.User;
import com.adventure.wonderwander.domain.user.repository.FriendshipRepository;
import com.adventure.wonderwander.domain.user.repository.UserRepository;
import com.adventure.wonderwander.global.security.jwt.JwtService;
import com.adventure.wonderwander.global.security.redis.RedisRefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * JWT를 활용한 일반 로그인 성공 처리
 */
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final FriendshipRepository friendshipRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException {

        // 인증 정보에서 username(id) 추출
        String id = extractUsername(authentication);

        // AccessToken & RefreshToken 발급
        String accessToken = jwtService.createAccessToken(id);
        String refreshToken = jwtService.createRefreshToken();

        httpServletResponse.addHeader(jwtService.getAccessHeader(), accessToken);
        httpServletResponse.addHeader(jwtService.getRefreshHeader(), refreshToken);

        httpServletResponse.setContentType("application/json");
        httpServletResponse.setCharacterEncoding("UTF-8");

        User user = userRepository.findByUserid(id)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("userIdx", user.getId());

        jsonObject.put("image", user.getImgUrl());
        jsonObject.put("nickname", user.getNickname());
        jsonObject.put("intro", user.getIntro());

        jsonObject.put("follower", friendshipRepository.findAllByFriendIdx(user.getId()).size());
        jsonObject.put("following", friendshipRepository.findAllByUser(user).size());
        
        jsonObject.put("alarm", user.getAlarm());

        // Get the PrintWriter
        PrintWriter out = httpServletResponse.getWriter();
        // Write data to the response body
        out.println(jsonObject);
        // Close the PrintWriter
        out.close();

        // Redis에 RefreshToken 저장
        redisRefreshTokenService.setRedisRefreshToken(refreshToken, id);

    }

    /**
     * Authentication(인증 정보)로부터 username(id) 추출하기
     */
    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return userDetails.getUsername();
    }
}
