package com.adventure.wonderwander.domain.user.controller;

import com.adventure.wonderwander.domain.user.service.FriendshipService;
import com.adventure.wonderwander.domain.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
@Slf4j
public class FriendshipController {
    private final FriendshipService friendshipService;
    @ApiOperation(value = "친구 목록 조회")
    @GetMapping
    public ResponseEntity getFriendList(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok().body(friendshipService.getFriendList(userDetails));
    }

    @ApiOperation(value = "친구 추가")
    @PostMapping("/{friendIdx}")
    public ResponseEntity addFriend(@PathVariable Long friendIdx,
                                    @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok().body(friendshipService.addFriend(friendIdx, userDetails));
    }
    @ApiOperation(value = "친구 삭제")
    @DeleteMapping("/{friendIdx}")
    public ResponseEntity deleteFriend(@PathVariable Long friendIdx,
                                       @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok().body(friendshipService.deleteFriend(friendIdx, userDetails));
    }
}
