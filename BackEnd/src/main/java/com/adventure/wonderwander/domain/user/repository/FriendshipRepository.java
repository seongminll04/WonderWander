package com.adventure.wonderwander.domain.user.repository;

import com.adventure.wonderwander.domain.user.entity.Friendship;
import com.adventure.wonderwander.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findAllByUser(User user);
    List<Friendship> findAllByFriendIdx(Long friendIdx);
    Optional<Friendship> findByFriendIdxAndUser(Long userIdx, User user);
}
