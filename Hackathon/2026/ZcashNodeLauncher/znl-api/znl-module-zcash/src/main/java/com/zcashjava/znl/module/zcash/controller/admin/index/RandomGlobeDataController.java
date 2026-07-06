package com.zcashjava.znl.module.zcash.controller.admin.index;

import static com.zcashjava.znl.framework.common.pojo.CommonResult.success;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maxmind.geoip2.DatabaseReader;
import com.zcashjava.znl.framework.common.pojo.CommonResult;
import com.zcashjava.znl.module.zcash.service.nodeserver.GlobeData;
import com.zcashjava.znl.module.zcash.service.nodeserver.GlobeDataUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "ZNL - Node Server")
@RestController
@RequestMapping("/zcash/index")
@Validated
public class RandomGlobeDataController {

	
	
	@Autowired
	private DatabaseReader dbIpReader;
	



    @GetMapping("/getRandomGlobeData")
    @Operation(summary = "getRandomGlobeData")
    public CommonResult<GlobeData> getRandomGlobeData() throws IOException {
    	
    	GlobeData globeData = GlobeDataUtils.randomGlobeData(dbIpReader);
    	
    	
        return success(globeData);
    }


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
