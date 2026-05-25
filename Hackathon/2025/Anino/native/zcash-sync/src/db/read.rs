use crate::unified::orchard_as_unified;
use crate::CoinConfig;
use crate::{db::data_generated::fb::*, orchard::OrchardKeyBytes};
use anyhow::Result;
use rusqlite::{params, Connection, OptionalExtension};
use std::collections::{HashMap, HashSet};
use zcash_client_backend::address::{RecipientAddress, UnifiedAddress};
use zcash_client_backend::encoding::{
    decode_payment_address, encode_payment_address, AddressCodec,
};
use zcash_primitives::consensus::{Network, Parameters};
use zcash_primitives::legacy::TransparentAddress;

pub fn get_account_list(coin: u8, connection: &Connection) -> Result<AccountVecT> {
    let c = CoinConfig::get(coin);
    let network = c.chain.network();
    let mut stmt = connection.prepare("WITH notes AS (SELECT a.id_account, a.name, a.seed, a.sk, a.address, a.aindex, CASE WHEN r.spent IS NULL THEN r.value ELSE 0 END AS nv FROM accounts a LEFT JOIN received_notes r ON a.id_account = r.account), \
                       accountsA AS (SELECT id_account, name, seed, sk, address, aindex, COALESCE(sum(nv), 0) AS balance FROM notes GROUP by id_account) \
                       SELECT a.id_account, a.name, a.seed, a.sk, a.balance, a.address, a.aindex, t.address AS taddr, o.fvk, hw.ledger, a2.saved FROM accountsA a \
                       LEFT JOIN hw_wallets hw ON a.id_account = hw.account \
                       LEFT JOIN accounts2 a2 ON a.id_account = a2.account \
                       LEFT JOIN taddrs t ON a.id_account = t.account \
                       LEFT JOIN orchard_addrs o ON a.id_account = o.account")?;
    let rows = stmt.query_map([], |row| {
        let id: u32 = row.get("id_account")?;
        let name: String = row.get("name")?;
        let balance: i64 = row.get("balance")?;
        let seed: Option<String> = row.get("seed")?;
        let sk: Option<String> = row.get("sk")?;
        let aindex: u32 = row.get("aindex")?;
        let address: String = row.get("address")?;
        let taddr: Option<String> = row.get("taddr")?;
        let ledger: Option<bool> = row.get("ledger")?;
        let saved: Option<bool> = row.get("saved")?;
        let o_fvk: Option<Vec<u8>> = row.get("fvk")?;
        let key_type = if seed.is_some() {
            0
        } else if sk.is_some() {
            1
        } else if ledger.is_some() {
            2
        } else {
            0x80
        };
        let ua = o_fvk.map(|o_fvk| {
            let o_key = OrchardKeyBytes {
                sk: None,
                fvk: o_fvk.try_into().unwrap(),
            };
            let o_address = o_key.get_address(aindex as usize);
            let z_address =
                decode_payment_address(network.hrp_sapling_payment_address(), &address).unwrap();
            let ua =
                UnifiedAddress::from_receivers(Some(o_address), Some(z_address), None).unwrap();
            ua.encode(network)
        });
        let account = AccountT {
            coin,
            id,
            name: Some(name),
            key_type,
            balance: balance as u64,
            address: ua.or(Some(address)),
            saved: saved.unwrap_or(true),
        };
        Ok(account)
    })?;
    let mut accounts = vec![];
    for r in rows {
        accounts.push(r?);
    }
    let accounts = AccountVecT {
        accounts: Some(accounts),
    };
    Ok(accounts)
}

pub fn get_first_account(connection: &Connection) -> Result<u32> {
    let id = connection.query_row("SELECT MIN(id_account) FROM accounts", [], |r| {
        r.get::<_, Option<u32>>(0)
    })?;
    Ok(id.unwrap_or(0))
}

pub fn get_active_account(connection: &Connection) -> Result<u32> {
    let id = connection
        .query_row(
            "SELECT value FROM properties WHERE name = 'account'",
            [],
            |row| {
                let value: String = row.get(0)?;
                let value: u32 = value.parse().unwrap();
                Ok(value)
            },
        )
        .optional()?
        .unwrap_or(0);
    let id = get_available_account_id(connection, id)?;
    set_active_account(connection, id)?;
    Ok(id)
}

