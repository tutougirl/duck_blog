package com.markerhub.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 何艳莹
 * @Date: 2022/02/15/13:39
 * @Description:
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("m_tag")
public class Tag {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @NotBlank(message = "标签不能为空")
    private String name;

    @NotBlank(message = "用户id不能为空")
    private Long userId;

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDateTime created;
}
