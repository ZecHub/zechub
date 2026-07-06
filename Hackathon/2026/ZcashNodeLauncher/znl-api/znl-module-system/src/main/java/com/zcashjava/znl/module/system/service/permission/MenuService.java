package com.zcashjava.znl.module.system.service.permission;

import java.util.Collection;
import java.util.List;

import com.zcashjava.znl.module.system.controller.admin.permission.vo.menu.MenuListReqVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.menu.MenuSaveVO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.MenuDO;


public interface MenuService {

    
    Long createMenu(MenuSaveVO createReqVO);

    
    void updateMenu(MenuSaveVO updateReqVO);

    
    void deleteMenu(Long id);

    
    void deleteMenuList(List<Long> ids);

    
    List<MenuDO> getMenuList();

    
    List<MenuDO> getMenuListByTenant(MenuListReqVO reqVO);

    
    List<MenuDO> filterDisableMenus(List<MenuDO> list);

    
    List<MenuDO> getMenuList(MenuListReqVO reqVO);

    
    List<Long> getMenuIdListByPermissionFromCache(String permission);

    
    MenuDO getMenu(Long id);

    
    List<MenuDO> getMenuList(Collection<Long> ids);

}
