package com.adventure.wonderwander.domain.user.service;

import com.adventure.wonderwander.domain.user.dto.response.GetFriendListResponseDto;
import com.adventure.wonderwander.domain.user.entity.Friendship;
import com.adventure.wonderwander.domain.user.entity.User;
import com.adventure.wonderwander.domain.user.repository.FriendshipRepository;
import com.adventure.wonderwander.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class FriendshipServiceImpl implements FriendshipService{
    private final FriendshipRepository friendshipRepository;

    private final UserRepository userRepository;

    /**
     * 내 친구 목록 조회
     */
    @Override
    public List<GetFriendListResponseDto> getFriendList(UserDetails userDetails) {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        List<GetFriendListResponseDto> FriendList = new ArrayList<>();
        friendshipRepository.findAllByUser(user).stream().forEach(friendship -> {
            User friend = userRepository.findById(friendship.getFriendIdx()).orElseThrow();
            FriendList.add(GetFriendListResponseDto.builder()
                    .userIdx(friend.getId())
                    .nickname(friend.getNickname())
                    .userImage(friend.getImgUrl())
                    .build());
        });

        return FriendList;
    }
    /**
     * 친구 추가
     */
    @Override
    @Transactional
    public String addFriend(Long friendIdx, UserDetails userDetails) {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        User friend = userRepository.findById(friendIdx)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        Friendship friendship = Friendship.builder()
                .user(user)
                .friendIdx(friendIdx)
                .build();

        friendshipRepository.save(friendship);

        return "친구 추가가 완료되었습니다";
    }
    /**
     * 친구 삭제
     */
    @Override
    @Transactional
    public String deleteFriend(Long friendIdx, UserDetails userDetails) {
        User user = userRepository.findByUserid(userDetails.getUsername())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저는 존재하지 않습니다.", 1));

        Friendship friendship = friendshipRepository.findByFriendIdxAndUser(friendIdx, user)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 팔로우는 존재하지 않습니다.", 1));

        friendshipRepository.delete(friendship);
        return "친구 삭제가 완료되었습니다";
    }
}
