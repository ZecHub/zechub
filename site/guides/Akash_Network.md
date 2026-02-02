# How to run Zcashd on Akash Network 

## Tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/SVekeNU6_-g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Running a Zcash Node on Akash Network 

Note: Previous Akash instructions relied on a legacy VM-based UI and manual apt installation. Akash has transitioned to a container-first deployment model using SDL (Stack Definition Language) and the Akash Console. This guide reflects the current, supported workflow.


## Prerequisites

Before deploying a Zcash node on Akash, ensure you have:
	•	Keplr Wallet installed
https://keplr.app
	•	Funded AKT wallet (recommended minimum: 5–10 AKT)
Obtain AKT via Osmosis: https://osmosis.zone
	•	Access to the Akash Console
https://console.akash.network

## Deployment Model Overview

Akash no longer supports interactive VM-style setups. Instead:
	•	Deployments are defined using SDL files
	•	Applications run as Docker containers
	•	Storage must be explicitly declared as persistent volumes
	•	Deployments are managed via the Akash Console or Akash CLI

For Zcash, this means running zcashd inside a container with a mounted persistent data directory.

### Recommended Hardware Requirements

For a full Zcash mainnet node:
	•	CPU: 4 vCPUs
	•	Memory: 8 GB RAM
	•	Storage: 300 GB persistent storage (required)

⚠️ Ephemeral storage is not suitable for Zcash nodes. Persistent storage must be enabled in the SDL.

## Deploying a Zcash Node via Akash Console
	1.	Open the Akash Console: https://console.akash.network
	2.	Connect your Keplr wallet
	3.	Click Deploy to create a new deployment
	4.	Paste or upload an SDL file defining the Zcash service


## Deployment and Synchronization

#After submitting the SDL:
	•	Select a provider and create a lease
	•	Monitor logs directly in the Akash Console
	•	zcashd will start syncing automatically

Estimated full sync time: 2–3 days (varies by provider and network conditions).


### Security and Operational Notes
	•	Do not expose RPC ports publicly unless authentication is configured
	•	Ensure persistent storage is enabled to avoid data loss
	•	Consider pruned nodes or snapshots if full archival data is not required
	•	Redeploying without persistent volumes will require a full resync


### Conclusion

Akash Network’s modern deployment workflow requires Zcash nodes to be deployed as containerized services using SDL definitions. Updating the ZecHub Wiki to reflect this approach ensures accurate, secure, and maintainable guidance for current and future node operators.
