# Zkool Multisig Guide

This guide provides a step by step walkthrough on how to perform multisig transactions using Zkool. It includes creating accounts, sending or receiving funds, and setting up distributed key generation (DKG) for multisig. Screenshots are included for each major step.

## Tutorial

<iframe width="640" height="360" src="https://www.youtube.com/embed/eagkCIv3BlQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1. Creating an Account


1. Open the **Zkool app** and go to **New Account**.

<img width="180" height="180" alt="zkool1" src="https://github.com/user-attachments/assets/ee906e49-361a-49b6-9484-904897fe2e3f" />

3. Enter an **Account Name** (eg Anabelle).  
   
<img width="180" height="180" alt="zkool2" src="https://github.com/user-attachments/assets/e9c325d3-8507-433a-a0c6-6e8c1ea2a254" />


4. Optionally toggle **Use Internal Change** or **Restore Account** if needed.


5. After creation, the account will appear in your **Account List**.  

<img width="180" height="180" alt="zkool3" src="https://github.com/user-attachments/assets/c446cbca-fb3e-49b9-b1d4-fd727cd1b0fb" />


## 2. Receiving Funds

Each account generates multiple address types:

**Unified Address**

**Orchard only Address**

**Sapling Address**
  
**Transparent Address**


Select the type you want to use and share it to receive funds.  

<img width="180" height="180" alt="zkool4" src="https://github.com/user-attachments/assets/c9de5dfe-e9d7-423d-8d90-35c1a08ffd5d" />





## 3. Sending Funds

1. Go to the **Recipient** section.  

<img width="180" height="180" alt="zkool5" src="https://github.com/user-attachments/assets/9f3a03b9-dd56-450c-a8dc-4370f9289138" />


3. Enter the **recipients address**.  

4. Specify the **amount** and optional **memo**.  

5. Review the transaction details and **confirm**.  


Once complete, the balance updates in your account list.  

<img width="180" height="180" alt="zkool6" src="https://github.com/user-attachments/assets/6e6da76b-cd18-4567-a5c0-74f07ddefc64" />


## 4. Performing Multisig Transactions: Setting Up Distributed Key Generation (Multisig)

Multisig in Zkool uses **Distributed Key Generation (DKG)** to ensure multiple participants control a shared account.



### Step 1: Initiate DKG
Choose a **Name** for the shared wallet (eg Anabelle).

Set the **Number of Participants**.
  
Choose your **Participant ID**.
  
Define the **Number of Signers Required (Threshold)**.
    
Select the **Funding Account**.
  

<img width="180" height="180" alt="zkool7" src="https://github.com/user-attachments/assets/8a90ca85-5439-4937-b16d-a570e69d55f0" />



### Step 2: Add Participant Addresses
- Enter each participants **Unified Address** (recommended).


**Note:** If you use an Orchard only or Sapling only address, the multisig will be limited to that pool only (Orchard or Sapling).  
This means the shared wallet cannot receive funds from other pools.  
For maximum compatibility and flexibility, always use **Unified Addresses**.  


### Step 3: Run DKG Rounds
Wait for all participants to exchange **round 1** and **round 2** packages.  

<img width="180" height="180" alt="zkool8" src="https://github.com/user-attachments/assets/cdaf6e00-3cb0-4774-8a96-5ded19bf31c4" />



### Step 4: Finalize Shared Address
Once complete, a **shared address** is generated.  

<img width="180" height="180" alt="zkool9" src="https://github.com/user-attachments/assets/741d1bc6-0102-4e67-bb83-9a1c184bd747" />



## Conclusion

Using Zkool, you can: create accounts, send and receive funds, and set up a **multisig wallet** using Distributed Key Generation. This ensures **enhanced security** and **collaborative and private fund management**.  

