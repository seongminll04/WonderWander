package com.adventure.wonderwander.global.security.login;

import com.adventure.wonderwander.domain.user.entity.User;
import com.adventure.wonderwander.domain.user.repository.UserRepository;
import com.adventure.wonderwander.domain.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class LoginAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

//    private static final String CONTENT_TYPE = "application/json; charset=UTF-8";

    @Autowired
    private UserService userService;

    private final ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    public LoginAuthenticationFilter(ObjectMapper objectMapper) {
        super(new AntPathRequestMatcher("/api/v1/login", "POST"));

        this.objectMapper = objectMapper;
    }

    /**
     * 로그인 인증 처리
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException {
        if(httpServletRequest.getContentType() == null)
            throw new AuthenticationServiceException("Authentication Content-Type Not Supported : " + httpServletRequest.getContentType());
        // request에서 messageBody를 JSON 형태로 반환
        String messageBody = StreamUtils.copyToString(httpServletRequest.getInputStream(), StandardCharsets.UTF_8);
        // JSON 형태를 Key-Value 형태로 변환하여 Map에 저장
        Map<String, String> loginData  = objectMapper.readValue(messageBody, Map.class);
        // 보내온 token, social 데이터 가져옴
        String token = loginData.get("token");
        String social = loginData.get("social");
        System.out.println(token + "@@"+ social);
        if (social.equals("kakao")) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
            headers.add("Authorization", "Bearer "+ token);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
            ResponseEntity<String> response =
                    restTemplate.exchange("https://kapi.kakao.com/v2/user/me",
                            HttpMethod.GET,
                            new HttpEntity<>(null, headers),
                            String.class);
            String body = response.getBody();
            Map<String, ?> data = objectMapper.readValue(body, Map.class);
            String num = String.valueOf(data.get("id"));
            Map<String, Object> kakaoAccount = (Map<String, Object>) data.get("kakao_account");
            String thumbnailImageUrl = (String) ((Map<String, Object>) kakaoAccount.get("profile")).get("thumbnail_image_url");

            User user = userRepository.findByUserid("kakao@"+num)
                    .orElse(null);

            if (user == null) {
                try {
                    userService.login("kakao@"+num, thumbnailImageUrl);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            // 로그인 했으니깐 탈퇴중이라면 탈퇴 취소
//            if (user.getDeletedAt() != null) {
//                user.cancelDeletedDate();
//                userRepository.save(user);
//            }
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken("kakao@"+num, "social");

            return this.getAuthenticationManager().authenticate(usernamePasswordAuthenticationToken);
        } else if (social.equals("google")) {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
            ResponseEntity<String> response =
                    restTemplate.exchange("https://oauth2.googleapis.com/tokeninfo?id_token="+token,
                            HttpMethod.GET,
                            new HttpEntity<>(null, null),
                            String.class);

            String body = response.getBody();

            Map<String, ?> data = objectMapper.readValue(body, Map.class);
            String num = String.valueOf(data.get("sub"));
            String thumbnailImageUrl = String.valueOf(data.get("picture"));

            User user = userRepository.findByUserid("google@"+num)
                    .orElse(null);

            if (user == null) {
                try {
                    userService.login("google@"+num, thumbnailImageUrl);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken("google@"+num, "social");

            return this.getAuthenticationManager().authenticate(usernamePasswordAuthenticationToken);

        } else if (social.equals("naver")) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer "+ token);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
            ResponseEntity<String> response =
                    restTemplate.exchange("https://openapi.naver.com/v1/nid/me",
                            HttpMethod.GET,
                            new HttpEntity<>(null, headers),
                            String.class);

            String body = response.getBody();

            Map<String, ?> data = objectMapper.readValue(body, Map.class);
            Map<String, Object> response_data = (Map<String, Object>) data.get("response");
            String num = String.valueOf(response_data.get("id"));
            System.out.println(num);
            String thumbnailImageUrl = String.valueOf(response_data.get("profile_image"));
            System.out.println(thumbnailImageUrl);
            User user = userRepository.findByUserid("naver@"+num)
                    .orElse(null);

            if (user == null) {
                try {
                    userService.login("naver@"+num, thumbnailImageUrl);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken("naver@"+num, "social");

            return this.getAuthenticationManager().authenticate(usernamePasswordAuthenticationToken);
        } else {
            // AbstractAuthenticationProcessingFilter(부모)의 getAuthenticationManager()로 AuthenticationManager 객체를 반환 받은 후
            // authenticate()의 파라미터로 UsernamePasswordAuthenticationToken 객체를 넣고 인증 처리
            // 여기서 AuthenticationManager 객체는 ProviderManager -> SecurityConfig에서 설정
            return null;
        }

    }

}