pub fn set_active_account(connection: &Connection, id: u32) -> Result<()> {
    connection.execute(
        "INSERT INTO properties(name, value) VALUES ('account',?1) \
    ON CONFLICT (name) DO UPDATE SET value = excluded.value",
        [id],
    )?;
    Ok(())
}

pub fn get_available_account_id(connection: &Connection, id: u32) -> Result<u32> {
    let r = connection
        .query_row("SELECT 1 FROM accounts WHERE id_account = ?1", [id], |_| {
            Ok(())
        })
        .optional()?;
    if r.is_some() {
        return Ok(id);
    }
    let r = connection
        .query_row("SELECT MAX(id_account) FROM accounts", [], |row| {
            let id: Option<u32> = row.get(0)?;
            Ok(id)
        })?
        .unwrap_or(0);
    Ok(r)
}

pub fn get_t_addr(connection: &Connection, id: u32) -> Result<String> {
    let address = connection
        .query_row(
            "SELECT address FROM taddrs WHERE account = ?1",
            [id],
            |row| {
                let address: String = row.get(0)?;
                Ok(address)
            },
        )
        .optional()?;
    Ok(address.unwrap_or(String::new()))
}

pub fn get_sk(connection: &Connection, id: u32) -> Result<String> {
    let sk = connection.query_row(
        "SELECT sk FROM accounts WHERE id_account = ?1",
        [id],
        |row| {
            let sk: Option<String> = row.get(0)?;
            Ok(sk.unwrap_or(String::new()))
        },
    )?;
    Ok(sk)
}

pub fn update_account_name(connection: &Connection, id: u32, name: &str) -> Result<()> {
    connection.execute(
        "UPDATE accounts SET name = ?2 WHERE id_account = ?1",
        params![id, name],
    )?;
    Ok(())
}

pub fn get_balances(connection: &Connection, id: u32, confirmed_height: u32) -> Result<Vec<u8>> {
    let mut builder = flatbuffers::FlatBufferBuilder::new();
    let shielded = connection.query_row(
        "SELECT SUM(value) AS value FROM received_notes WHERE account = ?1 AND spent IS NULL",
        params![id],
        |row| {
            let value: Option<i64> = row.get(0)?;
            Ok(value.unwrap_or(0) as u64)
        },
    )?; // funds not spent yet
    let unconfirmed_spent = connection.query_row(
        "SELECT SUM(value) AS value FROM received_notes WHERE account = ?1 AND spent = 0",
        params![id],
        |row| {
            let value: Option<i64> = row.get(0)?;
            Ok(value.unwrap_or(0) as u64)
        },
    )?; // funds used in unconfirmed tx
    let balance = shielded + unconfirmed_spent;
    let under_confirmed = connection.query_row(
        "SELECT SUM(value) AS value FROM received_notes WHERE account = ?1 AND spent IS NULL AND height > ?2",
        params![id, confirmed_height], |row| {
            let value: Option<i64> = row.get(0)?;
            Ok(value.unwrap_or(0) as u64)
        })?; // funds received but not old enough
    let excluded = connection.query_row(
        "SELECT SUM(value) FROM received_notes WHERE account = ?1 AND spent IS NULL \
        AND height <= ?2 AND excluded",
        params![id, confirmed_height],
        |row| {
            let value: Option<i64> = row.get(0)?;
            Ok(value.unwrap_or(0) as u64)
        },
    )?; // funds excluded from spending
    let sapling = connection.query_row(
        "SELECT SUM(value) FROM received_notes WHERE account = ?1 AND spent IS NULL AND orchard = 0 AND height <= ?2",
        params![id, confirmed_height], |row| {
            let value: Option<i64> = row.get(0)?;
            Ok(value.unwrap_or(0) as u64)
        })?;
    let orchard = connection.query_row(
        "SELECT SUM(value) FROM received_notes WHERE account = ?1 AND spent IS NULL AND orchard = 1 AND height <= ?2",
        params![id, confirmed_height], |row| {
            let value: Option<i64> = row.get(0)?;
            Ok(value.unwrap_or(0) as u64)
        })?;

    let balance = Balance::create(
        &mut builder,
        &BalanceArgs {
            shielded,
            unconfirmed_spent,
            balance,
            under_confirmed,
            excluded,
            sapling,
            orchard,
        },
    );
    builder.finish(balance, None);
    let data = builder.finished_data().to_vec();
    Ok(data)
}

