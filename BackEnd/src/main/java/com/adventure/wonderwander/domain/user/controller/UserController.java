package com.adventure.wonderwander.domain.user.controller;

import com.adventure.wonderwander.domain.user.dto.request.ChangeNicknameRequestDto;
import com.adventure.wonderwander.domain.user.dto.request.ChangeProfileRequestDto;
import com.adventure.wonderwander.domain.user.service.UserService;
import com.adventure.wonderwander.global.security.jwt.JwtService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiOperation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserController {
    private final UserService userService;

    private final JwtService jwtService;

    @ApiOperation(value = "닉네임 중복 확인")
    @GetMapping("/nicknameCheck/{nickname}")
    public ResponseEntity nicknameUsefulCheck(@PathVariable("nickname") String nickname) throws Exception {
        String result = userService.nicknameUsefulCheck(nickname);

        if (result.equals("error_1"))
            return ResponseEntity.badRequest().body("유효하지 않은 닉네임입니다. 다시 시도해주세요.");
        else if (result.equals("error_2")) {
            return ResponseEntity.badRequest().body("이미 존재하는 닉네임입니다. 다시 시도해주세요.");
        } else
            return ResponseEntity.ok().body(result);
    }

    @ApiOperation(value = "닉네임 등록(첫 로그인)")
    @PostMapping("/nickname")
    public ResponseEntity changeNickname(@RequestBody ChangeNicknameRequestDto changeNicknameRequestDto,
                                          @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        return ResponseEntity.ok().body(userService.changeNickname(changeNicknameRequestDto.getNickname(), userDetails));
    }

    @ApiOperation(value = "내 정보 수정")
    @PatchMapping("/changeProfile")
    public ResponseEntity changeProfile(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("userdata") String userdata,
                                        @AuthenticationPrincipal UserDetails userDetails) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ChangeProfileRequestDto changeProfileRequestDto = objectMapper.readValue(userdata, ChangeProfileRequestDto.class);
            return ResponseEntity.ok()
                    .body(userService.changeProfile(changeProfileRequestDto,image, userDetails));
        } catch (JsonProcessingException e) {
            // 처리 중에 오류가 발생한 경우 예외 처리
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during changeProfile");
        }
    }

    @ApiOperation(value = "앱 로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest httpServletRequest,
                                    @AuthenticationPrincipal UserDetails userDetails) {

        Long result = userService.logout(jwtService.extractAccessToken(httpServletRequest)
                .orElseThrow(() -> new IllegalArgumentException("비정상적인 access token 입니다.")), userDetails);

        return ResponseEntity.ok().body(result);
    }
    @ApiOperation(value = "회원 탈퇴")
    @DeleteMapping("/withdraw")
    public ResponseEntity<?> quit(HttpServletRequest httpServletRequest,
                                  @AuthenticationPrincipal UserDetails userDetails) {

        Long result = userService.withdraw(jwtService.extractAccessToken(httpServletRequest)
                .orElseThrow(() -> new IllegalArgumentException("비정상적인 access token 입니다.")), userDetails);

        return ResponseEntity.ok().body(result);
    }

}
