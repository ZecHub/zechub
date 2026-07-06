package com.zcashjava.znl.module.system.service.permission;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.StrUtil;

import com.google.common.annotations.VisibleForTesting;
import com.google.common.collect.Lists;
import com.zcashjava.znl.framework.common.enums.CommonStatusEnum;
import com.zcashjava.znl.framework.common.util.object.BeanUtils;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.menu.MenuListReqVO;
import com.zcashjava.znl.module.system.controller.admin.permission.vo.menu.MenuSaveVO;
import com.zcashjava.znl.module.system.dal.dataobject.permission.MenuDO;
import com.zcashjava.znl.module.system.dal.mysql.permission.MenuMapper;
import com.zcashjava.znl.module.system.dal.redis.RedisKeyConstants;
import com.zcashjava.znl.module.system.enums.permission.MenuTypeEnum;
import com.zcashjava.znl.module.system.service.tenant.TenantService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

import static com.zcashjava.znl.framework.common.exception.util.ServiceExceptionUtil.exception;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertList;
import static com.zcashjava.znl.framework.common.util.collection.CollectionUtils.convertMap;
import static com.zcashjava.znl.module.system.dal.dataobject.permission.MenuDO.ID_ROOT;
import static com.zcashjava.znl.module.system.enums.ErrorCodeConstants.*;


@Service
@Slf4j
public class MenuServiceImpl implements MenuService {

    @Resource
    private MenuMapper menuMapper;
    @Resource
    private PermissionService permissionService;
    @Resource
    @Lazy 
    private TenantService tenantService;

    @Override
    @CacheEvict(value = RedisKeyConstants.PERMISSION_MENU_ID_LIST, key = "#createReqVO.permission",
            condition = "#createReqVO.permission != null")
    public Long createMenu(MenuSaveVO createReqVO) {
        
        validateParentMenu(createReqVO.getParentId(), null);
        
        validateMenuName(createReqVO.getParentId(), createReqVO.getName(), null);
        validateMenuComponentName(createReqVO.getComponentName(), null);

        
        MenuDO menu = BeanUtils.toBean(createReqVO, MenuDO.class);
        initMenuProperty(menu);
        menuMapper.insert(menu);
        
        return menu.getId();
    }

