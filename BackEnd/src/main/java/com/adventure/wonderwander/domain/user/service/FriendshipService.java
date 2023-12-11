package com.adventure.wonderwander.domain.user.service;

import com.adventure.wonderwander.domain.user.dto.response.GetFriendListResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface FriendshipService {
    List<GetFriendListResponseDto> getFriendList(UserDetails userDetails);
    String addFriend(Long friendIdx, UserDetails userDetails);
    String deleteFriend(Long friendIdx, UserDetails userDetails);

}
