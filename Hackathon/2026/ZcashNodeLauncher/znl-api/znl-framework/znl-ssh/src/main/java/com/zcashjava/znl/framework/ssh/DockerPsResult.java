package com.zcashjava.znl.framework.ssh;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Strings;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.zcashjava.znl.framework.common.util.json.JsonUtils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DockerPsResult {
	
	
	
	private ObjectNode node;
	
	
	public static List<DockerPsResult> parse(String psCmdOutput) throws JsonMappingException, JsonProcessingException {
		
		psCmdOutput = Strings.CS.replace(psCmdOutput, "Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.", "");
		
		
		List<DockerPsResult> results = new ArrayList<>();
		
		if (StringUtils.isBlank(psCmdOutput)) {
			return results;
		}

		ObjectMapper om = JsonUtils.getObjectMapper();
		
		String[] rows = psCmdOutput.split("(\r\n)|(\n)");
		for (String row : rows) {
			if (StringUtils.isBlank(row)) {
				continue;
			}
			
			ObjectNode node = (ObjectNode) om.readTree(row);
			
			DockerPsResult result = new DockerPsResult();
			result.setNode(node);
			
			
			results.add(result);
			
			
		}
		
		
		return results;
		
	}
	
	
	
	
	

}
