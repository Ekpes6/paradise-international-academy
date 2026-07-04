package com.paradise.auth.dto;

import com.paradise.auth.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String refreshToken;
    @Builder.Default
    private String tokenType = "Bearer";
    private UserDto user;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDto {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private Role role;
        private String avatarUrl;
    }
}
