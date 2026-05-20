<a href="https://github.com/zechub/zechub/edit/main/site/guides/Namada_Shielded_Transfers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Namada Shielded Transfers

Namada supports shielded transfers through the Multi-Asset Shielded Pool, or MASP. A shielded transfer moves already-shielded assets from one shielded payment address to another without publicly exposing the sender, receiver, or amount.

Commands, chain IDs, and wallet details can change. Check the current Namada docs before using real funds.

## Address types

Namada addresses and keys use different prefixes:

| Prefix | Meaning |
| --- | --- |
| `tnam` | Transparent address |
| `zsknam` | Shielded spending key |
| `zvknam` | Shielded viewing key |
| `znam` | Shielded payment address |

A shielded account can have many `znam` payment addresses. Using a fresh payment address for different counterparties can reduce unnecessary linkage.

## Transfer types

| Action | Direction | Command |
| --- | --- | --- |
| Shield | Transparent to shielded | `namadac shield` |
| Shielded transfer | Shielded to shielded | `namadac transfer` |
| Unshield | Shielded to transparent | `namadac unshield` |

## Sync before sending

Before checking shielded balances or creating shielded transactions, sync the local shielded wallet:

```sh
namadac shielded-sync
```

When syncing a key for the first time, provide the spending or viewing key:

```sh
namadac shielded-sync --spending-keys $SPENDING_KEY
```

or:

```sh
namadac shielded-sync --viewing-keys $VIEWING_KEY
```

Shielded sync processes MASP notes locally so the wallet can detect notes belonging to your keys and build valid zero-knowledge proofs.

## Make a shielded transfer

To send shielded funds to another `znam` address:

```sh
namadac transfer \
  --source $SPENDING_KEY \
  --target $PAYMENT_ADDRESS \
  --token $TOKEN \
  --amount $AMOUNT \
  --gas-payer $IMPLICIT_ACCOUNT
```

The `--source` is the shielded spending key that controls the funds. The `--target` is the recipient's shielded payment address.

A transparent implicit account is still needed for transaction fees.

## Check shielded balance

After syncing, query the balance for a spending key:

```sh
namadac balance --owner $SPENDING_KEY --token $TOKEN
```

A viewing key can also be used:

```sh
namadac balance --owner $VIEWING_KEY --token $TOKEN
```

This shows the combined balance for shielded addresses associated with that spending or viewing key.

## Privacy notes

- Shielded transfers protect sender, receiver, and amount inside the MASP.
- Shielding and unshielding are boundary events. Timing, token type, amount, and transparent addresses can still leak metadata.
- Use separate transparent accounts for unrelated activity.
- Prefer liquid assets when entering or exiting a shielded pool.
- Run shielded sync after failed or interrupted shielded actions.
- Test with small amounts before moving meaningful funds.

## Related pages

- [Namada Protocol](/privacy-tools/namada-protocol)
- [Namada Privacy Best Practices](/research/namada-privacy-and-best-practices)
- [Shielded ecosystems comparison](/research/shielded-ecosystems-comparison)
- [Shielded pools](/using-zcash/shielded-pools)

## Resources

- [Namada Docs: Shielded Transfers](https://docs.namada.net/users/shielded-accounts/shielded-transfers)
- [Namada Docs: Shielding Assets](https://docs.namada.net/users/shielded-accounts/shielding)
- [Namada Docs: Unshielding Assets](https://docs.namada.net/users/shielded-accounts/unshielding)
- [Namada Docs: Shielded Sync](https://docs.namada.net/users/shielded-accounts/shielded-sync)
- [Namada Docs: Addresses on Namada](https://docs.namada.net/users/addresses)
- [Namada Specs: MASP ledger integration](https://specs.namada.net/modules/masp/ledger-integration)