pub fn get_db_height(network: &Network, connection: &Connection) -> Result<HeightT> {
    let height = connection
        .query_row(
            "SELECT height, timestamp FROM blocks WHERE height = (SELECT MAX(height) FROM blocks)",
            [],
            |row| {
                let height: u32 = row.get(0)?;
                let timestamp: u32 = row.get(1)?;
                Ok(HeightT { height, timestamp })
            },
        )
        .optional()?
        .unwrap_or_else(|| {
            let h: u32 = network
                .activation_height(zcash_primitives::consensus::NetworkUpgrade::Sapling)
                .unwrap()
                .into();
            HeightT {
                height: h - 1,
                timestamp: 0,
            }
        });
    Ok(height)
}

pub fn get_notes(connection: &Connection, id: u32) -> Result<Vec<u8>> {
    let mut builder = flatbuffers::FlatBufferBuilder::new();
    let mut stmt = connection.prepare(
        "SELECT n.id_note, n.height, n.value, t.timestamp, n.orchard, n.excluded, n.spent FROM received_notes n, transactions t \
           WHERE n.account = ?1 AND (n.spent IS NULL OR n.spent = 0) \
           AND n.tx = t.id_tx ORDER BY n.height DESC")?;
    let rows = stmt.query_map(params![id], |row| {
        let id: u32 = row.get("id_note")?;
        let height: u32 = row.get("height")?;
        let value: i64 = row.get("value")?;
        let timestamp: u32 = row.get("timestamp")?;
        let orchard: u8 = row.get("orchard")?;
        let excluded: Option<bool> = row.get("excluded")?;
        let spent: Option<u32> = row.get("spent")?;
        let note = ShieldedNote::create(
            &mut builder,
            &ShieldedNoteArgs {
                id,
                height,
                value: value as u64,
                timestamp,
                orchard: orchard == 1,
                excluded: excluded.unwrap_or(false),
                spent: spent.is_some(),
            },
        );
        Ok(note)
    })?;
    let mut notes = vec![];
    for r in rows {
        notes.push(r?);
    }
    let notes = builder.create_vector(&notes);
    let notes = ShieldedNoteVec::create(&mut builder, &ShieldedNoteVecArgs { notes: Some(notes) });
    builder.finish(notes, None);
    let data = builder.finished_data().to_vec();
    Ok(data)
}

pub fn get_txs(network: &Network, connection: &Connection, id: u32) -> Result<ShieldedTxVecT> {
    let known_addresses = list_known_addresses(network, connection)?;
    let mut stmt = connection.prepare(
        "SELECT id_tx, txid, height, timestamp, t.address, value, memo, messages FROM transactions t \
        WHERE account = ?1 ORDER BY height DESC",
    )?;
    let rows = stmt.query_map(params![id], |row| {
        let id_tx: u32 = row.get("id_tx")?;
        let height: u32 = row.get("height")?;
        let mut tx_id: Vec<u8> = row.get("txid")?;
        assert_eq!(tx_id.len(), 32);
        tx_id.reverse();
        let tx_id = hex::encode(&tx_id);
        let short_tx_id = tx_id[..8].to_string();
        let timestamp: u32 = row.get("timestamp")?;
        let address: Option<String> = row.get("address")?;
        let value: i64 = row.get("value")?;
        let memo: Option<String> = row.get("memo")?;
        let messages: Option<Vec<u8>> = row.get("messages")?;
        let messages = messages
            .map(|m| flatbuffers::root::<MemoVec>(&m).unwrap().unpack())
            .unwrap_or_default();
        let tx = ShieldedTxT {
            id: id_tx,
            height,
            tx_id: Some(tx_id),
            short_tx_id: Some(short_tx_id),
            timestamp,
            name: None,
            value: value as u64,
            address,
            memo,
            messages: Some(Box::new(messages)),
        };
        Ok(tx)
    })?;
    let mut txs = rows.collect::<Result<Vec<_>, _>>()?;
    // Tx Addresses have one receiver because that is what the protocol uses
    let tx_addresses = txs
        .iter()
        .filter_map(|tx| tx.address.clone())
        .collect::<HashSet<String>>();
    let names = tx_addresses
        .iter()
        .flat_map(|address| {
            known_addresses
                .get(address)
                .cloned()
                .unwrap_or_else(Vec::new)
                .into_iter()
                .map(|a| (address.clone(), a))
        })
        .collect::<HashMap<String, String>>();

    for tx in txs.iter_mut() {
        if let Some(address) = tx.address.as_ref() {
            tx.name = names.get(address).cloned();
        }
    }
    let txs = ShieldedTxVecT { txs: Some(txs) };
    Ok(txs)
}

