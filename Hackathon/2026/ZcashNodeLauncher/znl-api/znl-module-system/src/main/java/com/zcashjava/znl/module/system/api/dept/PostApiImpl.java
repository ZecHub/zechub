package com.zcashjava.znl.module.system.api.dept;

import org.springframework.stereotype.Service;

import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.api.dept.dto.PostRespDTO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.PostDO;
import com.zcashjava.znl.module.system.service.dept.PostService;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;


@Service
public class PostApiImpl implements PostApi {

    @Resource
    private PostService postService;

    @Override
    public void validPostList(Collection<Long> ids) {
        postService.validatePostList(ids);
    }

    @Override
    public List<PostRespDTO> getPostList(Collection<Long> ids) {
        List<PostDO> list = postService.getPostList(ids);
        return BeanUtils.toBean(list, PostRespDTO.class);
    }

}
