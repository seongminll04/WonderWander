package com.adventure.wonderwander.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
@Table(name = "member")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_idx")
    Long idx;

    @Column(name = "user_id", unique = true)
    protected String userid;

//    @Column(name = "user_password")
//    protected String password;

    @Column(name = "user_nickname", unique = true)
    protected String nickname;

    @Column(name = "user_img_url")
    protected String imgUrl;

    @Column(name = "user_firebase_token")
    private String firebaseToken;

    @Column(name = "user_deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "user_alarms")
    private Boolean alarms;

//    @OneToMany(mappedBy = "User")
//    private List<Inquiry> inquiries = new ArrayList<>();
//
//    @OneToMany(mappedBy = "User")
//    private List<Friendship> friendships = new ArrayList<>();
//
//    @OneToMany(mappedBy = "User")
//    private List<AppMemberStamp> appMemberStamps = new ArrayList<>();
//
//    @OneToMany(mappedBy = "User")
//    private List<Likes> likes = new ArrayList<>();
//
//    @OneToMany(mappedBy = "User")
//    private List<MemberMarker> memberMarkers = new ArrayList<>();
//
//    @OneToMany(mappedBy = "User")
//    private List<MemberMapArea> memberMapAreas = new ArrayList<>();

    @Builder
    public User(String userid, String nickname, String imgUrl,
                     String firebaseToken){
        this.userid = userid;
        this.nickname = nickname;
        this.imgUrl = imgUrl;
        this.firebaseToken = firebaseToken;
        this.alarms = false;
    }

    /**
     * 닉네임 변경
     */
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * 유저 알람 설정 on/off
     */
    public void alarmOnOff(Boolean alarmSet) {
        this.alarms = !alarmSet;
    }

    /**
     * 회원탈퇴 등록
     */
    public void updateDeletedDate() {
        this.deletedAt = LocalDateTime.now();
    }

    /**
     * 회원탈퇴 취소
     */
    public void cancelDeletedDate() {
        this.deletedAt = null;
    }

    /**
     * 유저 프로필 이미지 변경
     */
    public void updateProfileImg(String imgPath) {
        this.imgUrl=imgPath;
    }

    /**
     * 유저 Firebase Token 변경
     */
    public void updateFirebase(String token) {
        this.firebaseToken=token;
    }

}