// extract receivers from address and insert them in the receiver_map
// receiver_map: receiver => address
fn extract_receivers<T: Clone>(
    network: &Network,
    address: &str,
    value: T,
    receiver_map: &mut HashMap<String, Vec<T>>,
) -> anyhow::Result<()> {
    let a = RecipientAddress::decode(network, address).unwrap();
    match a {
        RecipientAddress::Transparent(_) | RecipientAddress::Shielded(_) => {
            receiver_map
                .entry(address.to_string())
                .or_insert_with(Vec::new)
                .push(value.clone());
        }
        RecipientAddress::Unified(ua) => {
            if let Some(pa) = ua.transparent() {
                let a = pa.encode(network);
                receiver_map
                    .entry(a.clone())
                    .or_insert_with(Vec::new)
                    .push(value.clone());
            }
            if let Some(pa) = ua.sapling() {
                let a = encode_payment_address(network.hrp_sapling_payment_address(), pa);
                receiver_map
                    .entry(a.clone())
                    .or_insert_with(Vec::new)
                    .push(value.clone());
            }
            if let Some(pa) = ua.orchard() {
                let a = UnifiedAddress::from_receivers(Some(pa.clone()), None, None).unwrap();
                let a = a.encode(network);
                receiver_map
                    .entry(a.clone())
                    .or_insert_with(Vec::new)
                    .push(value.clone());
            }
        }
    }
    Ok(())
}

fn list_known_addresses(
    network: &Network,
    connection: &Connection,
) -> Result<HashMap<String, Vec<String>>> {
    let mut known_receivers = HashMap::<String, Vec<String>>::new();
    let mut stmt = connection.prepare("SELECT name, address FROM contacts WHERE address <> ''")?;
    let rows = stmt.query_map([], |row| {
        let name: String = row.get(0)?;
        let address: String = row.get(1)?;
        Ok((name, address))
    })?;
    for r in rows {
        let (name, address) = r?;
        extract_receivers(network, &address, name, &mut known_receivers)?;
    }

    let accounts = list_address_accounts(network, &connection)?;
    for account in accounts.into_iter() {
        let AccountAddressT { name, address, .. } = account;
        extract_receivers(
            network,
            &address.unwrap(),
            name.unwrap(),
            &mut known_receivers,
        )?;
    }
    Ok(known_receivers)
}

