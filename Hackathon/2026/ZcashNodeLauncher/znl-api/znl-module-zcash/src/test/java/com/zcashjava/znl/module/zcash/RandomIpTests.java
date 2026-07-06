package com.zcashjava.znl.module.zcash;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigInteger;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.MutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import com.zcashjava.znl.module.zcash.service.nodeserver.GlobeDataUtils;

public class RandomIpTests {
	
	
	@Test
	void testRandomIp() throws Exception {
		
		

    	
    	List<Pair<String, String>> publicNetIpRange = new ArrayList<>();
    	publicNetIpRange.add(new MutablePair<String, String>("1.0.0.0", "9.255.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("11.0.0.0", "126.255.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("128.0.0.0", "169.253.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("169.255.0.0", "172.15.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("172.32.0.0", "191.255.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("192.0.0.0", "192.167.255.255"));
    	publicNetIpRange.add(new MutablePair<String, String>("192.169.0.0", "223.255.255.255"));
    	

		Pair<String, String> randomIpRange = publicNetIpRange.get((int) (publicNetIpRange.size() * Math.random()));
		
		String start = randomIpRange.getLeft();
		String end = randomIpRange.getRight();
		
		byte[] startBytes = InetAddress.getByName(start).getAddress();
		BigInteger startInteger = new BigInteger(1, startBytes);
		byte[] endBytes = InetAddress.getByName(end).getAddress();
		BigInteger endInteger = new BigInteger(1, endBytes);
		
		
		long random = (long) (Math.random() * endInteger.subtract(startInteger).longValue());
		
		BigInteger randomIpNumber = startInteger.add(BigInteger.valueOf(random));
		
	    String randomIp = GlobeDataUtils.bigIntToIp(randomIpNumber);
		
		System.out.println(randomIp);
		
	}
	
	

}
