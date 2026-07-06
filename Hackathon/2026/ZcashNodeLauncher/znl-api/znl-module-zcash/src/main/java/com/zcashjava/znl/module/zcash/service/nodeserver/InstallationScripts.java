package com.zcashjava.znl.module.zcash.service.nodeserver;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class InstallationScripts {
	
	
	private List<InstallationScript<String>> internalInstallationScripts = new ArrayList<>();
	
	
	private List<InstallationScript<Long>> customInstallationScripts = new ArrayList<>();
	
	
	

}
