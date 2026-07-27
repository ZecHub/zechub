<a href="https://github.com/Zechub/zechub/edit/main/site/Zcash_Community/ZFAV_Club/Guides/Github_With_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Serve Github Repo with IPFS 

## Introduction

In this guide we learn how to create a git cloneable URL for your Github repository served using an IPFS CID. This is  useful to ensure content availabily regardless of geographic region, censorship resistance and as a perisistent backup of valuable information!

Note: Data uploaded to IPFS is available to *all* network users. You may wish to locally encrypt personal/sensitive data.


## Install IPFS Kubo

Follow installation instructions provided [here](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

In this example we use Linux, other OS versions are available. 

Check installations was successful using "ipfs --version" 


## Clone Repository 

To start, select a Git repository you want to host & clone it:

Run Command: "git clone https://github.com/zechub/zechub"

![](/content-images/Screenshot-from-2023-05-20-14-14-46-8503afccc3.webp)


Now, to get it ready to be cloned via IPFS.

cd zechub
git update-server-info


Unpack Git's objects:

mv objects/pack/*.pack .
git unpack-objects < *.pack
rm -f *.pack objects/pack/*

Doing this will allow IPFS to deduplicate objects if you update the Git repository later on.


## Add to IPFS 

Once you've done that, that repository is ready to be served. All that's left to do is to add it to IPFS:

$ pwd

/code/myrepo

$ ipfs add -r .

![](/content-images/Screenshot-from-2023-05-20-14-22-38-3fc2f72d91.webp)

The resulting CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![](/content-images/Screenshot-from-2023-05-20-14-26-34-6e00fee828.webp)

Brilliant! Now your repository is uploaded to the network.


## Clone using IPFS 

You should now be able to retrieve the github repository using:

git clone http://ipfs.io/ipfs/"yourCID"

Alternatively you are able to search & retrieve using your local IPFS node. 

Final Note: The repo folder on IPFS does not receive updates alongside the actual github repository. It is recommended to reupload the folder at regular intervals. 
