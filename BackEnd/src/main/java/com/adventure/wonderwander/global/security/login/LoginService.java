package com.adventure.wonderwander.global.security.login;

import com.adventure.wonderwander.domain.user.entity.User;
import com.adventure.wonderwander.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * UserDetails 객체 생성
     */
    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {

        User user = userRepository.findByUserid(userid)
                .orElseThrow(() -> new UsernameNotFoundException("해당 아이디가 존재하지 않습니다."));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUserid())
                .build();
    }
}
