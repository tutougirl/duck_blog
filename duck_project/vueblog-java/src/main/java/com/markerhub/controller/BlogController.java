package com.markerhub.controller;


import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.markerhub.common.lang.Result;
import com.markerhub.entity.Blog;
import com.markerhub.service.BlogService;
import com.markerhub.util.ShiroUtil;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 关注公众号：MarkerHub
 * @since 2020-05-25
 */
@RestController
public class BlogController {

    @Autowired
    BlogService blogService;

    @GetMapping("/api/blogs")
    public Result list(@RequestParam(defaultValue = "1") Integer currentPage,Integer userId) {

        Page page = new Page(currentPage, 5);
        IPage pageData = blogService.page(page, new QueryWrapper<Blog>().eq("user_id",userId).orderByDesc("created"));

        return Result.succ(pageData);
    }

    @GetMapping("/api/sortBlog")
    public Result getBlogByTag(@RequestParam(defaultValue = "1") Integer currentPage, Integer tagId, Integer userId) {
        Page page = new Page(currentPage, 5);
        System.out.println(tagId.toString());
        Map<String , Object> map = new HashMap<>();
        map.put("user_id" , userId);
        map.put("tag_id" , tagId.toString());
        IPage pageData = blogService.page(page,new QueryWrapper<Blog>().eq("user_id",userId).like("tag_id",tagId.toString()).orderByDesc("created"));
        return Result.succ(pageData);
    }

    @GetMapping("/api/blog/{id}")
    public Result detail(@PathVariable(name = "id") Long id) {
        Blog blog = blogService.getById(id);
        Assert.notNull(blog, "该博客已被删除");

        return Result.succ(blog);
    }

    @GetMapping("/api/delete/{id}")
    public Result delete(@PathVariable(name = "id") Long id) {
        boolean res = blogService.removeById(id);
        return Result.succ(res);
    }

    @RequiresAuthentication
    @PostMapping("/api/blog/edit")
    public Result edit(@Validated @RequestBody Blog blog) {

//        Assert.isTrue(false, "公开版不能任意编辑！");
        System.out.println(blog);
        Blog temp = null;
        if(blog.getId() != null) {
            temp = blogService.getById(blog.getId());
            // 只能编辑自己的文章
            System.out.println(ShiroUtil.getProfile().getId());
            Assert.isTrue(temp.getUserId().longValue() == ShiroUtil.getProfile().getId().longValue(), "没有权限编辑");

        } else {
            temp = new Blog();
            temp.setTagId(blog.getTagId());
            temp.setUserId(ShiroUtil.getProfile().getId());
            temp.setCreated(LocalDateTime.now());
            temp.setStatus(blog.getStatus());
        }

        BeanUtil.copyProperties(blog, temp, "id", "userId", "created");
        boolean res = blogService.saveOrUpdate(temp);

        return Result.succ(res);
    }


}
