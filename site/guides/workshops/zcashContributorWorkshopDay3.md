# Workshop Day 3



## Data Analytics

* The science of analyzing raw data using specialized systems, tools, and techniques to identify patterns, trends, and insights


It involves:
```markdown
                     \
-> collecting         \
-> cleaning     =====  \  DATA
-> organizing   =====  / 
-> transforming       /
-> optimizing        /
```




## Zcash 

* Encrypted electronic cash. The first cryptocurrency to develop zero-knowledge encryption for private peer-to-peer payments.

note: If you want accurate data that you TRUST, it is recommended to run your own full node [zebrad]. You can setup the
z3 infrastructure [ zebrad + zainod/lightwalletd + "wallet of choice here" ] if you want a complete and robust solution. You access
the data using RPC's(Remote Procedure Calls)

For a quick demostration of how this works, watch this video:


https://www.youtube.com/watch?v=Ok9Wa8FNbMA


## Workshop Demo

This workshop will focus on collecting and transforming data from the wallet level. This level is where most folks will access
the Zcash blockchain.


### Usecase ( Create a .csv file of all transactions for a given account in Zkool)

This is a popular scenario where one would need to organize and optimize their *digital* personal finances.

#### Step 1

Open Zkool and select the account you want to use

note: We will be using a testnet wallet for this demo.

note2: We are choosing Zkool here, but ANY wallet that has export functionality will work!

https://github.com/hhanh00/zkool2

<img width="1496" height="646" alt="1" src="https://github.com/user-attachments/assets/125adfe8-6be3-4798-8ee8-b96bba9fb9ac" />



#### Step 2


Go to the top right menu and select "Export Transactions"

<img width="1398" height="718" alt="2" src="https://github.com/user-attachments/assets/4287ceb6-669b-4ef0-ba24-3f7e2d9860b6" />


#### Step 3

Download bash script we will use to transform our data. For Developers who are watching, I will be using bash which
is standard in most Linux Distros, but you can use your language of choice. 

For non-devs or students getting your feet wet, use AI! 

Some example prompts that can get you started:

"How can I use "bash/rust/python/ ... etc." to transform CSV files"

<img width="1098" height="480" alt="3" src="https://github.com/user-attachments/assets/6503f4be-6fbc-473f-919c-8914e09181bc" />

note: You still need to understand the basics but running these workshops are how you understand the FLOW of the process.

note2: AI is not usually private so be extra careful when using it as a student!

#### Step 4

Setup scripts for use and run

`chmod +x cleanCSV.sh`

`./cleanCSV.sh "name_of_exportBackup"`

#### Step 5 Use data

Open in libreOffice or any CSV viewer for use!



<img width="2132" height="942" alt="4" src="https://github.com/user-attachments/assets/1097030d-c0f4-44c4-b15c-f86706a77bdc" />
























