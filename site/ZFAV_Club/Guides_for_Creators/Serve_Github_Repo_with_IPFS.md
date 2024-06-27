<a href="https://github.com/henryquincy/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Serve GitHub Repo with IPFS

## Introduction

In this guide we learn how to create a git cloneable URL for your GitHub repository served using an IPFS CID. 

This is useful to ensure content availability regardless of geographic region, censorship resistance and as a persistent backup of valuable information!

Note: Data uploaded to IPFS is available to all network users. You may wish to locally encrypt personal/sensitive data.

## Install IPFS Kubo

Follow installation instructions provided [here](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In this example we use Linux, other OS versions are available.

Check installation was successful using   ipfs –version

## Clone Repository

To start, select a Git repository you want to host & clone it:

Run Command: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Now, to get it ready to be cloned via IPFS.

cd zechub git update-server-info

Unpack Gits objects:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Doing this will allow IPFS to deduplicate objects if you update the Git repository later on.

## Add to IPFS

Once you have done that, that repository is ready to be served. All that is left to do is to add it to IPFS:

$ pwd

/code/myrepo

$ ipfs add -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

The resulting CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Brilliant! Now your repository is uploaded to the network.

## Clone using IPFS

You should now be able to retrieve the GitHub repository using:

git clone http://ipfs.io/ipfs/yourCID

Alternatively you are able to search & retrieve using your local IPFS node.

Final Note: The repo folder on IPFS does not receive updates alongside the actual github repository. It is recommended to reupload the folder at regular intervals.
