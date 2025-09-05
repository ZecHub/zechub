# Zkool Multisig Guide

This guide provides a step by step walkthrough on how to perform multisig transactions using Zkool. It includes creating accounts, sending or receiving funds, and setting up distributed key generation (DKG) for multisig. Screenshots are included for each major step.

## 1. Creating an Account


1. Open the **Zkool app** and go to **New Account**.  
   ![New Account](https://i.ibb.co/bMjdXDXv/zkool1.png)


2. Enter an **Account Name** (eg *Anabelle*).  
   ![Enter Account Name](https://i.ibb.co/NgxHcb6R/zkool2.png)


3. Optionally toggle **Use Internal Change** or **Restore Account** if needed.


4. After creation, the account will appear in your **Account List**.  
   ![Account List](https://i.ibb.co/Xxjhwppy/zkool3.png)


## 2. Receiving Funds

Each account generates multiple address types:

- **Unified Address**
  
- **Orchard only Address**
   
- **Sapling Address**
  
- **Transparent Address**


Select the type you want to use and share it to receive funds.  
![Screenshot: Receiving Address](https://i.ibb.co/21XYBRhW/zkool4.png)




## 3. Sending Funds

1. Go to the **Recipient** section.  
![Recipient Section](https://i.ibb.co/8nhg1TPm/zkool5.png)

2. Enter the **recipients address**.  

3. Specify the **amount** and optional **memo**.  

4. Review the transaction details and **confirm**.  


Once complete, the balance updates in your account list.  
![Transaction Confirmation](https://i.ibb.co/60PnV6jg/zkool6.png)



## 4. Performing Multisig Transactions: Setting Up Distributed Key Generation (Multisig)

Multisig in Zkool uses **Distributed Key Generation (DKG)** to ensure multiple participants control a shared account.



### Step 1: Initiate DKG
- Choose a **Name** for the shared wallet (eg *Anabelle*).

- Set the **Number of Participants**.
  
- Choose your **Participant ID**.
  
- Define the **Number of Signers Required (Threshold)**.
    
- Select the **Funding Account**.
  
![DKG Setup](https://i.ibb.co/9m9V8nMg/zkool7.png)




### Step 2: Add Participant Addresses
- Enter each participants **Unified Address** (recommended).


⚠️ **Note:** If you use an Orchard only or Sapling only address, the multisig will be limited to that pool only (Orchard or Sapling).  
This means the shared wallet cannot receive funds from other pools.  
For maximum compatibility and flexibility, always use **Unified Addresses**.  


### Step 3: Run DKG Rounds
- Wait for all participants to exchange **round 1** and **round 2** packages.  
![Screenshot: DKG Rounds](https://i.ibb.co/HpP44wgG/zkool8.png)



### Step 4: Finalize Shared Address
- Once complete, a **shared address** is generated.  
![Screenshot: Shared Address](https://i.ibb.co/VZDpy0k/zkool9.png)



## ✅ Conclusion

Using Zkool, you can:

- Create accounts
  
- Send and receive funds
  
- Set up a **multisig wallet** using Distributed Key Generation  

This ensures **enhanced security** and **collaborative and private fund management**.  

