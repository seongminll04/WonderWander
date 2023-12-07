package com.adventure.wonderwander.global.config;

import com.adventure.wonderwander.domain.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.adventure.wonderwander.global.security.jwt.JwtAuthenticationFilter;
import com.adventure.wonderwander.global.security.jwt.JwtService;
import com.adventure.wonderwander.global.security.login.*;

import com.adventure.wonderwander.global.security.login.handler.LoginFailureHandler;
import com.adventure.wonderwander.global.security.login.handler.LoginSuccessHandler;
import com.adventure.wonderwander.global.security.redis.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final LoginService loginService;

    private final JwtService jwtService;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final UserRepository userRepository;

    private final ObjectMapper objectMapper;

    private static final String[] WHITE_LIST = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/ws/**",

            "/",
            "/favicon.ico",
            "/oauth2/**",


            /* 웹 회원가입, 로그인 */
            "/api/web/signup",
            "/api/web/login",

            "/api/web/idCheck/**",
            /* 앱 회원가입, 로그인 */
            "/api/member/login",
            /* 앱 닉네임 중복확인 */
            "/api/member/nicknameCheck/**",

            "/api/batch/**"


    };

    @Bean
    protected SecurityFilterChain config(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // csrf 보안 사용 X
                .formLogin(AbstractHttpConfigurer::disable) // FormLogin 사용 X
                .httpBasic(AbstractHttpConfigurer::disable) // httpBasic 사용 X
                .cors(c -> c.configurationSource(corsConfigurationSource())) // cors 허용 설정
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 X -> 토큰 사용
                .headers(h->h.frameOptions(f->f.disable()))
                // url 별 권한 설정
                .authorizeRequests(a->a
                        .requestMatchers(WHITE_LIST).permitAll()
                        .anyRequest().authenticated()) // 그 외 경로는 모두 인증된 사용자만 접근 가능
                // 스프링 시큐리티 필터 순서 :
                // LogoutFilter -> JwtAuthenticationProcessingFilter -> AuthenticationFilter
                // 아래 둘 순서 바꾸면 에러
                .addFilterAfter(loginAuthenticationFilter(), LogoutFilter.class)
                .addFilterBefore(jwtAuthenticationFilter(), LoginAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /*
     * AuthenticationManager 설정 후 등록
     * */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(loginService);

        return new ProviderManager(daoAuthenticationProvider);
    }

    /*
     * 로그인 성공 시 호출
     * */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, userRepository, redisRefreshTokenService);
    }

    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    @Bean
    public LoginAuthenticationFilter loginAuthenticationFilter() {
        LoginAuthenticationFilter loginAuthenticationFilter
                = new LoginAuthenticationFilter(objectMapper);

        loginAuthenticationFilter.setAuthenticationManager(authenticationManager());
        loginAuthenticationFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        loginAuthenticationFilter.setAuthenticationFailureHandler(loginFailureHandler());

        return loginAuthenticationFilter;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtService, userRepository, redisRefreshTokenService);

        return jwtAuthenticationFilter;
    }


}