pub fn get_messages(network: &Network, connection: &Connection, id: u32) -> Result<MessageVecT> {
    let known_addresses = list_known_addresses(network, connection)?;

    let mut stmt = connection.prepare(
        "SELECT m.id, m.id_tx, m.timestamp, m.sender, m.recipient, m.incoming, \
        subject, body, height, read FROM messages m \
        WHERE account = ?1 ORDER BY timestamp DESC",
    )?;
    let rows = stmt.query_map(params![id], |row| {
        let id_msg: u32 = row.get("id")?;
        let id_tx: Option<u32> = row.get("id_tx")?;
        let timestamp: u32 = row.get("timestamp")?;
        let height: u32 = row.get("height")?;
        let sender: Option<String> = row.get("sender")?;
        let recipient: Option<String> = row.get("recipient")?;
        let subject: String = row.get("subject")?;
        let body: String = row.get("body")?;
        let read: bool = row.get("read")?;
        let incoming: bool = row.get("incoming")?;

        let id_tx = id_tx.unwrap_or(0);

        let message = MessageT {
            id_msg,
            id_tx,
            height,
            timestamp,
            from: sender.clone(),
            to: recipient,
            subject: Some(subject),
            body: Some(body),
            read,
            incoming,
            sender,
        };
        Ok(message)
    })?;
    let mut messages = rows.collect::<Result<Vec<_>, _>>()?;
    let mut message_receivers = HashMap::<String, Vec<(usize, bool)>>::new();
    for (i, m) in messages.iter().enumerate() {
        if let Some(ref from) = m.from {
            extract_receivers(network, from, (i, true), &mut message_receivers)?;
        }
        if let Some(ref to) = m.to {
            extract_receivers(network, to, (i, false), &mut message_receivers)?;
        }
    }

    // Join Many-Many from message to known_addresses
    for (address, ms) in message_receivers.into_iter() {
        if let Some(names) = known_addresses.get(&address) {
            if let Some(name) = names.first() {
                for (i, is_from) in ms.into_iter() {
                    if is_from {
                        messages[i].from = Some(name.clone());
                    } else {
                        messages[i].to = Some(name.clone());
                    }
                }
            }
        }
    }

    let messages = MessageVecT {
        messages: Some(messages),
    };
    Ok(messages)
}

pub fn get_prev_next_message(
    connection: &Connection,
    subject: &str,
    height: u32,
    account: u32,
) -> Result<Vec<u8>> {
    let mut builder = flatbuffers::FlatBufferBuilder::new();
    let prev = connection
        .query_row(
            "SELECT MAX(id) FROM messages WHERE subject = ?1 AND height < ?2 and account = ?3",
            params![subject, height, account],
            |row| {
                let id: Option<u32> = row.get(0)?;
                Ok(id)
            },
        )?
        .unwrap_or(0);
    let next = connection
        .query_row(
            "SELECT MIN(id) FROM messages WHERE subject = ?1 AND height > ?2 and account = ?3",
            params![subject, height, account],
            |row| {
                let id: Option<u32> = row.get(0)?;
                Ok(id)
            },
        )?
        .unwrap_or(0);
    let prev_next = PrevNext::create(&mut builder, &PrevNextArgs { prev, next });
    builder.finish(prev_next, None);
    let data = builder.finished_data().to_vec();
    Ok(data)
}

pub fn get_templates(connection: &Connection) -> Result<Vec<u8>> {
    let mut builder = flatbuffers::FlatBufferBuilder::new();
    let mut stmt = connection.prepare(
        "SELECT id_send_template, title, address, amount, fiat_amount, fee_included, fiat, include_reply_to, subject, body FROM send_templates")?;
    let rows = stmt.query_map([], |row| {
        let id_msg: u32 = row.get("id_send_template")?;
        let title: String = row.get("title")?;
        let address: String = row.get("address")?;
        let amount: i64 = row.get("amount")?;
        let fiat_amount: f64 = row.get("fiat_amount")?;
        let fee_included: bool = row.get("fee_included")?;
        let fiat: Option<String> = row.get("fiat")?;
        let include_reply_to: bool = row.get("include_reply_to")?;
        let subject: String = row.get("subject")?;
        let body: String = row.get("body")?;

        let title = builder.create_string(&title);
        let address = builder.create_string(&address);
        let fiat = fiat.map(|fiat| builder.create_string(&fiat));
        let subject = builder.create_string(&subject);
        let body = builder.create_string(&body);

        let template = SendTemplate::create(
            &mut builder,
            &SendTemplateArgs {
                id: id_msg,
                title: Some(title),
                address: Some(address),
                amount: amount as u64,
                fiat_amount,
                fee_included,
                fiat,
                include_reply_to,
                subject: Some(subject),
                body: Some(body),
            },
        );
        Ok(template)
    })?;
    let mut templates = vec![];
    for r in rows {
        templates.push(r?);
    }
    let templates = builder.create_vector(&templates);
    let templates = SendTemplateVec::create(
        &mut builder,
        &SendTemplateVecArgs {
            templates: Some(templates),
        },
    );
    builder.finish(templates, None);
    let data = builder.finished_data().to_vec();
    Ok(data)
}

