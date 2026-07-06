package com.zcashjava.znl.framework.dbip;

import java.io.File;
import java.net.InetAddress;

import org.junit.jupiter.api.Test;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CityResponse;

public class TestDbip {
	
	
	
	@Test
	void testDbIp() throws Exception {
		
		
		File dbFile = new File(System.getProperty("user.home") + "/dbip/dbip-city-lite-2026-07.mmdb");
        DatabaseReader reader = new DatabaseReader.Builder(dbFile).build();

        InetAddress ip = InetAddress.getByName("1.0.0.5");
        CityResponse response = reader.city(ip);
        
        System.out.println(response.getLocation().getLatitude() + ", " + response.getLocation().getLongitude());
        
        System.out.println("Country: " + response.getCountry().getName());
        System.out.println("Region: " + response.getMostSpecificSubdivision().getName());
        System.out.println("City: " + response.getCity().getName());
		
		
	}
	
	
	
	
	
	

}
