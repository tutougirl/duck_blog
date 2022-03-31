package com.markerhub.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.markerhub.common.lang.Result;
import com.markerhub.entity.Note;
import com.markerhub.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NoteController {
    @Autowired
    NoteService noteService;

    @GetMapping("/api/notes")
    public Result list(@RequestParam(defaultValue = "1") Integer currentPage, Integer userId) {

        Page page = new Page(currentPage, 5);
        IPage pageData = noteService.page(page, new QueryWrapper<Note>().eq("user_id",userId).orderByDesc("created"));
        return Result.succ(pageData);
    }
}
