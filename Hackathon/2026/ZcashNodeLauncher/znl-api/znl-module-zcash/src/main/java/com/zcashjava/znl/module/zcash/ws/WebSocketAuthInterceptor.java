package com.zcashjava.znl.module.zcash.ws;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import com.zcashjava.znl.framework.security.core.LoginUser;
import com.zcashjava.znl.framework.security.core.util.SecurityFrameworkUtils;

public class WebSocketAuthInterceptor extends HttpSessionHandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
    	LoginUser loginUser = SecurityFrameworkUtils.getLoginUser();
        if (loginUser != null) {
            WebSocketSessionUtils.setLoginUser(loginUser, attributes);
        }
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
}