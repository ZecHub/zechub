package com.zcashjava.znl.framework.security.core.service;


public interface SecurityFrameworkService {

    
    boolean hasPermission(String permission);

    
    boolean hasAnyPermissions(String... permissions);

    
    boolean hasRole(String role);

    
    boolean hasAnyRoles(String... roles);

    
    boolean hasScope(String scope);

    
    boolean hasAnyScopes(String... scope);
}