    @Override
    @CacheEvict(value = RedisKeyConstants.PERMISSION_MENU_ID_LIST,
            allEntries = true) 
    public void updateMenu(MenuSaveVO updateReqVO) {
        
        if (menuMapper.selectById(updateReqVO.getId()) == null) {
            throw exception(MENU_NOT_EXISTS);
        }
        
        validateParentMenu(updateReqVO.getParentId(), updateReqVO.getId());
        
        validateMenuName(updateReqVO.getParentId(), updateReqVO.getName(), updateReqVO.getId());
        validateMenuComponentName(updateReqVO.getComponentName(), updateReqVO.getId());

        
        MenuDO updateObj = BeanUtils.toBean(updateReqVO, MenuDO.class);
        initMenuProperty(updateObj);
        menuMapper.updateById(updateObj);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    @CacheEvict(value = RedisKeyConstants.PERMISSION_MENU_ID_LIST,
            allEntries = true) 
    public void deleteMenu(Long id) {
        
        if (menuMapper.selectCountByParentId(id) > 0) {
            throw exception(MENU_EXISTS_CHILDREN);
        }
        
        if (menuMapper.selectById(id) == null) {
            throw exception(MENU_NOT_EXISTS);
        }
        
        menuMapper.deleteById(id);
        
        permissionService.processMenuDeleted(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    @CacheEvict(value = RedisKeyConstants.PERMISSION_MENU_ID_LIST,
            allEntries = true) 
    public void deleteMenuList(List<Long> ids) {
        
        ids.forEach(id -> {
            if (menuMapper.selectCountByParentId(id) > 0) {
                throw exception(MENU_EXISTS_CHILDREN);
            }
        });

        
        menuMapper.deleteByIds(ids);
        
        ids.forEach(id -> permissionService.processMenuDeleted(id));
    }

    @Override
    public List<MenuDO> getMenuList() {
        return menuMapper.selectList();
    }

    @Override
    public List<MenuDO> getMenuListByTenant(MenuListReqVO reqVO) {
        
        List<MenuDO> menus = getMenuList(reqVO);
        
        tenantService.handleTenantMenu(menuIds -> menus.removeIf(menu -> !CollUtil.contains(menuIds, menu.getId())));
        return menus;
    }

    @Override
    public List<MenuDO> filterDisableMenus(List<MenuDO> menuList) {
        if (CollUtil.isEmpty(menuList)){
            return Collections.emptyList();
        }
        Map<Long, MenuDO> menuMap = convertMap(menuList, MenuDO::getId);

        
        List<MenuDO> enabledMenus = new ArrayList<>();
        Set<Long> disabledMenuCache = new HashSet<>(); 
        for (MenuDO menu : menuList) {
            if (isMenuDisabled(menu, menuMap, disabledMenuCache)) {
                continue;
            }
            enabledMenus.add(menu);
        }
        return enabledMenus;
    }

    private boolean isMenuDisabled(MenuDO node, Map<Long, MenuDO> menuMap, Set<Long> disabledMenuCache) {
        
        if (disabledMenuCache.contains(node.getId())) {
            return true;
        }

        
        if (CommonStatusEnum.isDisable(node.getStatus())) {
            disabledMenuCache.add(node.getId());
            return true;
        }

        
        Long parentId = node.getParentId();
        if (ObjUtil.equal(parentId, ID_ROOT)) {
            return false;
        }

        
        MenuDO parent = menuMap.get(parentId);
        if (parent == null || isMenuDisabled(parent, menuMap, disabledMenuCache)) {
            disabledMenuCache.add(node.getId());
            return true;
        }
        return false;
    }

    @Override
    public List<MenuDO> getMenuList(MenuListReqVO reqVO) {
        return menuMapper.selectList(reqVO);
    }

    @Override
    @Cacheable(value = RedisKeyConstants.PERMISSION_MENU_ID_LIST, key = "#permission")
    public List<Long> getMenuIdListByPermissionFromCache(String permission) {
        List<MenuDO> menus = menuMapper.selectListByPermission(permission);
        return convertList(menus, MenuDO::getId);
    }

    @Override
    public MenuDO getMenu(Long id) {
        return menuMapper.selectById(id);
    }

    @Override
    public List<MenuDO> getMenuList(Collection<Long> ids) {
        
        if (CollUtil.isEmpty(ids)) {
            return Lists.newArrayList();
        }
        return menuMapper.selectByIds(ids);
    }

    
    @VisibleForTesting
    void validateParentMenu(Long parentId, Long childId) {
        if (parentId == null || ID_ROOT.equals(parentId)) {
            return;
        }
        
        if (parentId.equals(childId)) {
            throw exception(MENU_PARENT_ERROR);
        }
        MenuDO menu = menuMapper.selectById(parentId);
        
        if (menu == null) {
            throw exception(MENU_PARENT_NOT_EXISTS);
        }
        
        if (!MenuTypeEnum.DIR.getType().equals(menu.getType())
                && !MenuTypeEnum.MENU.getType().equals(menu.getType())) {
            throw exception(MENU_PARENT_NOT_DIR_OR_MENU);
        }
    }

    
    @VisibleForTesting
    void validateMenuName(Long parentId, String name, Long id) {
        MenuDO menu = menuMapper.selectByParentIdAndName(parentId, name);
        if (menu == null) {
            return;
        }
        
        if (!menu.getId().equals(id)) {
            throw exception(MENU_NAME_DUPLICATE);
        }
    }

    
    @VisibleForTesting
    void validateMenuComponentName(String componentName, Long id) {
        if (StrUtil.isBlank(componentName)) {
            return;
        }
        MenuDO menu = menuMapper.selectByComponentName(componentName);
        if (menu == null) {
            return;
        }
        
        if (id == null) {
            return;
        }
        if (!menu.getId().equals(id)) {
            throw exception(MENU_COMPONENT_NAME_DUPLICATE);
        }
    }

    
    private void initMenuProperty(MenuDO menu) {
        
        if (MenuTypeEnum.BUTTON.getType().equals(menu.getType())) {
            menu.setComponent("");
            menu.setComponentName("");
            menu.setIcon("");
            menu.setPath("");
        }
    }

}
