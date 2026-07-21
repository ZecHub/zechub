package com.zcashjava.znl.framework.ssh.struct;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.Getter;
import lombok.Setter;



public class NodeInfo {
	
	
	
	
	/**
	 * docker exec -it znl-zcash-node zcash-cli getblockchaininfo
	 */

	/**



{
  "chain": "main",
  "blocks": 106551,
  "initial_block_download_complete": false,
  "headers": 106551,
  "bestblockhash": "00000000790d07c5f24643d7b634bef68e35084f371c888cdda812d7465428d0",
  "difficulty": 987687.5023571346,
  "verificationprogress": 0.0205144803111574,
  "chainwork": "0000000000000000000000000000000000000000000000000002b2e199ab5912",
  "pruned": true,
  "size_on_disk": 720360422,
  "estimatedheight": 3412120,
  "commitments": 322016,
  "chainSupply": {
    "monitored": true,
    "chainValue": 1206748.44156848,
    "chainValueZat": 120674844156848
  },
  "valuePools": [
    {
      "id": "transparent",
      "monitored": true,
      "chainValue": 1181959.23703121,
      "chainValueZat": 118195923703121
    },
    {
      "id": "sprout",
      "monitored": true,
      "chainValue": 24789.20453727,
      "chainValueZat": 2478920453727
    },
    {
      "id": "sapling",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    },
    {
      "id": "orchard",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    },
    {
      "id": "lockbox",
      "monitored": true,
      "chainValue": 0.00000000,
      "chainValueZat": 0
    }
  ],
  "softforks": [
    {
      "id": "bip34",
      "version": 2,
      "enforce": {
        "status": true,
        "found": 4000,
        "required": 750,
        "window": 4000
      },
      "reject": {
        "status": true,
        "found": 4000,
        "required": 950,
        "window": 4000
      }
    },
    {
      "id": "bip66",
      "version": 3,
      "enforce": {
        "status": true,
        "found": 4000,
        "required": 750,
        "window": 4000
      },
      "reject": {
        "status": true,
        "found": 4000,
        "required": 950,
        "window": 4000
      }
    },
    {
      "id": "bip65",
      "version": 4,
      "enforce": {
        "status": true,
        "found": 4000,
        "required": 750,
        "window": 4000
      },
      "reject": {
        "status": true,
        "found": 4000,
        "required": 950,
        "window": 4000
      }
    }
  ],
  "upgrades": {
    "5ba81b19": {
      "name": "Overwinter",
      "activationheight": 347500,
      "status": "pending",
      "info": "See https://z.cash/upgrade/overwinter/ for details."
    },
    "76b809bb": {
      "name": "Sapling",
      "activationheight": 419200,
      "status": "pending",
      "info": "See https://z.cash/upgrade/sapling/ for details."
    },
    "2bb40e60": {
      "name": "Blossom",
      "activationheight": 653600,
      "status": "pending",
      "info": "See https://z.cash/upgrade/blossom/ for details."
    },
    "f5b9230b": {
      "name": "Heartwood",
      "activationheight": 903000,
      "status": "pending",
      "info": "See https://z.cash/upgrade/heartwood/ for details."
    },
    "e9ff75a6": {
      "name": "Canopy",
      "activationheight": 1046400,
      "status": "pending",
      "info": "See https://z.cash/upgrade/canopy/ for details."
    },
    "c2d6d0b4": {
      "name": "NU5",
      "activationheight": 1687104,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu5/ for details."
    },
    "c8e71055": {
      "name": "NU6",
      "activationheight": 2726400,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu6/ for details."
    },
    "4dec4df0": {
      "name": "NU6.1",
      "activationheight": 3146400,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu6.1/ for details."
    },
    "5437f330": {
      "name": "NU6.2",
      "activationheight": 3364600,
      "status": "pending",
      "info": "See https://z.cash/upgrade/nu6.2/ for details."
    }
  },
  "consensus": {
    "chaintip": "00000000",
    "nextblock": "00000000"
  },
  "pruneheight": 102302
}



	 */
	private ObjectNode blockchaininfo;
	
	public ObjectNode getBlockchaininfo() {
		return blockchaininfo;
	}
	
	public void setBlockchaininfo(ObjectNode blockchaininfo) {
		this.blockchaininfo = blockchaininfo;
	}
	
	
	@Getter
	@Setter
	private List<PeerInfo> peerInfos = new ArrayList<>();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
