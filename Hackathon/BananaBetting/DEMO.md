# A Step-by-Step Demonstration of Capabilities 

**⚠️ IMPORTANT DISCLAIMER ⚠️**
This project was created for the [**2025 ZecHub Hackathon**](https://hackathon.zechub.wiki/) and is intended **ONLY** for educational purposes, blockchain functionality testing, and hackathon demonstration.

## Screenshots of the Home Page 

![Homepage scroll 1](screenshots/home_1.png)
![Homepage scroll 2](screenshots/home_2.png)
![Homepage scroll 3](screenshots/home_3.png)

## Making An Account

Let's make a new user!

![Screenshot of making a user account](screenshots/make_user_test2.png)

Success! 

![Screenshot of the user account page](screenshots/profile_made_test2.png)

But do they have a wallet with valid addresses? 

![Screenshot of the zcash addresses](screenshots/profile_addresses_test2.png)

Are those addresses real? 

T-Address:

```bash
curl --user rpcuser:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_validateaddress", "params": ["t1SJNuLP4V2FxEMTsvcbchEqy77EfyDypfb"] }' -H 'content-type: text/plain;' http://84.32.151.95:8232/
```

Results:

```bash
{"result":{"isvalid":true,"address":"t1SJNuLP4V2FxEMTsvcbchEqy77EfyDypfb","address_type":"p2pkh","ismine":true},"error":null,"id":"curltest"}
```

Unified Address:

```bash
curl --user rpcuser:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_validateaddress", "params": ["u1yvde4d53qp5wnhm843nxj3ayu8ev8l3fmna8yqkzk9weczw3q2fucf8yrtugqtdacjrjvvracszcy0ggesc7jrtklecv3rjeqtsjh453eqte8s486zksg3k5m44g03mdwqnlra8cexyh0xky5xw4x9yj065rvwan4zd64cjn622nthl90halsttvd7d09k7n8pfcjue356rhuzvglea"] }' -H 'content-type: text/plain;' http://84.32.151.95:8232/
```

Results:

```bash
{"result":{"isvalid":true,"address":"u1yvde4d53qp5wnhm843nxj3ayu8ev8l3fmna8yqkzk9weczw3q2fucf8yrtugqtdacjrjvvracszcy0ggesc7jrtklecv3rjeqtsjh453eqte8s486zksg3k5m44g03mdwqnlra8cexyh0xky5xw4x9yj065rvwan4zd64cjn622nthl90halsttvd7d09k7n8pfcjue356rhuzvglea","address_type":"unified"},"error":null,"id":"curltest"}
```
Success, a user with an account with real addresses. 

## Adding ZEC to the account 
Let's add some ZEC to test2. From my personal Zashi account, let's send to test2. 

> **Transaction hash:** 425fdebbe283a5231fa422354cdafae316f5ee3bed926d4619cb5af11f6cb60e

![Screenshot of sending the money](screenshots/adding_ZEC_blockexplorer_test2.png)

But did we get it back in Banana Betting test2 account?

```bash
curl --user rpcuser:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressbalance", "params": [{"addresses": ["t1SJNuLP4V2FxEMTsvcbchEqy77EfyDypfb"]}] }' -H 'content-type: text/plain;' http://84.32.151.95:8232/
```

Results: 

```
{"result":{"balance":10000,"received":10000},"error":null,"id":"curltest"}
```
Yes, we see a new balance in test2's account on the blockchain. But does Banana betting see it? 

![screenshot of receiving the money in the test2 account](screenshots/profile_receive_funds_test2.png)

Turns out I need more than 0.0001 to play with...adding 0.0166 ZEC or ~$1. 

> Transaction Hash: 56eb59f3f6f01e6d052ebef871234bc06d556c2c7555b728a4b4fd40744788e7

## Shielding Transparent Funds 
Just like Zashi, we need the ability to shield our t-address unshielded funds. Since the shielded fund is a common pool for this multi-user custodial accounting system, we want all funds here to process bets in and out of. 

![Screenshot of warning to shield funds](screenshots/shield_your_funds.png)

We see that the first 0.0001 transaction I made was public (so I could confirm it all worked). Let's shield that. 

![screenshots of shielding funds](screenshots/successful_shield_BB.png)

Let's check that OPID into a transaction hash. 
> OPID: opid-4bc8e0c7-a315-4364-9a9e-b0b3ed140cb2

![screenshots of transaction hash checking](screenshots/shield_your_funds_txid.png)

And now to check on ZEC block explorer, although we won't see much. 

> Transaction hash: 0b1cf9e8d4536c68c52246e334504c296c5658bb07a45674cb9eb292d45dc909

![Screenshot of the block explorer](screenshots/shield_your_funds_blockexplorer.png)

Yay, we have fully shielded funds with a backend bookkeeping system. (Yes I know it's not full defi, this is a hackathon and custodial wallets make this easier.)

## Submitting a Charity
Let's submit a new charity as well as its zcash addresses. We ask for both transparent and shielded addresses so that if people want to make donations in either one that is an option. All betting distributions will be made to the transparent address. We do not create custodial accounts for the non-profits, they get the distributions automatically.

![Screenshot of making a Charity](screenshots/add_nonprofit.png)

Here is our new charity listing, as well as a place to find other charities that accept cryptocurrency.

![Screenshot of the charity list page](screenshots/charity_made.png)

## Making a Betting Event

Take a look at the form for making a new betting event.

![Screenshot of making a betting event](screenshots/make_event1.png)

![Screenshot of making a betting event](screenshots/make_event2.png)

![Screenshot of the database with betting event](screenshots/find_bets.png)

## Placing Bets
If a user tries to make a bet but they don't have enough in their wallet to cover their bets:

![Screenshot of placing a bet: not enough balance](screenshots/low_balance_bet_error.png)

If they have enough ZEC in their account to cover the bet: 

![Screenshot of placing a bet: successful](screenshots/placed_bets_page.png)

Now the bet is recorded in the database, since all funds are in the shielded pool to start, this bet doesn't require a blockchain transaction. We just see it in the updated wallet balance.

![screenshot of new wallet balance](screenshots/post_bet_wallet_balance.png)

Great, we have made a private bet (not on the blockchain) on the outcome of the event with the amount deduced from the bettor's account and added to the pool address.

## Validating the Outcome of Other Events 
Let's vote on the outcome of an event that we didn't bet in. 

![Screenshot of the validation page](screenshots/validate_event.png)

Then we can see results of other validators. 

![Screenshot of the post-submission validation page](screenshots/event_closed.png)
![screenshots of the post-submission validation page 2](screenshots/event_validation_results.png)

## [Admin] Payouts

Now that the event is settled, and the consensus reached it's time to payout the winners. In a real system, this would be automated. In this hackathon system, I have to push the buttons. The event is processed in a single, z_sendmany transaction.

(Yes, you can see some mock addresses for my fake validators. It's not a problem.)

![screenshot of the payout receipt](screenshots/payout_reciept_1.png)
![screenshot of the payout receipt](screenshots/payout_reciept_2.png)
![screenshot of the payout receipt](screenshots/payout_reciept_3.png)

Success! We paid out the betting event. 

![screenshot of the payout success and OPID](screenshots/payout_success_OPID.png)

Going from OPID to transaction hash:

>Transaction hash ID::b51575a20aba5ac028aef1869d8a1143e84fcb311bdc03afe9071d2c320cd4fd

![screenshot of blockexplorer](screenshots/payout_success_blockexplorer.png)

Checking "The House"'s Zashi account: 

![screenshot of my transaction in Zashi](screenshots/payout_house_zashi.png)

Since I'm friends with [Tech learning Collective](https://techlearningcollective.com/) I asked them to check their wallet, and send over a screenshot. Grainy, but here it is. No banana for scale. 

![screenshot of TLC's wallet](screenshots/payout_TLC.jpeg)

Wait a minute...why are there only 2 blockchain transactions (1 private, 1 public) if we really have 7? Since this is a custodial situation, the Event Creator and Validators get the money deposited into their Banana Betting accounts. This is an internal database update, and not a blockchain transaction. They would need to cash out their balance from Banana Betting's wallet to their own self-custody wallet. 

## Cashing out Balances

![Screenshots of a user cashing out their balance](screenshots/cash_out_user_before.png)

![Screenshots of the transaction hashes](screenshots/success_cashout_BB.png)

![Screenshots of my Zashi wallet with the new transaction](screenshots/zashi_received_cashout.png)

![Screenshots of a user cashing out their balance](screenshots/cash_out_user_after.png)

**Private Operation ID**::opid-11e9f74d-0b54-4911-8598-fe5dcf34e495

>**Private Transaction Hash** :: 45e70589736d4a9bd6045a3dc1c9320d5f3483d002872e6da55a3756b50d29d0

![Screenshot of blockexplorer](screenshots/cashout_block_explorer.png)

But where did my funds go? I had 0.0167 in transparent ZEC and then sent 0.00001 to a shielded address. Where did the change go? Of course, it returned to the shielded pool.

```bash
curl --user rpcuser:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "z_gettotalbalance", "params": [5] }' -H 'content-type: text/plain;' http://84.32.151.95:8232/
```
Results:
```
{"result":{"transparent":"0.0001","private":"0.01644","total":"0.01654"},"error":null,"id":"curltest"}
```

