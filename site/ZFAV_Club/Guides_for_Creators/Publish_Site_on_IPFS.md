# Publish a Site on IPFS

![https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg](https://blog.desdelinux.net/wp-content/uploads/2020/04/IPFS-.jpg)

## Introduction to IPFS

IPFS (InterPlanetary File System) is a peer-to-peer protocol and network designed to create a decentralised method of storing and sharing files.

Unlike the traditional client-server model of the internet, IPFS allows users to share files directly with each other, rather than relying on a centralised server to store and distribute content.

Files in IPFS are addressed using *content-addressing*, meaning each file is given a unique hash or CONTENT IDENTIFIER (CID) based on its content, and this hash is used to retrieve the file from the network.

When a user adds a file to IPFS, the file is broken up into small pieces called blocks, and each block is given a CID. These blocks are then stored on different nodes in the network, so that the file can be easily retrieved from multiple sources.

This ensures redundancy and fault-tolerance while also making it difficult for any one node to become a single point of failure or control.

**Read: [An Introduction to IPFS](https://blog.infura.io/post/an-introduction-to-ipfs)**

## Creating your Site

For this example we are creating a simple website.

[Example Site](https://squirrel.surf/)

**Step 1:** If you are unfamiliar with web design write the main content for your website including Title, Main Body of text, with links to other pages/site & footers.

**Step 2:** Use a [HTML template!](https://nicepage.com/html-templates) Paste the text you have written accordingly. Optional to also create a .CSS stylesheet for your website.

**Step 3:** Save your directory. All .html pages + images must be in the same Folder.

## Setting up a Node

Download and install IPFS from the [Official website](https://docs.ipfs.tech/install/ipfs-desktop/).

### Initialise IPFS:

If you’re using the Desktop Application you will not have to initialise.

Using a Terminal or command prompt, Run command: ipfs init .

### **Add Site Folder to IPFS**:

Select the folder with your website files and navigate to the Add Folder option.

![https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png](https://i.ibb.co/ZHW4zsY/ipfs-site-folder.png)

–

If using Terminal, Run command: ipfs add -r “folder_name” to add the entire folder recursively to IPFS.

### Pin Site on IPFS:

Once your website files are added to IPFS, you need to **pin** them to ensure they remain available on the network.

–

If using Terminal, Run command: If using Terminal, Run command: ipfs pin add “hash”

“hash” = CID of the folder you added in the previous step.

Alternatively, you are also able to pin directories using services such as [Pinata](https://pinata.cloud/) or [Dolpin](https://dolpin.io/)

It saves a lot of time!

–

### Access your website on IPFS:

Your website is now published on IPFS and can be accessed using the hash of the folder. To access your website, you can visit https://ipfs.io/ipfs/“hash”

“hash” = CID of the folder.

In our case the CID = “QmW2UEfap1vrRRvS5H9wed8qmsx4WsvXBk3GPGVVfWx3r3”

## IPNS

Interplanetary Naming System (IPNS) allows you to update the IPFS CID’s associated with your website and still serve a static link. It is provided as a key.

![https://dnslink.io/assets/dns-query.a0134a75.png](https://dnslink.io/assets/dns-query.a0134a75.png)

In the settings menu for your site folder on IPFS desktop application select Publish to IPNS.

![https://i.ibb.co/Ch25dKf/IPNS.png](https://i.ibb.co/Ch25dKf/IPNS.png)

Key: “k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n”

It can also be used to view our site via a gateway: https://ipfs.io/ipns/k51qzi5uqu5di670a6uxywo17b2be1eyhoa2cl0qlwpfxn5p9ypcu8jbzgnj4n

## DNS Link

The site has been created, now we need a way to point a URL to the content.

If you already own a web address you are able to add a new record using the TXT record "_dnslink(your domain)". Depending on provider it may auto populate.

![https://i.ibb.co/MgRxBHj/example.png](https://i.ibb.co/MgRxBHj/example.png)

It will take time to propagate through the network before you can view it.

*Congratulations! You now have a censorship resistant website.*

____

**Resources**

[IPFS Documentation](https://docs.ipfs.tech/)

[IPNS Documentation](https://docs.ipfs.tech/concepts/ipns/)

[DNS link Docs](https://dnslink.io/#introduction)
