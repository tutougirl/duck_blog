package com.markerhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.markerhub.common.lang.Result;
import com.markerhub.entity.Tag;
import com.markerhub.service.TagService;
import com.markerhub.util.ShiroUtil;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 何艳莹
 * @Date: 2022/02/15/13:51
 * @Description:
 */
@RestController
public class TagController {

    @Autowired
    TagService tagService;

    @GetMapping("/api/tags")
    public Result tagList(Integer userId){

        List<Tag> tagList = tagService.list(new QueryWrapper<Tag>().eq("user_id", userId).orderByAsc("id"));

        return Result.succ(tagList);
    }

    @GetMapping("/api/tagsTotal")
    public Result getTagNumber(Integer userId){

        List<Tag> tagList = tagService.list(new QueryWrapper<Tag>().eq("user_id", userId).orderByAsc("id"));

        return Result.succ(tagList.size());
    }

    @RequiresAuthentication
    @PostMapping("/api/addTag")
    public Result addTags(@RequestBody Tag temp){
        Tag tag = new Tag();
        tag.setName(temp.getName());
        tag.setUserId(ShiroUtil.getProfile().getId());
        tag.setCreated(LocalDateTime.now());
        boolean result = tagService.saveOrUpdate(tag);
        return Result.succ(result);
    }

    @PostMapping("/api/updateTags")
    public Result updateTag(@RequestBody JSONObject jsonObject){
        Tag temp = jsonObject.toJavaObject(Tag.class);
        Tag tag = new Tag();
        tag.setName(temp.getName());
        tag.setId(temp.getId());
        boolean update = tagService.updateById(tag);
        return Result.succ(update);
    }
    @GetMapping("/api/delTags")
    public Result deleteTag(Integer tagId){
        boolean res = tagService.removeById(tagId);
        return Result.succ(res);
    }
}
