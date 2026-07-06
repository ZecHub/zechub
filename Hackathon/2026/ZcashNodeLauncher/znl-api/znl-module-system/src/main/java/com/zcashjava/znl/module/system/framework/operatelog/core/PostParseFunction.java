package com.zcashjava.znl.module.system.framework.operatelog.core;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;

import com.mzt.logapi.service.IParseFunction;
import com.zcashjava.znl.module.system.dal.dataobject.dept.PostDO;
import com.zcashjava.znl.module.system.service.dept.PostService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;


@Slf4j
@Component
public class PostParseFunction implements IParseFunction {

    public static final String NAME = "getPostById";

    @Resource
    private PostService postService;

    @Override
    public String functionName() {
        return NAME;
    }

    @Override
    public String apply(Object value) {
        if (StrUtil.isEmptyIfStr(value)) {
            return "";
        }

        
        PostDO post = postService.getPost(Convert.toLong(value));
        if (post == null) {
            log.warn("[apply] [Acquiring position]", value);
            return "";
        }
        return post.getName();
    }

}
