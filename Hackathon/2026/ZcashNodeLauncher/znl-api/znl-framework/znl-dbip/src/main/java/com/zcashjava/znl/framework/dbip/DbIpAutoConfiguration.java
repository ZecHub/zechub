package com.zcashjava.znl.framework.dbip;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.maxmind.geoip2.DatabaseReader;

@AutoConfiguration
@EnableConfigurationProperties(DbIpProperties.class)
public class DbIpAutoConfiguration {

	
	@Autowired
	private DbIpProperties properties;
	
	
	@Bean
	public DatabaseReader dbIpReader() throws IOException {

		File dbFile = new File(properties.getBinFilePath());
        DatabaseReader reader = new DatabaseReader.Builder(dbFile).build();

        return reader;
	}
	
	
	
	
	
	
	
	
}