pub fn get_contacts(connection: &Connection) -> Result<Vec<u8>> {
    let mut builder = flatbuffers::FlatBufferBuilder::new();
    let mut stmt = connection
        .prepare("SELECT id, name, address FROM contacts WHERE address <> '' ORDER BY name")?;
    let rows = stmt.query_map([], |row| {
        let id: u32 = row.get("id")?;
        let name: String = row.get("name")?;
        let address: String = row.get("address")?;
        let name_fb = builder.create_string(&name);
        let address_fb = builder.create_string(&address);
        let contact = Contact::create(
            &mut builder,
            &ContactArgs {
                id,
                name: Some(name_fb),
                address: Some(address_fb),
            },
        );
        Ok(Some(contact))
    })?;
    let mut contacts = vec![];
    for r in rows {
        if let Some(c) = r? { contacts.push(c); }
    }
    let contacts = builder.create_vector(&contacts);
    let contacts = ContactVec::create(
        &mut builder,
        &ContactVecArgs {
            contacts: Some(contacts),
        },
    );
    builder.finish(contacts, None);
    let data = builder.finished_data().to_vec();
    Ok(data)
}

pub fn get_contact(connection: &Connection, id: u32) -> Result<ContactT> {
    let contact = connection.query_row(
        "SELECT name, address FROM contacts WHERE id = ?1",
        [id],
        |r| {
            let name = r.get::<_, String>(0)?;
            let address = r.get::<_, String>(1)?;
            Ok(ContactT {
                id,
                name: Some(name),
                address: Some(address),
            })
        },
    )?;
    Ok(contact)
}

pub fn get_pnl_txs(connection: &Connection, id: u32, timestamp: u32) -> Result<Vec<TxTimeValueT>> {
    let mut stmt = connection.prepare(
        "SELECT timestamp, value FROM transactions WHERE timestamp >= ?2 AND account = ?1 ORDER BY timestamp DESC")?;
    let rows = stmt.query_map([id, timestamp], |row| {
        let timestamp: u32 = row.get(0)?;
        let value: i64 = row.get(1)?;
        let tx = TxTimeValueT { timestamp, value };
        Ok(tx)
    })?;
    let txs = rows.collect::<Result<Vec<_>, _>>()?;
    Ok(txs)
}

pub fn get_spendings(connection: &Connection, id: u32, timestamp: u32) -> Result<Vec<SpendingT>> {
    let mut stmt = connection.prepare(
        "SELECT SUM(value) as v, t.address, c.name FROM transactions t LEFT JOIN contacts c ON t.address = c.address \
        WHERE account = ?1 AND timestamp >= ?2 AND value < 0 GROUP BY t.address ORDER BY v ASC LIMIT 5")?;
    let rows = stmt.query_map([id, timestamp], |row| {
        let amount: i64 = row.get(0)?;
        let address: Option<String> = row.get(1)?;
        let name: Option<String> = row.get(2)?;

        let recipient = name.or(address);

        let spending = SpendingT { recipient, amount };
        Ok(spending)
    })?;
    let data = rows.collect::<Result<Vec<_>, _>>()?;
    Ok(data)
}

pub fn update_excluded(connection: &Connection, id: u32, excluded: bool) -> Result<()> {
    connection.execute(
        "UPDATE received_notes SET excluded = ?2 WHERE id_note = ?1",
        params![id, excluded],
    )?;
    Ok(())
}

pub fn invert_excluded(connection: &Connection, id: u32) -> Result<()> {
    connection.execute(
        "UPDATE received_notes SET excluded = NOT(COALESCE(excluded, 0)) WHERE account = ?1",
        [id],
    )?;
    Ok(())
}

