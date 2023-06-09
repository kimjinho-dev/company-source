package com.jobtang.sourcecompany.api.community.dto;

import com.jobtang.sourcecompany.api.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class CreateCommunityRequest {

  private String title;

  private String content;

}
