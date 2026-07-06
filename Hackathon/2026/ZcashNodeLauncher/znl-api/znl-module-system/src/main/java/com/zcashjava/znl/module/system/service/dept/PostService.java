package com.zcashjava.znl.module.system.service.dept;

import org.springframework.lang.Nullable;

import com.zcashjava.znl.framework.common.pojo.PageResult;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.post.PostPageReqVO;
import com.zcashjava.znl.module.system.controller.admin.dept.vo.post.PostSaveReqVO;
import com.zcashjava.znl.module.system.dal.dataobject.dept.PostDO;

import java.util.Collection;
import java.util.List;


public interface PostService {

    
    Long createPost(PostSaveReqVO createReqVO);

    
    void updatePost(PostSaveReqVO updateReqVO);

    
    void deletePost(Long id);

    
    void deletePostList(List<Long> ids);

    
    List<PostDO> getPostList(@Nullable Collection<Long> ids);

    
    List<PostDO> getPostList(@Nullable Collection<Long> ids,
                             @Nullable Collection<Integer> statuses);

    
    PageResult<PostDO> getPostPage(PostPageReqVO reqVO);

    
    PostDO getPost(Long id);

    
    void validatePostList(Collection<Long> ids);

}