pub fn get_checkpoints(connection: &Connection) -> Result<Vec<u8>> {
    let mut builder = flatbuffers::FlatBufferBuilder::new();
    let mut stmt = connection.prepare("SELECT height, timestamp FROM blocks ORDER by height")?;
    let rows = stmt.query_map([], |row| {
        let height: u32 = row.get(0)?;
        let timestamp: u32 = row.get(1)?;

        let checkpoint = Checkpoint::create(&mut builder, &CheckpointArgs { height, timestamp });
        Ok(checkpoint)
    })?;
    let mut checkpoints = vec![];
    for r in rows {
        checkpoints.push(r?);
    }
    let checkpoints = builder.create_vector(&checkpoints);
    let checkpoints = CheckpointVec::create(
        &mut builder,
        &CheckpointVecArgs {
            values: Some(checkpoints),
        },
    );
    builder.finish(checkpoints, None);
    let data = builder.finished_data().to_vec();
    Ok(data)
}

pub fn get_property(connection: &Connection, name: &str) -> anyhow::Result<String> {
    let url = connection
        .query_row(
            "SELECT value FROM properties WHERE name = ?1",
            [name],
            |row| {
                let url: String = row.get(0)?;
                Ok(url)
            },
        )
        .optional()?;
    Ok(url.unwrap_or(String::new()))
}

pub fn set_property(connection: &Connection, name: &str, value: &str) -> anyhow::Result<()> {
    connection.execute(
        "INSERT INTO properties(name, value) VALUES (?1, ?2) ON CONFLICT (name) \
    DO UPDATE SET value = excluded.value",
        params![name, value],
    )?;
    Ok(())
}

pub fn get_account_property(
    connection: &Connection,
    account: u32,
    name: &str,
) -> anyhow::Result<String> {
    let url = connection
        .query_row(
            "SELECT value FROM account_properties WHERE account = ?1 AND name = ?2",
            params![account, name],
            |row| {
                let url: String = row.get(0)?;
                Ok(url)
            },
        )
        .optional()?;
    Ok(url.unwrap_or(String::new()))
}

pub fn set_account_property(
    connection: &Connection,
    account: u32,
    name: &str,
    value: &str,
) -> anyhow::Result<()> {
    connection.execute(
        "INSERT INTO account_properties(account, name, value) VALUES (?1, ?2, ?3) \
        ON CONFLICT (account, name) \
        DO UPDATE SET value = excluded.value",
        params![account, name, value],
    )?;
    Ok(())
}

pub fn get_available_addrs(connection: &Connection, account: u32) -> anyhow::Result<u8> {
    let has_transparent = connection
        .query_row(
            "SELECT 1 FROM taddrs WHERE account = ?1",
            [account],
            |_row| Ok(()),
        )
        .optional()?
        .is_some();
    let has_sapling = true;
    let has_orchard = connection
        .query_row(
            "SELECT 1 FROM orchard_addrs WHERE account = ?1",
            [account],
            |_row| Ok(()),
        )
        .optional()?
        .is_some();
    let res = if has_transparent { 1 } else { 0 }
        | if has_sapling { 2 } else { 0 }
        | if has_orchard { 4 } else { 0 };
    Ok(res)
}

pub fn get_account_by_address(connection: &Connection, address: &str) -> Result<Option<u32>> {
    let id = connection
        .query_row(
            "SELECT id_account FROM accounts WHERE address = ?1",
            [address],
            |row| row.get::<_, u32>(0),
        )
        .optional()?;
    Ok(id)
}

