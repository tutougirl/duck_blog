package com.markerhub.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.markerhub.common.lang.Result;
import com.markerhub.entity.User;
import com.markerhub.service.UserService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 关注公众号：MarkerHub
 * @since 2020-05-25
 */
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequiresAuthentication
    @GetMapping("/api/index")
    public Result index() {
        User user = userService.getById(1L);
        return Result.succ(user);
    }

    @PostMapping("/api/save")
    public Result save(@Validated @RequestBody User user) {
        boolean res = userService.updateById(user);
        if(res){
            return Result.succ(true);
        }else {
            return Result.fail("资料更新失败！");
        }
    }

//    @PostMapping("/api/uploadImg")
//    @ResponseBody
//    public Result uploadHead(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws FileNotFoundException {
//        String path = ResourceUtils.getURL("classpath:").getPath() + "static/headImage/";
//        String url = request.getContextPath() + "/headImage/";
//        File filePath = new File(path);
//        System.out.println("文件的保存路径：" + path);
//        if (!filePath.exists() && !filePath.isDirectory()) {
//            System.out.println("目录不存在，创建目录:" + filePath);
//            filePath.mkdirs(); // mkdir()不会创建目录,找不到相应路径时返回false;而mkdirs()当目录不存在时则会创建相应目录
//        }
//        //获取原始文件名称(包含格式)
//        String originalFileName = file.getOriginalFilename();
//        //获取文件类型，以最后一个`.`为标识
//        String type = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
//        HttpSession session = request.getSession();
//        System.out.println(session.getAttribute("userId"));
//        String userId = session.getAttribute("userId").toString();
//        String fileName = userId + "."+ type; // 新文件名，这里可以根据需要改名
//        //在指定路径下创建一个文件
//        File targetFile = new File(path, fileName); // 未使用outputStream.write()的时候,是一个File对象,保存在内存中,硬盘中看不到,但是可以使用这个对象
//        try {
//            // 使用springmvc的transferTo方法上传文件
//            file.transferTo(targetFile);
//            User user=new User();
//            user.setAvatar (url + fileName);
//            user.setId((Long) session.getAttribute("userId"));
//            boolean res = userService.updateById(user);
//            if (res) {
//                return Result.succ(url + fileName);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return Result.fail("头像上传失败");
//    }


    @RequestMapping("/api/query_name")
    public Result queryName(@RequestBody JSONObject jsonObject){
        User us = jsonObject.toJavaObject(User.class);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",us.getUsername());
        User user = userService.getOne(queryWrapper);
        if (user!=null)
            return Result.fail("用户名已被占用！",false);
        else
            return Result.succ(true);
    }
}
