package com.zcashjava.znl.module.zcash.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@EnableWebSocket
@Configuration
public class GlobeDataWsConfiguration implements WebSocketConfigurer {
	
	
	
	@Autowired
	private AutowireCapableBeanFactory beanFactory;
	
	
	@Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		
		GlobeDataHandler globeDataHandler = new GlobeDataHandler();
		beanFactory.autowireBean(globeDataHandler);
		
		
        registry.addHandler(globeDataHandler, "/zcash/ws/node-server/realtime-server-info")
                .setAllowedOrigins("*")
                .addInterceptors(new WebSocketAuthInterceptor());
    }
	
	
	

}