pub fn list_address_accounts(
    network: &Network,
    connection: &Connection,
) -> anyhow::Result<Vec<AccountAddressT>> {
    let mut s = connection.prepare(
        "SELECT id_account, name, aindex, a.address, t.address AS taddr, fvk FROM accounts a \
        LEFT JOIN taddrs t ON t.account = a.id_account \
        LEFT JOIN orchard_addrs o ON o.account = a.id_account",
    )?;
    let rows = s.query_map([], |r| {
        let id = r.get::<_, u32>(0)?;
        let name = r.get::<_, String>(1)?;
        let aindex = r.get::<_, u32>(2)?;
        let address = r.get::<_, String>(3)?;
        let taddr = r.get::<_, Option<String>>(4)?;
        let fvk = r.get::<_, Option<Vec<u8>>>(5)?;
        Ok((id, name, aindex, address, taddr, fvk))
    })?;
    let mut account_addresses = vec![];
    for r in rows {
        let (id, name, aindex, zaddr, taddr, fvk) = r?;
        let transparent = taddr
            .as_ref()
            .map(|address| TransparentAddress::decode(network, &address).unwrap());
        let sapling =
            decode_payment_address(network.hrp_sapling_payment_address(), &zaddr).unwrap();
        let orchard = fvk.map(|fvk| {
            let ob = OrchardKeyBytes {
                sk: None,
                fvk: fvk.try_into().unwrap(),
            };
            ob.get_address(aindex as usize)
        });
        let address = if transparent.is_some() || orchard.is_some() {
            let ua = UnifiedAddress::from_receivers(orchard, Some(sapling), transparent).unwrap();
            ua.encode(network)
        } else {
            zaddr.clone()
        };
        let aa = AccountAddressT {
            id,
            name: Some(name),
            address: Some(address),
            transparent: taddr,
            sapling: Some(zaddr),
            orchard: orchard.map(|o| orchard_as_unified(network, &o)),
        };
        account_addresses.push(aa);
    }
    Ok(account_addresses)
}

pub fn count_accounts(connection: &Connection) -> anyhow::Result<u32> {
    let c = connection.query_row("SELECT COUNT(*) FROM accounts", [], |r| r.get::<_, u32>(0))?;
    Ok(c)
}

pub fn store_swap(connection: &Connection, account: u32, swap: SwapT) -> anyhow::Result<()> {
    let SwapT {
        provider,
        provider_id,
        timestamp,
        from_currency,
        from_amount,
        from_address,
        from_image,
        to_currency,
        to_amount,
        to_address,
        to_image,
        ..
    } = swap;

    connection.execute(
        "INSERT INTO swaps(
        account,
        provider,
        provider_id,
        timestamp,
        from_currency,
        from_amount,
        from_address,
        from_image,
        to_currency,
        to_amount,
        to_address,
        to_image
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)",
        params![
            account,
            provider.unwrap(),
            provider_id.unwrap(),
            timestamp,
            from_currency.unwrap(),
            from_amount.unwrap(),
            from_address.unwrap(),
            from_image.unwrap(),
            to_currency.unwrap(),
            to_amount.unwrap(),
            to_address.unwrap(),
            to_image.unwrap(),
        ],
    )?;
    Ok(())
}

pub fn clear_swap_history(connection: &Connection) -> anyhow::Result<()> {
    connection.execute("DELETE FROM swaps", [])?;
    Ok(())
}

pub fn list_swaps(connection: &Connection) -> anyhow::Result<Vec<SwapT>> {
    let mut s = connection.prepare(
        "SELECT 
        provider,
        provider_id,
        timestamp,
        from_currency,
        from_amount,
        from_address,
        from_image,
        to_currency,
        to_amount,
        to_address,
        to_image FROM swaps",
    )?;
    let rows = s.query_map([], |r| {
        let provider = r.get::<_, Option<String>>(0)?;
        let provider_id = r.get::<_, Option<String>>(1)?;
        let timestamp = r.get::<_, u32>(2)?;
        let from_currency = r.get::<_, Option<String>>(3)?;
        let from_amount = r.get::<_, Option<String>>(4)?;
        let from_address = r.get::<_, Option<String>>(5)?;
        let from_image = r.get::<_, Option<String>>(6)?;
        let to_currency = r.get::<_, Option<String>>(7)?;
        let to_amount = r.get::<_, Option<String>>(8)?;
        let to_address = r.get::<_, Option<String>>(9)?;
        let to_image = r.get::<_, Option<String>>(10)?;
        let swap = SwapT {
            provider,
            provider_id,
            timestamp,
            from_currency,
            from_amount,
            from_address,
            from_image,
            to_currency,
            to_amount,
            to_address,
            to_image,
        };
        Ok(swap)
    })?;
    let swaps = rows.collect::<Result<Vec<_>, _>>()?;
    Ok(swaps)
}
